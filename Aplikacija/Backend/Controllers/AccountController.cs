using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {

        public InternClixDbContext Context { get; set; }

        public UserManager<ApplicationUser> UserManager { get; set; }
        public AccountController(
            InternClixDbContext dbContext,
            UserManager<ApplicationUser> userManager
            )
        {
            Context = dbContext;
            UserManager = userManager;
        }

        [HttpGet]
        [Route("GetUsers")]
        [Authorize(Roles = "Admin, Student, Employer")]
        public async Task<JsonResult> GetUsers(string searchParam)
        {
            searchParam = searchParam.ToLower();
            return new JsonResult(new
            {
                succeeded = true,
                users = await Context.Students.Select(s => new { Id = s.Id, UserName = s.UserName, Name = s.FirstName + " " + s.LastName, Picture = s.Picture })
                .Union(Context.Employers.Select(s => new { Id = s.Id, UserName = s.UserName, Name = s.CompanyName, Picture = s.Picture }))
                .Where(u => u.Name.ToLower().Contains(searchParam) || u.UserName.ToLower().Contains(searchParam))
                .Take(5)
                .ToListAsync()
            });
        }


    }
}