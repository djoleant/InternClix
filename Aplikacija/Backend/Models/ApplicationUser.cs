using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;

namespace Models
{


    public class ApplicationUser : IdentityUser
{

    public List<Message>? SentMessages { get; set; }

    public List<Message>? ReceivedMessages { get; set; }
}

}