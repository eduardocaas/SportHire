using FluentAssertions;
using NSubstitute;
using SportHire.Identity.Core.Entities;
using SportHire.Identity.Core.Repositories;
using SportHire.Identity.Infrastructure.Persistence.Repositories;
using SportHire.Identity.UnitTests.TestData.ObjectMothers;
using Xunit.Abstractions;

namespace SportHire.Identity.UnitTests.Infrastructure.Repositories.Tests
{
    public class WalletRepositoryTests
    {
        private readonly ITestOutputHelper _output;

        public WalletRepositoryTests(ITestOutputHelper output)
        {
            _output = output;
        }

        [Fact]
        public async Task UserAndWalletExists_GetBalanceByEmail_ReturnBalance()
        {
            // Arrange
            var user = UserMother.UserWithWallet;

            var walletRepository = Substitute.For<IWalletRepository>();
            var userRepository = Substitute.For<IUserRepository>();

            userRepository.GetByEmailAsync(user.Email).Returns(Task.FromResult((User?) user));

            // Act
            decimal balance = await walletRepository.GetBalanceByEmail(user.Email);

            // Assert
            balance.Should().Be(user.Wallet.Balance);
        }
    }
}
