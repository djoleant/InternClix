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
                        student.Picture,
                        student.CV.Experiences,
                        student.CV.Skills,
                        student.CV.AdditionalInfos
                    }
                });
            }
            else
            {
                return new JsonResult(new { succeeded = false, errors = "Student Not Found" });
            }
        }

        [HttpPut]
        [Route("ApplyToInternship/{internshipId}")]
        [Authorize(Roles = "Student, Admin")]
        public async Task<JsonResult> ApplyToInternship(int internshipId)
        {
            var logged = await UserManager.GetUserAsync(User);
            var student = await Context.Students
            .Where(u => u.Id == logged.Id)
            .Include(u => u.InternshipApplications)
            .FirstOrDefaultAsync();

            var internship = await Context.Internships
            .Include(i => i.InternshipApplications)
            .ThenInclude(a => a.Student)
            .Where(i => i.ID == internshipId)
            .FirstOrDefaultAsync();

            if (student != null && internship != null)
            {
                if (internship.InternshipApplications.Where(a => a.Student.Id == student.Id).Count() != 0)
                {
                    return new JsonResult(new { succeeded = false, error = "Student is already applied to this internship" });
                }
                var application = new InternshipApplication
                {
                    Student = student,
                    Internship = internship,
                    Status = "Applied",
                    Date = DateTime.Now
                };
                internship.InternshipApplications.Add(application);
                student.InternshipApplications.Add(application);
                await Context.SaveChangesAsync();
                return new JsonResult(new { succeeded = true });
            }
            else
            {
                return new JsonResult(new { succeeded = false, errors = "Student or Inernship Not Found" });
            }
        }

        [HttpGet]
        [Route("GetApplication/{internshipId}")]
        [Authorize(Roles = "Student, Admin")]
        public async Task<JsonResult> GetApplication(int internshipId)
        {
            var logged = await UserManager.GetUserAsync(User);
            var student = await Context.Students
            .Where(u => u.Id == logged.Id)
            .Include(u => u.InternshipApplications)
            .FirstOrDefaultAsync();

            var internship = await Context.Internships
            .Include(i => i.InternshipApplications)
            .ThenInclude(a => a.Student)
            .Where(i => i.ID == internshipId)
            .FirstOrDefaultAsync();

            if (student != null && internship != null)
            {
                if (internship.InternshipApplications.Where(a => a.Student.Id == student.Id).Count() != 0)
                {
                    return new JsonResult(new { succeeded = true, applied = true });
                }
                return new JsonResult(new { succeeded = true, applied = false });
            }
            else
            {
                return new JsonResult(new { succeeded = false, errors = "Student or Inernship Not Found" });
            }
        }

    }
}