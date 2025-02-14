using FluentAssertions;
using NSubstitute;
using SportHire.Identity.Core.Entities;
using SportHire.Identity.Core.Repositories;
using SportHire.Identity.UnitTests.TestData.ObjectMothers;

namespace SportHire.Identity.UnitTests.Infrastructure.Repositories.Tests
{
    public class WalletRepositoryTests
    {
        [Fact]
        public async Task UserAndWalletExists_GetBalanceByEmail_ReturnBalance()
        {
            // Arrange
            var user = UserMother.UserWithWallet;

            var walletRepository = Substitute.For<IWalletRepository>();
            var userRepository = Substitute.For<IUserRepository>();

            userRepository.GetByEmailAsync(user.Email).Returns(Task.FromResult(user));

            // Act
            decimal balance = await walletRepository.GetBalanceByEmail(user.Email);

            // Assert
            balance.Should().Be(user.Wallet.Balance);
        }
    }
}
