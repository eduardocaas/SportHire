using FluentValidation;
using SportHire.Identity.Application.InputModels;

namespace SportHire.Identity.Application.Validators
{
    public class SignupInputModelValidator : AbstractValidator<SignupInputModel>
    {
        public SignupInputModelValidator()
        {
            RuleFor(u => u.FullName)
                .NotEmpty()
                .NotNull()
                .WithMessage("Nome é obrigatório!");

            RuleFor(u => u.Email)
                .EmailAddress()
                .WithMessage("E-mail não válido!");


        }
    }
}
