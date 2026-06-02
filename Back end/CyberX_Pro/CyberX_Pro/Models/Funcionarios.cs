namespace CyberX_Pro.Models
{
    public class Funcionarios
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Nome { get; set; }
        public string Cargo { get; set; }
        public string Telefone { get; set; }
        public string Cpf { get; set; }
        public string Senha { get; set; }
        public DateOnly DataNasc { get; set; }
        
    }
}
