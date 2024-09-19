using FluentValidation;
using SportHire.Identity.Application.InputModels;
using System.Text.RegularExpressions;

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

        public bool ValidPassword(string password)
        {
            // 8 char - 1 uppercase - 1 lowercase - 1 number - 1 special
            var regex = new Regex(@"^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!*@#$%^&+=].*$)");

            return regex.IsMatch(password);
        }
    }
}
