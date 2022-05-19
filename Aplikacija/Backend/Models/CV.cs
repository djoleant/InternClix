using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{


    public class CV
    {
        [Key]
        public int ID { get; set; }

        public List<Experience> Experiences { get; set; } = default!;

        public List<Skill> Skills { get; set; } = default!;

        public List<AdditionalInfo> AdditionalInfos { get; set; } = default!;

        public string PhoneNumber { get; set; } = default!;

        public string Address { get; set; } = default!;

        public string City { get; set; } = default!;

        //public Student Student { get; set; }

        // public JsonResult GetCVInfo()
        // {
        //         return new JsonResult(new { succeeded = true,
        //         cv=new {
        //            this.Experiences,
        //            this.Skills,
        //            this.AdditionalInfos
        //         }});

        // }
    }

}