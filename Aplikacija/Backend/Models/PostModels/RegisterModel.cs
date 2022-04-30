using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Models
{
    public enum Role
    {
        Admin,
        Student,
        Employer
    }
    public class RegisterModel
    {
        [Required]
        [EmailAddress]
        public String Email { get; set; } = default!;
        [Required]
        public String Username { get; set; } = default!;
        [Required]
        [MinLength(6)]
        public String Password { get; set; } = default!;

        [Required]
        public String FirstName { get; set; } = default!;

        [Required]
        public String LastName { get; set; } = default!;

        public String CompanyName { get; set; } = default!;

        [Required]
        public Role Role { get; set; }

    }
}
