using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Helpers;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hubs
{
    [Authorize]
    public class ChatHub : Hub
    {
        private readonly static ConnectionMapping<string> _connections =
            new ConnectionMapping<string>();

        private readonly InternClixDbContext _dbContext;
        private readonly UserManager<ApplicationUser> _userManager;

        public ChatHub(
            InternClixDbContext dbContext,
            UserManager<ApplicationUser> userManager
            )
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }

        public async Task<object> SendMessage(string userId, string messageText, string messageType)
        {
            ApplicationUser? reciever = await _dbContext.Users.FindAsync(userId);

            if (reciever == null)
            {
                throw new Exception("User to send can't be found!");
            }

            ApplicationUser applicationUser = await _userManager.GetUserAsync(Context.User);

            if (reciever.Id == applicationUser.Id)
            {
                throw new Exception("U can't send message to your self!");
            }

            if (messageText == null || messageText == "")
            {
                throw new Exception("Message is empty");
            }

            Message message = new Message();
            message.Content = messageText;
            message.Type = messageType;
            message.TimeSent = DateTime.Now;
            message.Sender = applicationUser;
            message.Receiver = reciever;

            _dbContext.Messages.Add(message);
            await _dbContext.SaveChangesAsync();

            foreach (var connectionId in _connections.GetConnections(reciever.UserName))
            {
                await Clients.Client(connectionId).SendAsync("RecieveMessage" /*+ applicationUser.Id*/,
                    new
                    {
                        message.ID,
                        message.Content,
                        message.Type,
                        message.TimeSent,
                        message.SenderId,
                        message.ReceiverId,
                        senderUsername = message.Sender.UserName,
                        recieverUsername = message.Receiver.UserName
                    });
            }
            foreach (var connectionId in _connections.GetConnections(applicationUser.UserName))
            {
                if (connectionId != Context.ConnectionId)
                    await Clients.Client(connectionId).SendAsync("RecieveMessage" /*+ reciever.Id*/,
                        new
                        {
                            message.ID,
                            message.Content,
                            message.Type,
                            message.TimeSent,
                            message.SenderId,
                            message.ReceiverId,
                            senderUsername = message.Sender.UserName,
                            recieverUsername = message.Receiver.UserName
                        });
            }

            reciever.HasNewMessages = true;
            _dbContext.Update(reciever);
            await _dbContext.SaveChangesAsync();

            return new
            {
                message.ID,
                message.Content,
                message.Type,
                message.TimeSent,
                message.SenderId,
                message.ReceiverId,
                senderUsername = message.Sender.UserName,
                recieverUsername = message.Receiver.UserName
            };
        }

        public override Task OnConnectedAsync()
        {
            if (Context.User != null && Context.User.Identity != null)
            {
                string? name = Context.User.Identity.Name;

                if (name != null)
                {
                    _connections.Add(name, Context.ConnectionId);

                }
            }

            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? ex)
        {
            if (Context.User != null && Context.User.Identity != null)
            {
                string? name = Context.User.Identity.Name;

                if (name != null)
                {
                    _connections.Remove(name, Context.ConnectionId);

                }
            }

            return base.OnDisconnectedAsync(ex);
        }


    }
}
