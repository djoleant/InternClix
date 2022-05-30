using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly InternClixDbContext _dbContext;
        private readonly UserManager<ApplicationUser> _userManager;

        public ChatController(
            InternClixDbContext dbContext,
            UserManager<ApplicationUser> userManager
            )
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }

        [HttpPost]
        [Authorize]
        [Route("sendMessage/{userToSend}")]
        public async Task<JsonResult> SendMessage([FromBody] Message cMessage, string userToSend)
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

            ApplicationUser? receiver = await _dbContext.Users.FindAsync(userToSend);

            if (receiver == null)
            {
                var modelErrors = new List<string>() { "User to send can't be found!" };
                return new JsonResult(new { succeeded = false, errors = modelErrors });
            }

            ApplicationUser? applicationUser = await _userManager.GetUserAsync(User);

            if (receiver.Id == applicationUser.Id)
            {
                var modelErrors = new List<string>() { "U can't send message to your self!" };
                return new JsonResult(new { succeeded = false, errors = modelErrors });
            }

            cMessage.TimeSent = DateTime.Now;
            cMessage.Sender = applicationUser;
            cMessage.Receiver = receiver;

            _dbContext.Messages.Add(cMessage);
            await _dbContext.SaveChangesAsync();

            return new JsonResult(new { success = true, messageId = cMessage.ID });
        }

        [Authorize]
        [HttpGet]
        [Route("preview/user/{user}/{page?}")]
        public async Task<JsonResult> GetMessages(string user, int? page)
        {
            ApplicationUser? applicationUser = await _userManager.GetUserAsync(User);

            var cMessages = await _dbContext.Messages
                .Include(x => x.Sender)
                .Include(x => x.Receiver)
                .Where(x => ((x.SenderId == applicationUser.Id && x.ReceiverId == user)
                || (x.ReceiverId == applicationUser.Id && x.SenderId == user)) && (page == null ? true : x.ID < page))
                .OrderByDescending(x => x.ID)
                .Take(30)
                .Select(x => new { x.ID, x.Content,x.Type, x.TimeSent, x.SenderId, x.ReceiverId, senderUsername = x.Sender.UserName, receiverUsername = x.Receiver.UserName })
                .ToListAsync();

            return new JsonResult(new { success = true, messages = cMessages });
        }

        [Authorize]
        [HttpGet]
        [Route("hasnewmessages")]
        public async Task<JsonResult> HasNewMessages()
        {
            ApplicationUser? applicationUser = await _userManager.GetUserAsync(User);

            return new JsonResult(new { success = true, hasNew = applicationUser.HasNewMessages });
        }

        [Authorize]
        [HttpGet]
        [Route("new/user/{user}/{page}")]
        public async Task<JsonResult> NewMessages(string user, int page)
        {
            ApplicationUser applicationUser = await _userManager.GetUserAsync(User);

            var cMessages = await _dbContext.Messages
                .Where(x => ((x.SenderId == applicationUser.Id && x.ReceiverId == user)
                || (x.ReceiverId == applicationUser.Id && x.SenderId == user)) && x.ID > page)
                .Select(x => new { x.ID, x.Content,x.Type, x.TimeSent, x.SenderId, x.ReceiverId, senderUsername = x.Sender.UserName, receiverUsername = x.Receiver.UserName })
                .ToListAsync();

            return new JsonResult(new { success = true, messages = cMessages });
        }

        [Authorize]
        [HttpGet]
        [Route("latestChats/{chatsCount?}")]
        public async Task<JsonResult> LatestChats(int chatsCount = 10)
        {
            ApplicationUser applicationUser = await _userManager.GetUserAsync(User);

            var sentCMessages = _dbContext.Messages
                .Include(x => x.Sender)
                .Include(x => x.Receiver)
                .Where(x => x.SenderId == applicationUser.Id)
                .OrderByDescending(x => x.ID)
                .ToList()
                .GroupBy(x => x.ReceiverId)
                .Take(chatsCount)
                .ToDictionary(x => x.Key ,x => x.Select(y => new { y.SenderId, y.ID, y.Content,y.Type, y.TimeSent, y.Receiver.UserName}).First() );

            var recievedCMessages = _dbContext.Messages
                .Include(x => x.Sender)
                .Include(x => x.Receiver)
                .Where(x => x.ReceiverId == applicationUser.Id)
                .OrderByDescending(x => x.ID)
                .ToList()
                .GroupBy(x => x.SenderId)
                .Take(chatsCount)
                .ToDictionary(x => x.Key, x => x.Select(y => new { y.SenderId, y.ID, y.Content,y.Type, y.TimeSent, y.Sender.UserName }).First() );

            var lastMessages = sentCMessages.Concat(recievedCMessages)
                .GroupBy(x => x.Key)
                .ToDictionary(x => x.Key, x => new { message = x.Select(y => new { y.Value.SenderId, y.Value.ID, y.Value.Content,y.Value.Type, y.Value.TimeSent, y.Value.UserName }).OrderBy(y => y.ID).Last() })
                .OrderByDescending(x => x.Value.message.ID)
                .Take(chatsCount);

            applicationUser.HasNewMessages = false;
            _dbContext.Update(applicationUser);
            await _dbContext.SaveChangesAsync();
            return new JsonResult(new { success = true, lastMessages });
        }
    }
}