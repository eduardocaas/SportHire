using SportHire.Identity.Application.InputModels;
using SportHire.Identity.Application.ViewModels;
using SportHire.Identity.Core.Entities;
using SportHire.Identity.Core.Repositories;
using SportHire.Identity.Infrastructure.Security.Services;

namespace SportHire.Identity.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;
        private readonly IAuthService _authService;

        public UserService(IUserRepository repository, IAuthService authService)
        {
            _repository = repository;
            _authService = authService;
        }

        public async Task<SigninViewModel?> SignIn(SigninInputModel inputModel)
        {
            var passwordHash = _authService.GenerateSha256Hash(inputModel.Password);

            var user = await _repository.GetUserByEmailAndPasswordAsync(inputModel.Email, passwordHash);
            if (user == null) return null;

            var token = _authService.GenerateJwtToken(inputModel.Email);

            return new SigninViewModel(inputModel.Email, token);
        }

        public async Task<Guid> SignUp(SignupInputModel inputModel)
        {
            var passwordHash = _authService.GenerateSha256Hash(inputModel.Password);
            var user = new User(inputModel.FullName, inputModel.Email, passwordHash);

            await _repository.AddAsync(user);

            return user.Id;
        }

        public Task<UserViewModel> GetUser(int id)
        {
            throw new NotImplementedException();
        }
    }
}
