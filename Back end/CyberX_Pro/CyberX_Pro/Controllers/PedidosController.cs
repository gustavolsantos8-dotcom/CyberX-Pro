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

        [HttpGet]
        public IActionResult RetornaPedidos()
        {
            var pedidos = _context.Pedidos.ToList();
            return Ok(pedidos);
        }

        [HttpGet("{id}")]
        public IActionResult RetornaPedido(int id)
        {
            var pedido = _context.Pedidos.Find(id);
            if (pedido == null)
            {
                return NotFound("Não há pedido com esse Id!");
            }
            return Ok(pedido);
        }

        [HttpPost]
        public IActionResult CadastraPedido(Pedidos pedido)
        {
            _context.Add(pedido);
            _context.SaveChanges();
            return Created("", pedido);
        }

        [HttpPut("{id}")]
        public IActionResult AtualizaPedido(int id, Pedidos pedido)
        {
            var pedidoDoBanco = _context.Pedidos.Find(id);
            if (pedidoDoBanco == null)
            {
                return NotFound("Pedido não existe no banco!");
            }
            pedidoDoBanco.Status = pedido.Status;
            pedidoDoBanco.Descricao = pedido.Descricao;
            pedidoDoBanco.Valor = pedido.Valor;
            _context.SaveChanges();
            return Ok("Atualizado");
        }

        [HttpDelete("{id}")]
        public IActionResult DeletaPedido(int id)
        {
            var pedidoDoBanco = _context.Pedidos.Find(id);
            if (pedidoDoBanco == null)
            {
                return NotFound("Pedido não encontrado!");
            }
            _context.Remove(pedidoDoBanco);
            _context.SaveChanges();
            return Ok("Deletado");
        }
    }
}