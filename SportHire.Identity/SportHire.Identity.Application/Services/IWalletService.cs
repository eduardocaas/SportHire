namespace SportHire.Identity.Application.Services
{
    public interface IWalletService
    {
        Task AddBalanceAsync(string email, decimal amount);
    }
}
