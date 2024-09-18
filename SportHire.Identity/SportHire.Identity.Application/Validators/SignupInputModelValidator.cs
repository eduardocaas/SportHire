using FluentValidation;
using SportHire.Identity.Application.InputModels;

namespace SportHire.Identity.Application.Validators
{
    public class SignupInputModelValidator : AbstractValidator<SignupInputModel>
    {
        public SignupInputModelValidator()
        {
            
        }
    }
}
