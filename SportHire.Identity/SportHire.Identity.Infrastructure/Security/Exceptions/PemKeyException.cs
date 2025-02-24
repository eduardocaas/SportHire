namespace SportHire.Identity.Infrastructure.Security.Exceptions
{
    public class PrivateKeyFileNotFoundException : Exception
    {
        public PrivateKeyFileNotFoundException()
            : base("O arquivo de chave privada não foi encontrado.") { }

        public PrivateKeyFileNotFoundException(Exception innerException)
            : base("O arquivo de chave privada não foi encontrado.", innerException) { }

        public PrivateKeyFileNotFoundException(string message, Exception innerException)
            : base(message, innerException) { }
    }

    public class InvalidPrivateKeyException : Exception
    {
        public InvalidPrivateKeyException()
            : base("A chave privada fornecida é inválida.") { }

        public InvalidPrivateKeyException(Exception innerException)
            : base("A chave privada fornecida é inválida.", innerException) { }

        public InvalidPrivateKeyException(string message, Exception innerException)
            : base(message, innerException) { }
    }
}
