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

        public string Type { get; set; } = default!; //education or work (dodati regex kasnije)

        [MaxLength(50)]
        public String Title { get; set; } = default!;

        [MaxLength(100)]
        public string InstitutionName { get; set; } = default!; //company name for work, school name for education

        [Required]
        public string Description { get; set; } = default!;

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        [JsonIgnore]
        public CV CV { get; set; } = default!;



    }

}