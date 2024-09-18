﻿using SportHire.Identity.Application.InputModels;
using SportHire.Identity.Application.ViewModels;
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

        public SigninViewModel SignIn(SigninInputModel inputModel)
        {
            throw new NotImplementedException();
        }

        public async Task<int> SignUp(SignupInputModel inputModel)
        {
            throw new NotImplementedException();
        }
    }
}
