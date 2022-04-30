using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Models
{


    public class Rating
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [Range (1,5)]
        public int Score { get; set; }

        [Required]
        public string Comment { get; set; } = default!;

        public Employer Employer { get; set; } = default!;

    }

}