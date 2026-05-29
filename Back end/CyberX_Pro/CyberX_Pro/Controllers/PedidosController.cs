using Microsoft.AspNetCore.Mvc;
using CyberX_Pro.Data;
using CyberX_Pro.Models;
namespace CyberX_Pro.Controllers
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
