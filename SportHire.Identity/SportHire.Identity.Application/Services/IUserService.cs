using SportHire.Identity.Application.InputModels;
using SportHire.Identity.Application.ViewModels;

namespace SportHire.Identity.Application.Services
{
    public interface IUserService
    {
        SigninViewModel SignIn(SigninInputModel inputModel);
        int SignUp(SignupInputModel inputModel);
    }
}
