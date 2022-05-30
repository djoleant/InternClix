using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class Message
    {
        [Key]
        public int ID { get; set; }

        public string Content { get; set; } = default!;

        public string Type { get; set; } = default!;

        [BindNever]
        [DataType(DataType.DateTime)]
        public DateTime TimeSent { get; set; }

        [ForeignKey("Sender")]
        public string? SenderId { get; set; }

        [ForeignKey("Receiver")]
        public string? ReceiverId { get; set; }

        public ApplicationUser? Sender { get; set; }

        public ApplicationUser? Receiver { get; set; }

    }

}