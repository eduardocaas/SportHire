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

        [Fact]
        public async Task UserNotExists_GetBalanceByEmail_ThrowsException()
        {
            // Arrange 
            var walletRepository = Substitute.For<IWalletRepository>();
            var userRepository = Substitute.For<IUserRepository>();

            userRepository.GetByEmailAsync(Arg.Any<string>()).Returns(Task.FromResult((User?) null));

            // Act + Assert
            await walletRepository.Awaiting(r => r.GetBalanceByEmail("user@email.com"))
                .Should()
                .ThrowAsync<KeyNotFoundException>()
                .WithMessage(WalletRepository.USER_NOT_FOUND_MESSAGE);

            await userRepository.Received(1).GetByEmailAsync(Arg.Any<string>());
        }
    }
}
