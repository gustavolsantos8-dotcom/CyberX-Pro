namespace CyberX_Pro.Models
{
    public class Funcionarios
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Nome { get; set; }
        public string Tipo { get; set; }
        public string Cpf { get; set; }
        public int Senha { get; set; }
        public DateOnly DataNasc { get; set; }
    }
}
