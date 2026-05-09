using FluentAssertions;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using PersonManagement.Api.Controllers;
using PersonManagement.Application.DTOs;
using PersonManagement.Application.Validators;

namespace PersonManagement.UnitTests.Auth;

public class AuthTests
{
    private readonly IValidator<LoginRequestDto> _validator = new LoginRequestValidator();

    private static IConfiguration BuildConfiguration() =>
        new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["Jwt:SecretKey"] = "super-secret-key-for-testing-purposes-only-32chars!",
                ["Jwt:Issuer"] = "PersonManagementApi",
                ["Jwt:Audience"] = "PersonManagementClient",
                ["Jwt:ExpirationHours"] = "8"
            })
            .Build();

    [Fact]
    public async Task Login_should_fail_when_username_is_empty()
    {
        var dto = new LoginRequestDto { Username = "", Password = "admin" };
        var result = await _validator.ValidateAsync(dto);
        result.IsValid.Should().BeFalse();
    }

    [Fact]
    public async Task Login_should_fail_when_password_is_empty()
    {
        var dto = new LoginRequestDto { Username = "admin", Password = "" };
        var result = await _validator.ValidateAsync(dto);
        result.IsValid.Should().BeFalse();
    }

    [Fact]
    public async Task Login_should_pass_with_valid_credentials()
    {
        var dto = new LoginRequestDto { Username = "admin", Password = "admin" };
        var result = await _validator.ValidateAsync(dto);
        result.IsValid.Should().BeTrue();
    }

    [Fact]
    public void Login_should_return_ok_with_valid_credentials()
    {
        var controller = new AuthController(BuildConfiguration());
        var dto = new LoginRequestDto { Username = "admin", Password = "admin" };

        var result = controller.Login(dto);

        var ok = result.Should().BeOfType<OkObjectResult>().Subject;
        var response = ok.Value.Should().BeOfType<ApiResponseDto<LoginResponseDto>>().Subject;
        response.Data!.Token.Should().NotBeNullOrEmpty();
    }

    [Fact]
    public void Login_should_return_unauthorized_with_invalid_credentials()
    {
        var controller = new AuthController(BuildConfiguration());
        var dto = new LoginRequestDto { Username = "wrong", Password = "wrong" };

        var result = controller.Login(dto);

        result.Should().BeOfType<UnauthorizedObjectResult>();
    }
}