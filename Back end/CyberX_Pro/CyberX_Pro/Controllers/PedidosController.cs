using Microsoft.AspNetCore.Mvc;
using CyberX_Pro.Data;
using CyberX_Pro.Models;
namespace CyberX_Pro.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class PedidosController : ControllerBase
    {
        private readonly GerencialContext _context;

        public PedidosController(GerencialContext context)
        {
            _context = context;
        }
    }
}
