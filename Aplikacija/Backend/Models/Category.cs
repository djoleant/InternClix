using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;

namespace Models
{


    public class Category
    {
        [Key]
        public int ID { get; set; }

        public string Name { get; set; } = default!;

        public List<Internship> Internships { get; set; } = default!;
    }

}