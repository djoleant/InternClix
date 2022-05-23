using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{


    public class Rating
    {
        [Key]
        public int ID { get; set; }

        [Range (1,5)]
        public float SkillImprovementScore { get; set; }

        [Range (1,5)]
        public float BenefitsScore { get; set; }

        [Range (1,5)]
        public float OverallScore { get; set; }

        public Boolean Recommended {get;set;}

        public string PositiveExperience { get; set; } = default!;

        public string NegativeExperience { get; set; } = default!;

        public Employer Employer { get; set; } = default!;

    }

}