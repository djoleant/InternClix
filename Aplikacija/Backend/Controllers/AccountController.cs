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

        [Route("EditStudent")]
        [HttpPut]
        [Authorize(Roles = "Student, Admin")]
        public async Task<JsonResult> EditStudent(string firstName, string lastName, string picture)
        {
            try
            {
                var logged = await UserManager.GetUserAsync(User);
                var student = await Context.Students
                .Where(u => u.Id == logged.Id)
                .FirstOrDefaultAsync();

                if (student != null)
                {
                    if (!string.IsNullOrWhiteSpace(firstName))
                        student.FirstName = firstName;
                    if (!string.IsNullOrWhiteSpace(lastName))
                        student.LastName = lastName;
                    if (!string.IsNullOrWhiteSpace(picture))
                        student.Picture = picture;
                    Context.Students.Update(student);
                    await Context.SaveChangesAsync();
                }
                else
                {
                    return new JsonResult(new { succeeded = false, errors = "Student Not Found" });
                }


                return new JsonResult(new { succeeded = true, data = new { name = firstName, lastName, picture } });
            }
            catch (Exception e)
            {
                return new JsonResult(new { succeeded = false, errors = e.Message });
            }
        }

        [Route("EditEmployer")]
        [HttpPut]
        [Authorize(Roles = "Employer, Admin")]
        public async Task<JsonResult> EditEmployer(string companyName, string address, string about, string picture)
        {
            try
            {
                var logged = await UserManager.GetUserAsync(User);
                var employer = await Context.Employers
                .Where(u => u.Id == logged.Id)
                .FirstOrDefaultAsync();

                if (employer != null)
                {
                    if (!string.IsNullOrWhiteSpace(companyName))
                        employer.CompanyName = companyName;
                    if (!string.IsNullOrWhiteSpace(address))
                        employer.Address = address;
                    if (!string.IsNullOrWhiteSpace(picture))
                        employer.Picture = picture;
                    if (!string.IsNullOrWhiteSpace(about))
                        employer.About = about;
                    Context.Employers.Update(employer);
                    await Context.SaveChangesAsync();
                }
                else
                {
                    return new JsonResult(new { succeeded = false, errors = "Employer Not Found" });
                }


                return new JsonResult(new { succeeded = true, data = new { name = companyName, address, about, picture } });
            }
            catch (Exception e)
            {
                return new JsonResult(new { succeeded = false, errors = e.Message });
            }
        }



    }
}