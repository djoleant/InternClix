using System.Runtime.CompilerServices;
using System.Runtime.Intrinsics.X86;
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
        [Route("GetEmployerInfo")]
        //[Authorize(Roles = "Employer, Admin, Student")]
        public async Task<JsonResult> GetEmployerInfo(string? employerId = "")
        {
            var logged = await UserManager.GetUserAsync(User);
            if (employerId != null && employerId != "")
                logged = null;
            var employer = await Context.Employers
                .Where(i => i.Id == (logged != null ? logged.Id : employerId))
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
                        employer.Id,
                        employer.Picture,
                        employer.CompanyName,
                        employer.About,
                        employer.Likes,
                        employer.Address,
                        employer.PhoneNumber,
                        employer.Email,
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
        [Route("GetEmployerCategories")]
        //[Authorize(Roles = "Employer, Admin, Student")]
        public async Task<JsonResult> GetEmployerCategories(string? employerId = "")
        {
            var logged = await UserManager.GetUserAsync(User);
            if (employerId != null && employerId != "")
                logged = null;
            var internships = await Context.Internships
                .Where(i => i.Employer.Id == (logged != null ? logged.Id : employerId))
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
        public async Task<JsonResult> GetEmployers()
        {
            var employers = await Context.Employers
            .Include(i => i.Internships)
            .Include(i => i.Ratings)
            .ToListAsync();
            if (employers != null)
            {
                return new JsonResult(new
                {
                    succeeded = true,
                    employers = new
                    {
                        Employers = employers.Select(emp => new
                        {
                            id = emp.Id,
                            emp.Picture,
                            emp.CompanyName,
                            emp.About,
                            emp.Address,
                            emp.Likes,
                            emp.Email,
                            InternshipCount = emp.Internships.Count,
                            Ratings = emp.Ratings
                            .Select(r => new { r.OverallScore }),

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

        [HttpGet]
        [Route("GetStatistics")]
        public async Task<JsonResult> GetStatistics()
        {
            var employers = await Context.Employers
            .Include(i => i.Internships)
            .Include(i => i.Ratings)
            .ToListAsync();
            if (employers != null)
            {
                return new JsonResult(new
                {
                    succeeded = true,
                    statistics = new
                    {
                        EmployerCount = Context.Employers.ToList().Count,
                        RatingCount = Context.Ratings.ToList().Count,
                        InternshipCount = Context.Internships.ToList().Count,
                        StudentCount = Context.Students.ToList().Count,

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
        [Route("GetRankedEmployers")]
        public async Task<JsonResult> GetRankedEmployers()
        {
            var employers = await Context.Employers
            .Include(i => i.Internships)
            .Include(i => i.Ratings)
            .ToListAsync();
            if (employers != null)
            {
                return new JsonResult(new
                {
                    succeeded = true,
                    employers = new
                    {
                        Employers = employers.Select(emp => new
                        {
                            id = emp.Id,
                            emp.Picture,
                            emp.CompanyName,
                            emp.About,
                            emp.Address,
                            emp.Likes,
                            emp.Email,
                            InternshipCount = emp.Internships.Count,
                            Ratings = emp.Ratings
                            .Select(r => new { r.OverallScore }),

                        }).OrderByDescending(x => x.InternshipCount)

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
        [Route("GetMostRankedEmployers")]
        public async Task<JsonResult> GetMostRankedEmployers()
        {
            var employers = await Context.Employers
            .Include(i => i.Internships)
            .Include(i => i.Ratings)
            .ToListAsync();
            if (employers != null)
            {
                return new JsonResult(new
                {
                    succeeded = true,
                    employers = new
                    {
                        Employers = employers.Select(emp => new
                        {
                            emp.Picture,
                            emp.CompanyName,
                            emp.About,
                            emp.Address,
                            emp.Likes,
                            emp.Email,
                            InternshipCount = emp.Internships.Count,
                            Ratings = emp.Ratings.Count != 0 ? emp.Ratings
                             .Sum(i => i.OverallScore) / (emp.Ratings.Count) : -1

                        }).OrderByDescending(x => x.Ratings)
                        .Take(6)

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

        [HttpPost]
        [Route("AddRating/{skillImprovementScore}/{benefitsScore}/{overallScore}/{positiveExp}/{negativeExp}/{recommended}/{interviewLevel}/{generalImpression}/{selectionLength}/{employerid}")]
        [Authorize(Roles = "Student, Admin")]
        public async Task<JsonResult> AddRating(float skillImprovementScore, float benefitsScore, float overallScore, string positiveExp, string negativeExp, Boolean recommended, string interviewLevel, string generalImpression, int selectionLength, string employerid)
        {
            var employer = await Context.Employers
            .Where(i => i.Id == employerid)
            .Include(i => i.Ratings)
            .FirstOrDefaultAsync();
            if (employer != null)
            {
                var rating = new Rating
                {
                    SkillImprovementScore = skillImprovementScore,
                    BenefitsScore = benefitsScore,
                    OverallScore = overallScore,
                    PositiveExperience = positiveExp,
                    NegativeExperience = negativeExp,
                    Recommended = recommended,
                    InterviewLevel = interviewLevel,
                    GeneralImpression = generalImpression,
                    SelectionLength = selectionLength,
                    Likes = 0,
                    Dislikes = 0,
                    Employer = employer
                };
                await Context.Ratings.AddAsync(rating);
                await Context.SaveChangesAsync();
                return new JsonResult(new { succeeded = true });
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
        [Route("GetEmployerInternships/{employerID}")]
        [Authorize(Roles = "Student, Admin")]
        public async Task<JsonResult> GetEmployerInternships(string employerID)
        {
            var logged = await UserManager.GetUserAsync(User);
            var employer=await Context.Employers
            .Where(u=>u.Id==employerID)
            .FirstOrDefaultAsync();
            var student = await Context.Students
            .Where(u => u.Id == logged.Id)
            .Include(u => u.PreviousInternships)
            .ThenInclude(i => i.Employer)
            .FirstOrDefaultAsync();

            if (student != null && employer!=null)
            {
                return new JsonResult(new
                {
                    succeeded = true,
                    internships = new 
                    {
                        Employer=employer.CompanyName,
                        Internships=student.PreviousInternships
                        .Where(u=>u.Employer==employer)
                        .Select(a => new
                        {
                            InternshipID = a.ID,
                            a.Title
                        })
                    }

                }
                );
            }
            else
            {
                return new JsonResult(new
                {
                    succeeded = false,
                    error = "Student Not Found"
                });
            }
        }

        [HttpGet]
        [Route("GetRatingStatus/{employerID}")]
        [Authorize(Roles = "Student, Admin")]
        public async Task<JsonResult> GetRatingStatus(string employerID)
        {
            var logged = await UserManager.GetUserAsync(User);
            var employer=await Context.Employers
            .Where(u=>u.Id==employerID)
            .Include(u=>u.Internships)
            .ThenInclude(u=>u.PreviousStudents)
            .FirstOrDefaultAsync();
            var student = await Context.Students
            .Where(u => u.Id == logged.Id)
            .Include(u => u.PreviousInternships)
            .ThenInclude(i => i.Employer)
            .FirstOrDefaultAsync();

            if (student != null && employer!=null)
            {
                var studentInternships=student.PreviousInternships;
                var finished=false;
                foreach(var s in studentInternships)
                {
                    if(employer.Internships.Contains(s))
                    {
                        finished=true;
                    }
                }
                return new JsonResult(new
                {
                    succeeded = true,
                    status = new 
                    {
                        Status=(finished==true)?1:-1
                    }

                }
                );
            }
            else
            {
                return new JsonResult(new
                {
                    succeeded = false,
                    error = "Student Not Found"
                });
            }
        }



    }
}