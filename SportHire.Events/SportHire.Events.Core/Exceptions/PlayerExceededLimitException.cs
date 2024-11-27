namespace SportHire.Events.Core.Exceptions
{
    public class PlayerExceededLimitException : Exception
    {
        public PlayerExceededLimitException(string? message) : base(message)
        {
        }
    }
}
