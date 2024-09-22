using FluentValidation;
using SharpGrip.FluentValidation.AutoValidation.Mvc.Extensions;
using SportHire.Identity.API.Filters;
using SportHire.Identity.Application.InputModels;
using SportHire.Identity.Application.Services;
using SportHire.Identity.Application.Validators;
using SportHire.Identity.Core.Repositories;
using SportHire.Identity.Infrastructure.Persistence;
using SportHire.Identity.Infrastructure.Persistence.Repositories;
using SportHire.Identity.Infrastructure.Security.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers(options => options.Filters.Add(typeof(ValidationFilter)));
builder.Services.AddFluentValidationAutoValidation();
// builder.Services.AddValidatorsFromAssemblyContaining<SignupInputModelValidator>(); alternative

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<IdentityDbContext>();

// Repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();

// Services
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IUserService, UserService>();

// Validators
builder.Services.AddScoped<IValidator<SignupInputModel>, SignupInputModelValidator>();
builder.Services.AddScoped<IValidator<SigninInputModel>, SigninInputModelValidator>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
