using FluentAssertions;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using NSubstitute;
using SportHire.Identity.Infrastructure.Security.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Xunit.Abstractions;

namespace SportHire.Identity.UnitTests.Infrastructure.Security.Tests
{
    public class AuthServiceTests
    {
        private readonly ITestOutputHelper _output;
        private readonly IConfiguration _configuration;
        private readonly IAuthService _authService;
        
        public AuthServiceTests(ITestOutputHelper output)
        {
            _output = output;
            _configuration = Substitute.For<IConfiguration>();
            _authService = new AuthService(_configuration);
        }

        #region generateSha256Hash_Tests
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
        #endregion

        #region generateJwtToken_Tests
        [Fact]
        public void ValidData_GenerateJwtToken_ShouldReturnValidTokenWithCorrectClaims()
        {
            // Arrange
            var email = "user@test.com";
            var name = "User Test";

            var issuer = "Test-Issuer";
            var audience = "Test-Audience";

            var privateKeyPath = "../../../../SportHire.Identity.Infrastructure/Keys/private.pem";
            var publicKeyPath = "../../../../SportHire.Identity.Infrastructure/Keys/public.pem"; 

            _configuration["Jwt:Issuer"].Returns(issuer);
            _configuration["Jwt:Audience"].Returns(audience);
            _configuration.GetSection("Jwt:PrivateKeyPath").Value.Returns(privateKeyPath);

            // Act 
            var tokenString = _authService.GenerateJwtToken(email, name);

            // Assert
            tokenString.Should().NotBeNullOrEmpty();

            var handler = new JwtSecurityTokenHandler();
            var jwt = handler.ReadJwtToken(tokenString);

            // Assert claims
            jwt.Claims.Should().Contain(c => c.Type == ClaimTypes.Email && c.Value == email);
            jwt.Claims.Should().Contain(c => c.Type == ClaimTypes.Name && c.Value == name);

            // Assert issuer and audience
            jwt.Issuer.Should().Be(issuer);
            jwt.Audiences.Should().Contain(audience);

            // Assert token lifetime
            var expectedExpiration = DateTime.UtcNow.AddHours(8);
            jwt.ValidTo.Should().BeCloseTo(expectedExpiration, TimeSpan.FromMinutes(1));

            // Assert token signature
            using (var rsa = RSA.Create())
            {
                var pem = File.ReadAllText(publicKeyPath);
                rsa.ImportFromPem(pem);

                var validationParameters = new TokenValidationParameters
                {
                    ValidIssuer = issuer,
                    ValidAudience = audience,
                    IssuerSigningKey = new RsaSecurityKey(rsa),
                    ValidateLifetime = true
                };

                handler.ValidateToken(tokenString, validationParameters, out _);
            }
        }
        #endregion
    }
}