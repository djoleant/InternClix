using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class Message
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string Content { get; set; } = default!;

        [ForeignKey("Sender")]
        public string? SenderId { get; set; }

        [ForeignKey("Receiver")]
        public string? ReceiverId { get; set; }

        public ApplicationUser? Sender { get; set; }

        public ApplicationUser? Receiver { get; set; }

    }

}