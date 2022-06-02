﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using Microsoft.AspNetCore.SignalR;
using Hubs;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InternshipController : ControllerBase
    {

        public InternClixDbContext Context { get; set; }

        public UserManager<ApplicationUser> UserManager { get; set; }

        private IHubContext<ChatHub> HubContext { get; set; }

        public InternshipController(
            InternClixDbContext dbContext,
            UserManager<ApplicationUser> userManager,
            IHubContext<ChatHub> hubContext
            )
        {
            Context = dbContext;
            UserManager = userManager;
            HubContext = hubContext;
        }

        [HttpPost]
        [Route("PostInternship")]
        [Authorize(Roles = "Employer, Admin")]
        public async Task<JsonResult> PostInternship([FromBody] InternshipModel info)
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
        [Route("GetCategories")]
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

        [HttpGet]
        [Route("GetInternship/{internshipId}")]
        [Authorize(Roles = "Student, Employer, Admin")]
        public async Task<JsonResult> GetInternship(int internshipId)
        {
            var internship = await Context.Internships
                .Where(i => i.ID == internshipId)
                .Include(i => i.Employer)
                .Include(i => i.Categories)
                .Include(i => i.Skills)
                .FirstOrDefaultAsync();
            if (internship != null)
            {
                return new JsonResult(new
                {
                    succeeded = true,
                    internship = new
                    {
                        internship.ID,
                        internship.Title,
                        internship.Description,
                        internship.Duration,
                        internship.Compensation,
                        EmployerName = internship.Employer.CompanyName,
                        internship.Skills,
                        Categories = internship.Categories
                            .Select(c => new { c.ID, c.Name })
                    }
                });
            }
            else
            {
                return new JsonResult(new
                {
                    succeeded = false,
                    error = "Internship Not Found"
                });
            }
        }

        [HttpGet]
        [Route("GetAppliedStudents/{internshipId}")]
        [Authorize(Roles = "Employer, Admin")]
        public async Task<JsonResult> GetAppliedStudents(int internshipId)
        {
            var internship = await Context.Internships
                .Where(i => i.ID == internshipId)
                .Include(i => i.InternshipApplications)
                .ThenInclude(a => a.Student.CV.Skills)
                .Include(i => i.InternshipApplications)
                .ThenInclude(a => a.Student.CV.AdditionalInfos)
                // .ThenInclude(s=>s.CV.Skills)
                // .ThenInclude(s=>s.CV.Skills)
                // .ThenInclude(s => s.CV.Skills)
                // .Include(i => i.AppliedStudents)
                // .ThenInclude(s => s.CV.AdditionalInfos)

                .FirstOrDefaultAsync();
            if (internship != null)
            {
                return new JsonResult(new
                {
                    succeeded = true,
                    internship = new
                    {
                        internship.ID,
                        Applicants = internship.InternshipApplications
                        .OrderBy(s => s.Date)
                        .Select(s =>
                        new
                        {
                            s.Student.Id,
                            ApplicationID = s.ID,
                            Name = s.Student.FirstName,
                            LastName = s.Student.LastName,
                            Skills = s.Student.CV.Skills.Select(k => new { k.ID, Label = k.Name }),
                            Languages = s.Student.CV.AdditionalInfos
                            .Where(a => a.Type == "Language")
                            .Select(a => new { Name = a.Title }),
                            s.Status
                        })
                    }
                });
            }
            else
            {
                return new JsonResult(new
                {
                    succeeded = false,
                    error = "Internship Not Found"
                });
            }
        }


        [HttpPost]
        [Route("InternshipAction")]
        [Authorize(Roles = "Employer, Admin")]
        public async Task<JsonResult> InternshipAction([FromQuery] int internshipId, string studentId, int applicationId, string action, bool? denyOthers, string? message)
        {
            if (denyOthers == null) denyOthers = false;
            if (message == null) message = "";
            var internship = await Context.Internships
                .Where(i => i.ID == internshipId)
                .Include(i => i.InternshipApplications)
                .ThenInclude(a => a.Student)
                .Include(i => i.Skills)
                .Include(i => i.Employer)
                .FirstOrDefaultAsync();
            var student = await Context.Students
                .Where(s => s.Id == studentId)
                .Include(s => s.InternshipApplications)
                .ThenInclude(a => a.Internship)
                .FirstOrDefaultAsync();
            if (student == null || internship == null)
                return new JsonResult(new
                {
                    succeeded = false,
                    error = "Internship or Student Not Found"
                });
            var application = internship.InternshipApplications
                .Where(a => a.ID == applicationId)
                .FirstOrDefault();
            if (application == null)
                return new JsonResult(new
                {
                    succeeded = false,
                    error = "Application Not Found"
                });

            //[title, companyName, location, compensation, duration, description, link, messageContent, ...skills] = content.split("^");
            string specialContent = $"{internship.Title}^{internship.Employer.CompanyName}^{internship.Employer.Address}^{internship.Compensation}^"
                + $"{internship.Duration}^{internship.Description}^{"insertlinkhere"}^{message}";
            string specialType = "INTERNSHIP_";
            foreach (var skill in internship.Skills)
            {
                specialContent += "^" + skill.Name;
            }
            if (action == "Accept")
            {
                application.Status = "Accepted";
                application.Date = DateTime.Now;
                if ((bool)denyOthers)
                {
                    string denyContent = $"{internship.Title}^{internship.Employer.CompanyName}^{internship.Employer.Address}^{internship.Compensation}^"
                + $"{internship.Duration}^{internship.Description}^{"insertlinkhere"}^Your application has been denied";
                    foreach (var skill in internship.Skills)
                    {
                        denyContent += "^" + skill.Name;
                    }
                    foreach (var appl in internship.InternshipApplications)
                    {
                        if (appl.ID != applicationId) //dodati eentualno slanje poruke
                        {
                            appl.Status = "Denied";
                            appl.Date = DateTime.Now;
                            Context.Messages.Add(
                                new Message
                                {
                                    Content = denyContent,
                                    Receiver = appl.Student,
                                    Type = "INTERNSHIP_DENY",
                                    TimeSent = DateTime.Now,
                                    Sender = internship.Employer
                                }
                                );
                        }
                    }
                }
                specialType += "ACCEPT";
                Context.Messages.Add(
                    new Message
                    {
                        Content = specialContent,
                        Receiver = student,
                        Type = specialType,
                        TimeSent = DateTime.Now,
                        Sender = internship.Employer
                    }
                    );

            }
            else if (action == "Deny")
            {
                application.Status = "Accepted";
                application.Date = DateTime.Now;
                specialType += "DENY";
                Context.Messages.Add(
                    new Message
                    {
                        Content = specialContent,
                        Receiver = student,
                        Type = specialType,
                        TimeSent = DateTime.Now,
                        Sender = internship.Employer
                    }
                    );
            }
            else if (action == "Finish")
            {
                application.Status = "Finished";
                application.Date = DateTime.Now;
            }
            await Context.SaveChangesAsync();
            return new JsonResult(new { succeeded = true });


        }


    }
}