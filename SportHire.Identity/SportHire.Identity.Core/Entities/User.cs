namespace SportHire.Identity.Core.Entities
{
    public class User
    {
        public User(string fullName, string email, string password)
        {
            FullName = fullName;
            Email = email;
            Password = password;
        }

        public Guid Id { get; private set; }
        public string FullName { get; private set; }
        public string Email { get; private set; }
        public string Password { get; private set; }
        public bool EmailConfirmed { get; private set; }
        public Wallet Wallet { get; set; }
    }
}
