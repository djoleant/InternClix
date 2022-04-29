using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;

namespace Models
{


    public class Employer : ApplicationUser
    {
        [Required]
        public string CompanyName { get; set; } = default!;

        public List<Internship> Internships { get; set; } = default!;

        public List<Rating> Ratings { get; set; } = default!;

    }

}