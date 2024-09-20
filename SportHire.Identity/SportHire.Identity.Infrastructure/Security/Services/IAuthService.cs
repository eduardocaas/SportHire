namespace SportHire.Identity.Infrastructure.Security.Services
{
    public interface IAuthService
    {
        string GenerateSha256Hash(string password);
        string GenerateJwtToken(string email);
    }
}
