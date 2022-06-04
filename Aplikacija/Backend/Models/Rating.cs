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

        //public String Title {get; set;}=default!;

        [Range (1,5)]
        public float SkillImprovementScore { get; set; }

        [Range (1,5)]
        public float BenefitsScore { get; set; }

        [Range (1,5)]
        public float OverallScore { get; set; }

        public int Likes { get; set; }

        public int Dislikes { get; set; }

        public Boolean Recommended {get;set;}

        public string InterviewLevel {get; set;} = default!; //VeryEasy, Easy, AboutRight, Difficult, ExtremelyDifficult

        public string GeneralImpression {get; set;} =default!; //Positive, Negative, Neutral

        public int SelectionLength {get; set;}

        public string PositiveExperience { get; set; } = default!;

        public string NegativeExperience { get; set; } = default!;

        public Employer Employer { get; set; } = default!;

    }

}