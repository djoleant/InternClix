using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StudentController : ControllerBase
    {

        public InternClixDbContext Context { get; set; }

        public UserManager<ApplicationUser> UserManager { get; set; }
        public StudentController(
            InternClixDbContext dbContext,
            UserManager<ApplicationUser> userManager
            )
        {
            Context = dbContext;
            UserManager = userManager;
        }

        [HttpGet]
        [Route("Proba")]
        [Authorize(Roles = "Student")]
        public ActionResult Proba()
        {
            return Ok("Proba");
        }

        [HttpGet]
        [Route("Proba2")]
        [Authorize(Roles = "Employer")]
        public ActionResult Proba2()
        {
            return Ok("ProbaEmp");
        }

        [HttpGet]
        [Route("GetStudentInfo/{username}")]
        [Authorize(Roles = "Student, Employer")]
        public async Task<JsonResult> GetStudentInfo(string username)
        {
            var student = await Context.Students
            .Where(s => s.UserName == username)
            .Include(s => s.CV)
            .ThenInclude(s => s.Experiences)
            .Include(s => s.CV)
            .ThenInclude(s => s.Skills)
            .Include(s => s.CV)
            .ThenInclude(s => s.AdditionalInfos)
            .FirstOrDefaultAsync();

            if (student != null)
            {
                return new JsonResult(new
                {
                    succeeded = true,
                    student = new
                    {
                        student.FirstName,
                        student.LastName,
                        student.CV.Experiences,
                        student.CV.Skills,
                        student.CV.AdditionalInfos,
                        student.CV.Picture
                    }
                });
            }
            else
            {
                return new JsonResult(new { succeeded = false, errors = "Student Not Found" });
            }
        }
    }
}