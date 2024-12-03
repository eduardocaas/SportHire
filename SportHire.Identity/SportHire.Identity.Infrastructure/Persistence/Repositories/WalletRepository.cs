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
                throw new ArgumentException("Usuário não encontrado");

            if (user.Wallet == null)
                throw new ArgumentException("Carteira não encontrada");

            user.Wallet.Balance += amount;

            await _userRepository.UpdateAsync(user);
        }

        public async Task RemoveBalanceAsync(string email, decimal amount)
        {
            var user = await _userRepository.GetByEmailAsync(email);

            if (user == null)
                throw new ArgumentException("Usuário não encontrado");

            if (user.Wallet == null)
                throw new ArgumentException("Carteira não encontrada");

            if (user.Wallet.Balance < amount)
            {
                throw new InvalidOperationException("Saldo menor que a quantia");
            }
            user.Wallet.Balance -= amount;

            await _userRepository.UpdateAsync(user);
        }
    }
}
