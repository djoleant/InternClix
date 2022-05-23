using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Models
{


    public class Internship
    {
        [Key]
        public int ID { get; set; }

        [MaxLength(50)]
        public string Title { get; set; } = default!;

        public string Description { get; set; } = default!;

        public int Duration { get; set; }

        [Required]
        public int Compensation { get; set; }

        public Employer Employer { get; set; } = default!;

        public List<Skill> Skills { get; set; } = default!;

        public List<Category> Categories { get; set; } = default!;

    }

}