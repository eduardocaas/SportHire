using FluentAssertions;
using Microsoft.Extensions.Configuration;
using NSubstitute;
using SportHire.Identity.Infrastructure.Security.Services;

namespace SportHire.Identity.UnitTests.Infrastructure.Security.Tests
{
    public class AuthServiceTests
    {
        private readonly IAuthService _authService;

        public AuthServiceTests()
        {
            _authService = new AuthService(Substitute.For<IConfiguration>());
        }

        [Fact]
        public void ValidPassword_GenerateSha256Hash_ReturnHash()
        {
            // Arrange
            var password = "testPassword";
            var expectedHashed = "fd5cb51bafd60f6fdbedde6e62c473da6f247db271633e15919bab78a02ee9eb";

            // Act 
            var passwordHashed = _authService.GenerateSha256Hash(password);

            // Assert
            passwordHashed.Should().NotBeNullOrEmpty();
            passwordHashed.Should().BeEquivalentTo(expectedHashed);
        }

        [Fact]
        public void MultipleInputs_GenerateSha256Hash_ShouldReturnDifferentHashForDifferentInputs()
        {
            // Arrange
            var password1 = "testPassword1";
            var password2 = "testPassword2";

            // Act
            var hash1 = _authService.GenerateSha256Hash(password1);
            var hash2 = _authService.GenerateSha256Hash(password2);

            // Assert
            hash1.Should().NotBe(hash2);
        }
    }
}
