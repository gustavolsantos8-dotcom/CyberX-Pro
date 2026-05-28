using CyberX_Pro.Models;
using Microsoft.EntityFrameworkCore;
namespace SistemaTarefas.Data
{
    public class CyberXContext : DbContext
    {
        public CyberXContext(DbContextOptions<CyberXContext> options)
            : base(options) { }
        public DbSet<Clientes> Cliente { get; set; }
    }
}
