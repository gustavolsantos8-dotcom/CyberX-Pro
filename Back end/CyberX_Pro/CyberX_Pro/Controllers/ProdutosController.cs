using Microsoft.AspNetCore.Mvc;
using CyberX_Pro.Data;
using CyberX_Pro.Models;

namespace CyberX_Pro.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class ProdutosController : ControllerBase
    {
        private readonly GerencialContext _context;

        public ProdutosController(GerencialContext context)
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
                produtos.Id = int.Parse(idprodutosLogado);

            _context.Add(produtos);
            _context.SaveChanges();
            return Created("", produtos);
        }

        [HttpDelete]
        public IActionResult DeletaProdutos(int id)
        {
            var produtosLogado = HttpContext.Session.GetString("ProdutoLogado");
            if (produtosLogado == null)
            {
                return Unauthorized("Faça login antes!");
            }
            var produtoDoBanco = _context.Produtos.Find(id);
            if (produtoDoBanco == null)
            {
                return NotFound("Não encontrado!");
            }
            _context.Remove(produtoDoBanco);
            _context.SaveChanges();
            return Ok("Deletado");
        }

        [HttpPut]
        public IActionResult AtualizaProdutos(int id, Produtos produtos)
        {
            var usuarioLogado = HttpContext.Session.GetString("IdLogado");
            if (usuarioLogado == null)
            {
                return Unauthorized("Faça login antes!");
            }

            var produtoDoBanco = _context.Produtos.Find(id);
            if (produtoDoBanco == null)
            {
                return NotFound("Produto não existe no banco!");
            }
            produtoDoBanco.Nome = produtos.Nome;
            produtoDoBanco.Valor_Do_Produto = produtos.Valor_Do_Produto;

            _context.SaveChanges();
            return Ok("Atualizado");
        }
    }
}
