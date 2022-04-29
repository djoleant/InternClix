using Microsoft.AspNetCore.Identity;
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

        public string Picture { get; set; } = default!;

        public List<Experience> Experiences { get; set; } = default!;

        public List<Skill> Skills { get; set; } = default!;

        public List<AdditionalInfo> AdditionalInfos { get; set; } = default!;

        //public Student Student { get; set; }
    }

}