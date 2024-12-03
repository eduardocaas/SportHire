using SportHire.Identity.Core.Repositories;

namespace SportHire.Identity.Application.Services
{
    public class WalletService : IWalletService
    {
        private readonly IWalletRepository _repository;

        public WalletService(IWalletRepository repository)
        {
            _repository = repository;
        }

        public async Task AddBalanceAsync(string email, decimal amount)
        {
            await _repository.AddBalanceAsync(email, amount);
        }

        public async Task RemoveBalanceAsync(string email, decimal amount)
        {
            await _repository.RemoveBalanceAsync(email, amount);
        }
    }
}
