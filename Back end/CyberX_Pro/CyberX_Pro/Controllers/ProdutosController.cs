using Microsoft.AspNetCore.Mvc;
using CyberX_Pro.Data;
using CyberX_Pro.Models;

namespace CyberX_Pro.Controllers
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

        [HttpGet("{id}")]
        public IActionResult RetornaProdutos(int id)
        {
            var produtos = _context.Produtos.Find(id);
            if (produtos == null)
            {
                return NotFound("Não há produtos com esse Id!");
            }
            return Ok(produtos);
        }

        [HttpPost]
        public IActionResult CadastraProdutos(Produtos produtos)
        {
            _context.Add(produtos);
            _context.SaveChanges();
            return Created("", produtos);
        }

        [HttpPut("{id}")]
        public IActionResult AtualizaProdutos(int id, Produtos produtos)
        {
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

        [HttpDelete("{id}")]
        public IActionResult DeletaProdutos(int id)
        {
            var produtoDoBanco = _context.Produtos.Find(id);
            if (produtoDoBanco == null)
            {
                return NotFound("Não encontrado!");
            }
            _context.Remove(produtoDoBanco);
            _context.SaveChanges();
            return Ok("Deletado");
        }
    }
}