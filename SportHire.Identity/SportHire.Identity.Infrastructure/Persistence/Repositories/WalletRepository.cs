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
            throw new NotImplementedException();
        }
    }
}
