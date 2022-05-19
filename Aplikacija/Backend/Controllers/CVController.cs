using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CVController : ControllerBase
    {

        public InternClixDbContext Context { get; set; }

        public UserManager<ApplicationUser> UserManager { get; set; }
        public CVController(
            InternClixDbContext dbContext,
            UserManager<ApplicationUser> userManager
            )
        {
            Context = dbContext;
            UserManager = userManager;
        }

        [HttpPost]
        [Route("AddExperience")]
        [Authorize(Roles = "Student, Admin")]
        public async Task<JsonResult> AddExperience(string title, string description, DateTime startDate, DateTime endDate)
        {
            var logged = await UserManager.GetUserAsync(User);
            var student = await Context.Students
            .Where(u => u.Id == logged.Id)
            .Include(u => u.CV)
            .ThenInclude(u => u.Experiences)
            .FirstOrDefaultAsync();
            //tretno ulogovani student
            if (student != null)
            {
                student.CV.Experiences.Add(new Experience
                {
                    Title = title,
                    Description = description,
                    StartDate = startDate,
                    EndDate = endDate,
                    CV = student.CV
                });
                await Context.SaveChangesAsync();

                return new JsonResult(new { succeeded = true });
            }
            else
            {
                return new JsonResult(new { succeeded = false, errors = "Student Not Found" });
            }

        }

        [HttpPost]
        [Route("AddSkill")]
        [Authorize(Roles = "Student, Admin")]
        public async Task<JsonResult> AddSkill(string name)
        {
            var skill = new Skill
            {
                Name = name
            };
            await Context.Skills.AddAsync(skill);
            await Context.SaveChangesAsync();
            return new JsonResult(new { succeeded = true });

        }

        [HttpGet]
        [Route("GetSkills")]
        [Authorize(Roles = "Student, Admin, Employer")]
        public async Task<JsonResult> GetSkills()
        {
            return new JsonResult(new
            {
                succeeded = true,
                skills = await Context.Skills.Select(s => new
                {
                    s.ID,
                    Label = s.Name
                })
                .ToListAsync()
            });

        }

        [HttpPost]
        [Route("AddSkillToCV")]
        [Authorize(Roles = "Student, Admin")]
        public async Task<JsonResult> AddSkillToCV(string name)
        {
            var skill = await Context.Skills
                .Where(s => s.Name == name)
                .Include(u => u.CVs)
                .FirstOrDefaultAsync();
            if (skill == null)
            {
                return new JsonResult(new { succeeded = false, error = "Skill Not Found" });
            }

            var logged = await UserManager.GetUserAsync(User);
            var student = await Context.Students
            .Where(u => u.Id == logged.Id)
            .Include(u => u.CV)
            .ThenInclude(u => u.Skills)
            .FirstOrDefaultAsync();
            //tretno ulogovani student
            if (student != null)
            {
                student.CV.Skills.Add(skill);

                skill.CVs.Add(student.CV);

                await Context.SaveChangesAsync();

                return new JsonResult(new { succeeded = true });
            }
            else
            {
                return new JsonResult(new { succeeded = false, errors = "Student Not Found" });
            }

        }

        [HttpPost]
        [Route("AddAdditionalInfo")]
        [Authorize(Roles = "Student, Admin")]
        public async Task<JsonResult> AddAdditionalInfo(string title, string info)
        {
            var logged = await UserManager.GetUserAsync(User);
            var student = await Context.Students
            .Where(u => u.Id == logged.Id)
            .Include(u => u.CV)
            .ThenInclude(u => u.AdditionalInfos)
            .FirstOrDefaultAsync();

            if (student != null)
            {
                student.CV.AdditionalInfos.Add(new AdditionalInfo
                {
                    Title = title,
                    Info = info,
                    CV = student.CV
                });

                await Context.SaveChangesAsync();

                return new JsonResult(new { succeeded = true });
            }
            else
            {
                return new JsonResult(new { succeeded = false, errors = "Student Not Found" });
            }

        }

        [HttpPost]
        [Route("CreateCV")]
        [Authorize(Roles = "Student, Admin")]
        public async Task<JsonResult> CreateCV(CVModel cv)
        {
            var logged = await UserManager.GetUserAsync(User);
            var student = await Context.Students
            .Where(u => u.Id == logged.Id)
            .Include(u => u.CV)
            .ThenInclude(c => c.AdditionalInfos)
            .Include(u => u.CV)
            .ThenInclude(c => c.Experiences)
            .Include(u => u.CV)
            .ThenInclude(c => c.Skills)
            .FirstOrDefaultAsync();

            if (student == null)
            {
                return new JsonResult(new { succeeded = false, errors = "Student Not Found" });
            }

            student.CV.Address = cv.Address;
            student.CV.City = cv.City;
            student.CV.PhoneNumber = cv.Phone;

            foreach (var education in cv.Education)
            {
                student.CV.Experiences.Add(new Experience
                {
                    Type = "education",
                    Title = education.Title,
                    InstitutionName = education.InstitutionName,
                    Description = education.Description,
                    StartDate = education.FromDate,
                    EndDate = education.ToDate,
                    CV = student.CV
                });
            }
            foreach (var work in cv.Experience)
            {
                student.CV.Experiences.Add(new Experience
                {
                    Type = "work",
                    Title = work.Title,
                    InstitutionName = work.InstitutionName,
                    Description = work.Description,
                    StartDate = work.FromDate,
                    EndDate = work.ToDate,
                    CV = student.CV
                });
            }
            foreach (var skill in cv.Skills)
            {
                var skillData = await Context.Skills
                .Where(s => s.Name == skill.Label)
                .Include(u => u.CVs)
                .FirstOrDefaultAsync();
                if (skillData != null)//eventualno dodati pravljenje skill u else
                {
                    student.CV.Skills.Add(skillData);
                    skillData.CVs.Add(student.CV);
                }

            }
            foreach (var language in cv.Languages)
            {
                student.CV.AdditionalInfos.Add(new AdditionalInfo
                {
                    Title = language.Title,
                    Info = language.Description,
                    Type = "Language",
                    CV = student.CV
                });
            }
            foreach (var info in cv.AdditionalInfo)
            {
                student.CV.AdditionalInfos.Add(new AdditionalInfo
                {
                    Title = info.Title,
                    Info = info.Description,
                    Type = info.Type,
                    CV = student.CV
                });
            }
            await Context.SaveChangesAsync();

            return new JsonResult(new { succeeded = true });

        }

        [HttpPost]
        [Route("GetCV")]
        [Authorize(Roles = "Student, Admin, Employer")]
        public async Task<JsonResult> GetCV()
        {
            var logged = await UserManager.GetUserAsync(User);
            var student = await Context.Students
            .Where(u => u.Id == logged.Id)
            .Include(u => u.CV)
            .ThenInclude(c => c.AdditionalInfos)
            .Include(u => u.CV)
            .ThenInclude(c => c.Experiences)
            .Include(u => u.CV)
            .ThenInclude(c => c.Skills)
            .FirstOrDefaultAsync();

            if (student == null)
            {
                return new JsonResult(new { succeeded = false, errors = "Student Not Found" });
            }


            return new JsonResult(new
            {
                succeeded = true,
                cv =
                new
                {
                    Phone = student.CV.PhoneNumber,
                    Address = student.CV.Address,
                    City = student.CV.City,
                    Education = student.CV.Experiences
                        .Where(e => e.Type == "education")
                        .Select(e => new { e.Title, e.Description, e.InstitutionName, e.StartDate, e.EndDate }),
                    Skills = student.CV.Skills.Select(s => new { s.ID, s.Name }),
                    Categories = new List<Category>(),
                    Languages = student.CV.AdditionalInfos
                        .Where(i => i.Type == "Language")
                        .Select(i => new { Title = i.Title, Description = i.Info }),
                    Experience = student.CV.Experiences
                        .Where(e => e.Type == "work")
                        .Select(e => new { e.Title, e.Description, e.InstitutionName, e.StartDate, e.EndDate }),
                    AdditionalInfo = student.CV.AdditionalInfos
                        .Where(i => i.Type != "Language")
                        .Select(i => new { i.Type, i.Title, Description = i.Info })
                }
            });

        }

    }
}