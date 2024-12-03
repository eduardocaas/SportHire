namespace SportHire.Identity.Core.Repositories
{
    public interface IWalletRepository
    {
        Task AddBalanceAsync(string email, decimal amount);
        Task RemoveBalanceAsync(string email, decimal amount);
    }
}
