using SportHire.Identity.Core.Repositories;

namespace SportHire.Identity.Infrastructure.Persistence.Repositories
{
    public class WalletRepository : IWalletRepository
    {
        private readonly IUserRepository _userRepository;

        public WalletRepository(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task AddBalanceAsync(string email, decimal amount)
        {
            var user = await _userRepository.GetByEmailAsync(email);

            if (user == null)
                throw new ArgumentException("User not found");

            if (user.Wallet == null)
                throw new ArgumentException("Wallet not found");

            user.Wallet.Balance += amount;

            await _userRepository.UpdateAsync(user);
        }
    }
}
