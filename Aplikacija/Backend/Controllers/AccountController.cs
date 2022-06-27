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

        [Route("GetApplications/{username}")]
        [HttpGet]
        [Authorize(Roles = " Admin")]
        public async Task<JsonResult> GetApplications(string username)
        {
            try
            {
                var applications = await Context.Students
                .Where(s => s.UserName == username)
                .Include(s => s.InternshipApplications)
                .ThenInclude(a => a.Internship)
                .ThenInclude(i => i.Employer)
                .Select(a => new
                {
                    Name = a.FirstName + " " + a.LastName,
                    a.Id,
                    Applications = a.InternshipApplications.Select(x => new
                    {
                        x.ID,
                        x.Internship.Title,
                        x.Internship.Employer.CompanyName,
                        x.Status
                    })
                })
                .FirstOrDefaultAsync();




                return new JsonResult(new { succeeded = true, applications });
            }
            catch (Exception e)
            {
                return new JsonResult(new { succeeded = false, errors = e.Message });
            }
        }

        [Route("GetApplications/{studentId}/{applicationId}/{newStatus}")]
        [HttpPut]
        [Authorize(Roles = " Admin")]
        public async Task<JsonResult> ChangeStatus(string studentId, int applicationId, string newStatus)
        {
            try
            {
                if (newStatus != "Applied" && newStatus != "Finished" && newStatus != "Denied" && newStatus != "Accepted")
                {
                    return new JsonResult(new { succeeded = false, errors = "Invalid status" });
                }

                var student = await Context.Students
                .Where(s => s.Id == studentId)
                .Include(s => s.InternshipApplications)
                .FirstOrDefaultAsync();

                if (student != null)
                {
                    var application = student.InternshipApplications.Where(a => a.ID == applicationId).FirstOrDefault();
                    if (application != null)
                    {
                        application.Status = newStatus;
                        await Context.SaveChangesAsync();
                        return new JsonResult(new { succeeded = true });
                    }
                }
                return new JsonResult(new { succeeded = false, errors = "Status not changed" });


            }
            catch (Exception e)
            {
                return new JsonResult(new { succeeded = false, errors = e.Message });
            }
        }

        [Route("GetApplicationsStatistics")]
        [HttpGet]
        [Authorize(Roles = " Admin")]
        public JsonResult GetApplicationsStatistics()
        {
            try
            {
                var applications = Context.InternshipApplication;
                return new JsonResult(new
                {
                    succeeded = true,
                    statistics =
                        new
                        {
                            Applied = applications.Where(a => a.Status == "Applied").Count(),
                            Finished = applications.Where(a => a.Status == "Finished").Count(),
                            Accepted = applications.Where(a => a.Status == "Accepted").Count(),
                            Denied = applications.Where(a => a.Status == "Denied").Count(),
                        }
                });
            }
            catch (Exception e)
            {
                return new JsonResult(new { succeeded = false, errors = e.Message });
            }
        }


    }
}