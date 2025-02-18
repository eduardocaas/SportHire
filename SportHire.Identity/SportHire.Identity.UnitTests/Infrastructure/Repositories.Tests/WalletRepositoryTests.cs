using FluentAssertions;
using NSubstitute;
using SportHire.Identity.Core.Repositories;
using SportHire.Identity.Infrastructure.Persistence.Repositories;
using SportHire.Identity.UnitTests.TestData.ObjectMothers;
using Xunit.Abstractions;

namespace SportHire.Identity.UnitTests.Infrastructure.Repositories.Tests
{
    /*
       Testes apenas para demonstrar funcionamento das ferramentas,
       os testes reais ficam nos demais diretórios
     */

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

            walletRepository.GetBalanceByEmail(Arg.Any<string>()).Returns(1000);

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

            walletRepository.When(w => w.GetBalanceByEmail("notfound@email.com")).Do(w =>  { throw new KeyNotFoundException(WalletRepository.USER_NOT_FOUND_MESSAGE); });

            // Act + Assert
            Func<Task> getBalanceByEmail = () => walletRepository.GetBalanceByEmail("notfound@email.com");
            await getBalanceByEmail.Should().ThrowAsync<KeyNotFoundException>();

            await walletRepository.Received(1).GetBalanceByEmail(Arg.Any<string>());
        }
    }
}
