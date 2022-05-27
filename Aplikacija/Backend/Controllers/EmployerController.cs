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
                .Include(i => i.Internships)
                .ThenInclude(i => i.Skills)
                .Include(i => i.Ratings)
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
                        employer.Likes,
                        Internships = employer.Internships
                              .Select(c => new
                              {
                                  c.ID,
                                  c.Title,
                                  c.Description,
                                  c.Compensation,
                                  c.Duration,
                                  Skills = c.Skills
                                   .Select(s => new { s.ID, s.Name })
                              }),
                        Ratings = employer.Ratings
                            .Select(r => new { r.ID, r.OverallScore, r.BenefitsScore, r.SkillImprovementScore, r.PositiveExperience, r.NegativeExperience, r.Recommended, r.Likes, r.Dislikes })
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
        [Route("GetEmployerCategories/{EmployerName}")]
        [Authorize(Roles = "Employer, Admin, Student")]
        public async Task<JsonResult> GetEmployerCategories(string EmployerName)
        {
            var internships = await Context.Internships
                .Where(i => i.Employer.CompanyName == EmployerName)
                .Include(i => i.Categories)
                .FirstOrDefaultAsync();
            // var employer = await Context.Employers
            //     .Where(i => i.CompanyName == EmployerName)
            //     .Include(i => i.Internships)
            //     .FirstOrDefaultAsync();
            if (internships != null)
            {
                return new JsonResult(new
                {
                    succeeded = true,
                    categories = new
                    {
                        Categories = internships.Categories
                        .Select(i => new { i.Name })
                        .Distinct()
                        .ToList()
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
        [Route("GetEmployers")]
        [Authorize(Roles = "Employer, Admin, Student")]
        public async Task<JsonResult> GetEmployers()
        {
            var employers = await Context.Employers
            .Include(i=>i.Internships)
            .Include(i=>i.Ratings)
            .ToListAsync();
            if (employers != null)
            {
                return new JsonResult(new
                {
                    succeeded = true,
                    employers = new
                    {
                        Employers=employers.Select(emp=>new{
                            emp.Picture,
                            emp.CompanyName,
                            emp.About,
                            emp.Address,
                            emp.Likes,
                            emp.Email,
                            Internships = emp.Internships.Count,
                            Ratings = emp.Ratings
                            .Select(r => new { r.OverallScore}),
                            
                        })
                        
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