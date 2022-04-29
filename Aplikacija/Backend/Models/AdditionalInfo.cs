using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{


    public class AdditionalInfo
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string Title { get; set; } = default!;

        [Required]
        public string Info { get; set; } = default!;

        [Required]
        public CV CV { get; set; } = default!;
    }

}