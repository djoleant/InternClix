using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{


    public class Experience
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string Description { get; set; } = default!;

        public CV CV { get; set; } = default!;

    }

}