using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Models
{


    public class Skill
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string Name { get; set; } = default!;

        [JsonIgnore]
        public List<CV> CVs { get; set; } = default!;

        [JsonIgnore]
        public List<Internship> Internships { get; set; } = default!;

    }

}