using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployerController : ControllerBase
    {

        public InternClixDbContext Context { get; set; }

        public UserManager<ApplicationUser> UserManager { get; set; }

        public EmployerController(
            InternClixDbContext dbContext,
            UserManager<ApplicationUser> userManager
            )
        {
            Context = dbContext;
            UserManager = userManager;
        }

        [HttpGet]
        [Route("GetEmployerInfo/{EmployerName}")]
        [Authorize(Roles = "Employer, Admin, Student")]
        public async Task<JsonResult> GetEmployerInfo(string EmployerName)
        {
            var employer = await Context.Employers
                .Where(i => i.CompanyName == EmployerName)
                .Include(i=>i.Internships)
                .Include(i=>i.Ratings)
                .FirstOrDefaultAsync();
            if (employer != null)
            {
                return new JsonResult(new
                {
                    succeeded = true,
                    employer = new
                    {
                        employer.Picture,
                        employer.CompanyName,
                        employer.About,
                         Internships = employer.Internships
                              .Select(c => new { c.ID, c.Title, c.Description, c.Compensation, c.Duration , 
                              Skills = c.Skills
                                   .Select(s=>new{ s.ID, s.Name})
                                    }),
                        Ratings = employer.Ratings
                            .Select(r => new { r.ID, r.OverallScore, r.BenefitsScore, r.SkillImprovementScore, r.PositiveExperience, r.NegativeExperience, r.Recommended })
                    }
                });
            }
            else
            {
                return new JsonResult(new
                {
                    succeeded = false,
                    error = "Employer Not Found"
                });
            }
        }

        [HttpGet]
        [Route("GetEmployerSkills/{EmployerName}")]
        [Authorize(Roles = "Employer, Admin, Student")]
        public async Task<JsonResult> GetEmployerSkills(string EmployerName)
        {
            var employer = await Context.Employers
                .Where(i => i.CompanyName == EmployerName)
                .Include(i=>i.Internships)
                .ThenInclude(i=>i.Skills)
                .FirstOrDefaultAsync();
            if (employer != null)
            {
                return new JsonResult(new
                {
                    succeeded = true,
                    employer = new
                    {
                        Categories=employer.Internships
                        .Select(i => new {i.Categories})
                    }
                });
            }
            else
            {
                return new JsonResult(new
                {
                    succeeded = false,
                    error = "Employer Not Found"
                });
            }
        }


    }
}