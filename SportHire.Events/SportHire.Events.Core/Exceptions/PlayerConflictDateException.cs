namespace SportHire.Events.Core.Exceptions
{
    public class PlayerConflictDateException : Exception
    {
        public PlayerConflictDateException(string? message) : base(message)
        {
        }
    }
}
