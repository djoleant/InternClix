using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StudentController : ControllerBase
    {

        [HttpGet]
        [Route("Proba")]
        [Authorize(Roles = "Student")]
        public ActionResult Proba()
        {
            return Ok("Proba");
        }
    }
}