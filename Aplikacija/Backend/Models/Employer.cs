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
        public string CompanyName { get; set; } = default!;

        public string About {get; set;} =default!;
        public string Address {get; set;} =default!;
        public int Likes { get; set; }

        public List<Internship> Internships { get; set; } = default!;

        public List<Rating> Ratings { get; set; } = default!;

        public string Picture { get; set; } = default!;

    }

}