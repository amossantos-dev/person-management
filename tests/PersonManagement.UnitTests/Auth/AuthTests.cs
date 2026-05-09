using FluentAssertions;
using FluentValidation;
using PersonManagement.Application.DTOs;
using PersonManagement.Application.Validators;

namespace PersonManagement.UnitTests.Auth;

public class AuthTests
{
    private readonly IValidator<LoginRequestDto> _validator = new LoginRequestValidator();

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
}