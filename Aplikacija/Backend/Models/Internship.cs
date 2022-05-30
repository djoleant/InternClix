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

        public int Compensation { get; set; }

        public Employer Employer { get; set; } = default!;

        public List<Skill> Skills { get; set; } = default!;

        public List<Category> Categories { get; set; } = default!;

        public List<Student> AppliedStudents { get; set; } = default!;

        public List<Student> PreviousStudents { get; set; } = default!;

        public List<Student> WishlistStudents { get; set; } = default!;

        public List<InternshipApplication> InternshipApplications { get; set; } = default!;

    }


    public class InternshipApplication
    {
        [Key]
        public int ID { get; set; }
        public Student Student { get; set; } = default!;
        public Internship Internship { get; set; } = default!;

        public string Status { get; set; } = default!; //Accepted, Denied, Applied, Finished

        public DateTime Date { get; set; }

    }

}