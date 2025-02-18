using Microsoft.Extensions.Configuration;
using NSubstitute;
using SportHire.Identity.Infrastructure.Security.Services;

namespace SportHire.Identity.UnitTests.Infrastructure.Security.Tests
{
    public class AuthServiceTests
    {
        private readonly IAuthService _authService;

        public AuthServiceTests(IAuthService authService)
        {
            _authService = new AuthService(Substitute.For<IConfiguration>());
        }
    }
}
