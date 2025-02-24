using System;

namespace SportHire.Identity.Infrastructure.Security.Exceptions
{
    public class PrivateKeyFileNotFoundException : Exception
    {
        public const string PRIVATE_KEY_FILE_NOT_FOUND_MESSAGE = "O arquivo de chave privada não foi encontrado.";

        public PrivateKeyFileNotFoundException()
            : base(PRIVATE_KEY_FILE_NOT_FOUND_MESSAGE) { }

        public PrivateKeyFileNotFoundException(Exception innerException)
            : base(PRIVATE_KEY_FILE_NOT_FOUND_MESSAGE, innerException) { }

        public PrivateKeyFileNotFoundException(string message, Exception innerException)
            : base(message, innerException) { }
    }

    public class InvalidPrivateKeyException : Exception
    {
        public const string INVALID_PRIVATE_KEY_MESSAGE = "A chave privada fornecida é inválida";

        public InvalidPrivateKeyException()
            : base(INVALID_PRIVATE_KEY_MESSAGE) { }

        public InvalidPrivateKeyException(Exception innerException)
            : base(INVALID_PRIVATE_KEY_MESSAGE, innerException) { }

        public InvalidPrivateKeyException(string message, Exception innerException)
            : base(message, innerException) { }
    }
}
