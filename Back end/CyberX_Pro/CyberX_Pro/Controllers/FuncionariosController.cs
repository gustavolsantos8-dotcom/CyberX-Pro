using CyberX_Pro.Data;
using CyberX_Pro.Models;
using Microsoft.AspNetCore.Mvc;

namespace CyberX_Pro.Controller
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
        public IActionResult CadastraFuncionarios(Funcionarios funcionarios)
        {
            _context.Add(funcionarios);
            _context.SaveChanges();
            return Created("", funcionarios);
        }

        [HttpGet("{id}")]
        public IActionResult RetornaFuncionarios(int id)
        {
            var funcionarios = _context.Funcionarios.Find(id);
            if (funcionarios == null)
            {
                return NotFound("Não há Funcionários com esse Id!");
            }
            return Ok(funcionarios);
        }

        [HttpPut("{id}")]
        public IActionResult AtualizaFuncionario(Funcionarios funcionario)
        {
            var funcionarioDoBanco = _context.Funcionarios.Find("IdFuncionario");
            if (funcionarioDoBanco == null)
            {
                return NotFound("Funcionario não existe no banco!");
            }
            funcionarioDoBanco.Nome = funcionario.Nome;
            funcionarioDoBanco.Email = funcionario.Email;
            funcionarioDoBanco.Senha = funcionario.Senha;
            _context.SaveChanges();
            return Ok("Atualizado");
        }

        [HttpDelete("{id}")]
        public IActionResult DeletaFuncionario(int id)
        {
            var funcionarioDoBanco = _context.Funcionarios.Find(id);
            if (funcionarioDoBanco == null)
            {
                return NotFound("Não encontrado!");
            }
            _context.Remove(funcionarioDoBanco);
            _context.SaveChanges();
            return Ok("Deletado");
        }

        [HttpPost("login")]
        public IActionResult Login(Funcionarios funcionario)
        {
            var funcionarios = _context.Funcionarios
                 .Where(c => c.Email.Equals(funcionario.Email) &&
              c.Senha.Equals(funcionario.Senha)).ToList();
            if (!funcionarios.Any())
            {
                return Unauthorized("Usuário ou senha Inválidos!");
            }
            HttpContext.Session.SetString("IdFuncionario", Convert.ToString(funcionarios[0].Id));
            Response.Cookies.Append("IdFuncionario", funcionarios[0].Id.ToString(),
           new CookieOptions
           {
               HttpOnly = true,
               Secure = true,
               SameSite = SameSiteMode.None
           });
            return Ok("login realizado com sucesso");

        }
    }
}
