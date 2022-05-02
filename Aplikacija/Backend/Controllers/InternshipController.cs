using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InternshipController : ControllerBase
    {

        public InternClixDbContext Context { get; set; }

        public UserManager<ApplicationUser> UserManager { get; set; }
        public InternshipController(
            InternClixDbContext dbContext,
            UserManager<ApplicationUser> userManager
            )
        {
            Context = dbContext;
            UserManager = userManager;
        }

        [HttpPost]
        [Route("PostInternship")]
        [Authorize(Roles = "Employer, Admin")]
        public async Task<JsonResult> PostInternship([FromBody]InternshipModel info)
        {
            var logged = await UserManager.GetUserAsync(User);
            var employer = await Context.Employers
            .Where(u => u.Id == logged.Id)
            .Include(u => u.Internships)
            .FirstOrDefaultAsync();

            if (employer != null)
            {
                var internship = new Internship
                {
                    Title = info.Title,
                    Description = info.Description,
                    Duration = info.Duration,
                    Compensation = info.Compensation,
                    Employer = employer,
                    Categories = new List<Category>(),
                    Skills = new List<Skill>()
                };

                foreach (var cat in info.Categories)
                {
                    var category = await Context.Categories
                        .Where(c => c.Name == cat)
                        .Include(c => c.Internships)
                        .FirstOrDefaultAsync();
                    if (category != null)
                    {
                        internship.Categories.Add(category);
                        category.Internships.Add(internship);
                    }

                }

                foreach (var sk in info.Skills)
                {
                    var skill = await Context.Skills
                        .Where(s => s.Name == sk)
                        .Include(s => s.Internships)
                        .FirstOrDefaultAsync();
                    if (skill != null)
                    {
                        internship.Skills.Add(skill);
                        skill.Internships.Add(internship);
                    }
                }
                await Context.SaveChangesAsync();

                return new JsonResult(new { succeeded = true });

            }
            else
            {
                return new JsonResult(new { succeeded = false, errors = "Employer Not Found" });
            }
        }

        [HttpPost]
        [Route("AddCategory")]
        [Authorize(Roles = "Employer, Admin")]
        public async Task<JsonResult> AddCategory(string name)
        {
            var category = new Category
            {
                Name = name
            };
            await Context.Categories.AddAsync(category);
            await Context.SaveChangesAsync();
            return new JsonResult(new { succeeded = true });

        }

        [HttpGet]
        [Route("GetCategory")]
        [Authorize(Roles = "Student, Admin, Employer")]
        public async Task<JsonResult> GetCategories()
        {
            return new JsonResult(new
            {
                succeeded = true,
                categories = await Context.Categories.Select(c => new
                {
                    c.ID,
                    c.Name
                })
                .ToListAsync()
            });

        }


    }
}