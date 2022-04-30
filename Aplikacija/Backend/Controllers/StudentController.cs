using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StudentController : ControllerBase
    {
        
       [HttpGet]
       [Route("Proba")]
       public ActionResult Proba()
       {
           return Ok("Proba");
       }
    }
}