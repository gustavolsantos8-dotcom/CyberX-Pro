using CyberX_Pro.Data;
using CyberX_Pro.Models;
using Microsoft.AspNetCore.Mvc;

namespace CyberX_Pro.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FuncionariosController : ControllerBase
    {
        private readonly GerencialContext _context;

        public FuncionariosController(GerencialContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult CadastraCliente(Funcionarios funcionarios)
        {
            _context.Add(funcionarios);
            _context.SaveChanges();
            return Created("", funcionarios);
        }
    }
}
