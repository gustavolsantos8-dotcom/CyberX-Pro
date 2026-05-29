using CyberX_Pro.Models;
using Microsoft.EntityFrameworkCore;
namespace CyberX_Pro.Data
{
    public class GerencialContext : DbContext
    {
        public GerencialContext(DbContextOptions<GerencialContext> options)
            : base(options) { }
        public DbSet<Clientes> Clientes { get; set; }
        public DbSet<Funcionarios> Funcionarios { get; set; }
        public DbSet<Produtos> Produtos { get; set; }
        public DbSet<Pedidos> Pedidos { get; set; }
        public DbSet<Setores> Setores { get; set; }
        public DbSet<Funcionarios_dos_Pedidos> Funcionarios_dos_Pedidos { get; set; }
        public DbSet<Produtos_dos_Pedidos> Produtos_dos_Pedidos { get; set; }
    }
}
