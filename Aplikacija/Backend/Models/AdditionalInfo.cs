using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

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

        public string Type { get; set; } = default!;//languages, projects, memberships...

        [Required]
        [JsonIgnore]
        public CV CV { get; set; } = default!;
    }

}