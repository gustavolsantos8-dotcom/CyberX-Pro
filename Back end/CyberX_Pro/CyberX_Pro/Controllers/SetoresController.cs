using Microsoft.AspNetCore.Mvc;
using CyberX_Pro.Models;

namespace CyberX_Pro.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class SetorController : ControllerBase
    {
        private static List<Setores> setores = new List<Setores>();

        [HttpGet]
        public IActionResult GetSetores()
        {
            return Ok(setores);
        }

        [HttpPost]
        public IActionResult Post(Setores setor)
        {
            setores.Add(setor);
            return Created("", setor);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Setores setorAtualizado)
        {
            var setor = setores.FirstOrDefault(s => s.Id == id);

            if (setor == null)
                return NotFound();

            setor.Nome_de_Setor = setorAtualizado.Nome_de_Setor;

            return Ok(setor);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var setor = setores.FirstOrDefault(s => s.Id == id);

            if (setor == null)
                return NotFound();

            setores.Remove(setor);

            return Ok();
        }
    }
}