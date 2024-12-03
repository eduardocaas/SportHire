using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
//using SharpGrip.FluentValidation.AutoValidation.Mvc.Extensions;
using SportHire.Identity.API.Filters;
using SportHire.Identity.Application.InputModels;
using SportHire.Identity.Application.Services;
using SportHire.Identity.Application.Validators;
using SportHire.Identity.Core.Repositories;
using SportHire.Identity.Infrastructure.Persistence;
using SportHire.Identity.Infrastructure.Persistence.Repositories;
using SportHire.Identity.Infrastructure.Security.Services;
using System.Security.Cryptography;

var AllowAllOrigins = "_allowAllOrigins";

var builder = WebApplication.CreateBuilder(args);

// Cors Policy - Development - All Origins
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowAllOrigins,
        policy =>
        {
            policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});

// Add services to the container.
builder.Services.AddControllers(options =>
    { options.Filters.Add(typeof(ValidationFilter)); });
    //.AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<SigninInputModelValidator>());
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddFluentValidationClientsideAdapters();
builder.Services.AddValidatorsFromAssemblyContaining<SigninInputModelValidator>(); 

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "SportHire.Identity.API", Version = "v1" });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JWT Authorization"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            }, new string[] { }
        }
    });
});

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {

        var rsaKey = RSA.Create();
        string pemKey = File.ReadAllText(builder.Configuration.GetSection("Jwt:PublicKeyPath").Value);
        rsaKey.ImportFromPem(pemKey);

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new RsaSecurityKey(rsaKey)
        };
    });

builder.Services.AddDbContext<IdentityDbContext>();

// Repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IWalletRepository, WalletRepository>();

// Services
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IWalletService, WalletService>();

// Validators
builder.Services.AddScoped<ValidationFilter>();
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

app.UseCors(AllowAllOrigins);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
