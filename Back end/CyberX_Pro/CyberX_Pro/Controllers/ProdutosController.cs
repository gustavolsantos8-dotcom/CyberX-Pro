using Microsoft.AspNetCore.Mvc;

namespace CyberX_Pro.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProdutosController : ControllerBase
    {
        private readonly GerenciaContext _context;

        public ProdutosController(GerenciaContext context)
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
                produtos.IdClientes = int.Parse(idProdutosLogado);

            _context.Add(produtos);
            _context.SaveChanges();
            return Created("", produtos);
        }
    }
}
