using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SWEProjekat.Data;
using SWEProjekat.Models;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SWEProjekat.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly UserManager<ApplicationUser> _userManager;

        public ChatController(
            ApplicationDbContext dbContext,
            UserManager<ApplicationUser> userManager
            )
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }

        [HttpPost]
        [Authorize]
        [Route("sendMessage/{userToSend}")]
        public async Task<JsonResult> SendMessage([FromBody] ChatMessage chatMessage, string userToSend)
        {
            if (!ModelState.IsValid)
            {
                var modelErrors = new List<string>();
                foreach (var modelState in ModelState.Values)
                {
                    foreach (var modelError in modelState.Errors)
                    {
                        modelErrors.Add(modelError.ErrorMessage);
                    }
                }
                return new JsonResult(new { succeeded = false, errors = modelErrors });
            }

            ApplicationUser reciever = await _dbContext.Users.FindAsync(userToSend);

            if (reciever == null)
            {
                var modelErrors = new List<string>() { "User to send can't be found!" };
                return new JsonResult(new { succeeded = false, errors = modelErrors });
            }

            ApplicationUser applicationUser = await _userManager.GetUserAsync(User);

            if (reciever.Id == applicationUser.Id)
            {
                var modelErrors = new List<string>() { "U can't send message to your self!" };
                return new JsonResult(new { succeeded = false, errors = modelErrors });
            }

            chatMessage.TimeSent = DateTime.Now;
            chatMessage.Sender = applicationUser;
            chatMessage.Reciever = reciever;

            _dbContext.ChatMessages.Add(chatMessage);
            await _dbContext.SaveChangesAsync();

            return new JsonResult(new { success = true, messageId = chatMessage.Id });
        }

        [Authorize]
        [Route("preview/user/{user}/{page?}")]
        public async Task<JsonResult> GetMessages(string user, int? page)
        {
            ApplicationUser applicationUser = await _userManager.GetUserAsync(User);

            var chatMessages = await _dbContext.ChatMessages
                .Include(x => x.Sender)
                .Include(x => x.Reciever)
                .Where(x => ((x.SenderId == applicationUser.Id && x.RecieverId == user)
                || (x.RecieverId == applicationUser.Id && x.SenderId == user)) && (page == null ? true : x.Id < page))
                .OrderByDescending(x => x.Id)
                .Take(30)
                .Select(x => new { x.Id, x.Text, x.TimeSent, x.SenderId, x.RecieverId, senderUsername = x.Sender.UserName, recieverUsername = x.Reciever.UserName })
                .ToListAsync();

            return new JsonResult(new { success = true, messages = chatMessages });
        }

        [Authorize]
        [Route("hasnewmessages")]
        public async Task<JsonResult> HasNewMessages()
        {
            ApplicationUser applicationUser = await _userManager.GetUserAsync(User);

            return new JsonResult(new { success = true, hasNew = applicationUser.HasNewMessages });
        }

        [Authorize]
        [Route("new/user/{user}/{page}")]
        public async Task<JsonResult> NewMessages(string user, int page)
        {
            ApplicationUser applicationUser = await _userManager.GetUserAsync(User);

            var chatMessages = await _dbContext.ChatMessages
                .Where(x => ((x.SenderId == applicationUser.Id && x.RecieverId == user)
                || (x.RecieverId == applicationUser.Id && x.SenderId == user)) && x.Id > page)
                .Select(x => new { x.Id, x.Text, x.TimeSent, x.SenderId, x.RecieverId, senderUsername = x.Sender.UserName, recieverUsername = x.Reciever.UserName })
                .ToListAsync();

            return new JsonResult(new { success = true, messages = chatMessages });
        }

        [Authorize]
        [Route("latestChats/{chatsCount?}")]
        public async Task<JsonResult> LatestChats(int chatsCount = 10)
        {
            ApplicationUser applicationUser = await _userManager.GetUserAsync(User);

            var sentChatMessages = _dbContext.ChatMessages
                .Include(x => x.Sender)
                .Include(x => x.Reciever)
                .Where(x => x.SenderId == applicationUser.Id)
                .OrderByDescending(x => x.Id)
                .ToList()
                .GroupBy(x => x.RecieverId)
                .Take(chatsCount)
                .ToDictionary(x => x.Key ,x => x.Select(y => new { y.SenderId, y.Id, y.Text, y.TimeSent, y.Reciever.UserName, y.Reciever.FirstName, y.Reciever.LastName }).First() );

            var recievedChatMessages = _dbContext.ChatMessages
                .Include(x => x.Sender)
                .Include(x => x.Reciever)
                .Where(x => x.RecieverId == applicationUser.Id)
                .OrderByDescending(x => x.Id)
                .ToList()
                .GroupBy(x => x.SenderId)
                .Take(chatsCount)
                .ToDictionary(x => x.Key, x => x.Select(y => new { y.SenderId, y.Id, y.Text, y.TimeSent, y.Sender.UserName, y.Sender.FirstName, y.Sender.LastName }).First() );

            var lastMessages = sentChatMessages.Concat(recievedChatMessages)
                .GroupBy(x => x.Key)
                .ToDictionary(x => x.Key, x => new { message = x.Select(y => new { y.Value.SenderId, y.Value.Id, y.Value.Text, y.Value.TimeSent, y.Value.UserName, y.Value.FirstName, y.Value.LastName }).OrderBy(y => y.Id).Last() })
                .OrderByDescending(x => x.Value.message.Id)
                .Take(chatsCount);

            applicationUser.HasNewMessages = false;
            _dbContext.Update(applicationUser);
            await _dbContext.SaveChangesAsync();
            return new JsonResult(new { success = true, lastMessages });
        }
    }
}