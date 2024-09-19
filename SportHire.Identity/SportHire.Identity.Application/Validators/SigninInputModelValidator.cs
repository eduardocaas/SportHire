using FluentValidation;
using SportHire.Identity.Application.InputModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SportHire.Identity.Application.Validators
{
    public class SigninInputModelValidator : AbstractValidator<SigninInputModel>
    {
        public SigninInputModelValidator()
        {
            
        }
    }
}
