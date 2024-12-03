namespace SportHire.Identity.Application.Services
{
    public interface IWalletService
    {
        Task<decimal> GetBalanceAsync(string email);
        Task AddBalanceAsync(string email, decimal amount);
        Task RemoveBalanceAsync(string email, decimal amount);
    }
}
