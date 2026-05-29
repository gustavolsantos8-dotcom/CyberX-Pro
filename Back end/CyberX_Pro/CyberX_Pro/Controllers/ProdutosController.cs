using Microsoft.AspNetCore.Mvc;
using SistemaTarefas.Data;
using CyberX_Pro.Models;

namespace CyberX_Pro.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProdutosController : ControllerBase
    {
        private readonly CyberXContext _context;

        public ProdutosController(CyberXContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult CadastraProdutos(Produtos produtos)
        {
            var produtosLogado = HttpContext.Session.GetString("IdLogado");
            if (produtosLogado == null)
            {
                return Unauthorized("Faça login antes!");
            }
            var idprodutosLogado = Request.Cookies["IdLogado"];
            if (idprodutosLogado != null)
                produtos.Idclientes = int.Parse(idprodutosLogado);

            _context.Add(produtos);
            _context.SaveChanges();
            return Created("", produtos);
        }
    }
}
