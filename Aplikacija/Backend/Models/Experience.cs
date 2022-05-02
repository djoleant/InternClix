using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{


    public class Experience
    {
        [Key]
        public int ID { get; set; }

        [MaxLength(50)]
        public String Title { get; set; } = default!;

        [Required]
        public string Description { get; set; } = default!;

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        [JsonIgnore]
        public CV CV { get; set; } = default!;



    }

}