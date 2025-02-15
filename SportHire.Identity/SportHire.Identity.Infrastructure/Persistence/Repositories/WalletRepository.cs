using SportHire.Identity.Core.Repositories;

namespace SportHire.Identity.Infrastructure.Persistence.Repositories
{
    public class WalletRepository : IWalletRepository
    {
        public const string USER_NOT_FOUND_MESSAGE = "Usuário não encontrado";
        public const string WALLET_NOT_FOUND_MESSAGE = "Carteira não encontrada";
        public const string INSUFFICIENT_BALANCE_MESSAGE = "Saldo insuficiente";

        private readonly IUserRepository _userRepository;

        public WalletRepository(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<decimal> GetBalanceByEmail(string email)
        {
            var user = await _userRepository.GetByEmailAsync(email);


            if (user == null)
                throw new KeyNotFoundException(USER_NOT_FOUND_MESSAGE);

            if (user.Wallet == null)
                throw new KeyNotFoundException(WALLET_NOT_FOUND_MESSAGE);

            return user.Wallet.Balance;
        }

        public async Task AddBalanceAsync(string email, decimal amount)
        {
            var user = await _userRepository.GetByEmailAsync(email);

            if (user == null)
                throw new KeyNotFoundException(USER_NOT_FOUND_MESSAGE);

            if (user.Wallet == null)
                throw new KeyNotFoundException(WALLET_NOT_FOUND_MESSAGE);

            user.Wallet.Balance += amount;

            await _userRepository.UpdateAsync(user);
        }

        public async Task RemoveBalanceAsync(string email, decimal amount)
        {
            var user = await _userRepository.GetByEmailAsync(email);

            if (user == null)
                throw new KeyNotFoundException(USER_NOT_FOUND_MESSAGE);

            if (user.Wallet == null)
                throw new KeyNotFoundException(WALLET_NOT_FOUND_MESSAGE);

            if (user.Wallet.Balance < amount)
            {
                throw new InvalidOperationException(INSUFFICIENT_BALANCE_MESSAGE);
            }
            user.Wallet.Balance -= amount;

            await _userRepository.UpdateAsync(user);
        }
    }
}
