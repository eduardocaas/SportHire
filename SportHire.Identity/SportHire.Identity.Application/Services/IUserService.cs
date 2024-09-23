using SportHire.Identity.Application.InputModels;
using SportHire.Identity.Application.ViewModels;

namespace SportHire.Identity.Application.Services
{
    public interface IUserService
    {
        Task<SigninViewModel> SignIn(SigninInputModel inputModel);
        Task<Guid> SignUp(SignupInputModel inputModel);
        Task<UserViewModel> GetUser(Guid id);
    }
}
