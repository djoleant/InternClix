using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{


    public class Student : ApplicationUser
    {

        public string FirstName { get; set; } = default!;

        public string LastName { get; set; } = default!;

        public string Picture { get; set; } = default!;
        public CV CV { get; set; } = default!;
    }

}