using FluentAssertions;
using PersonManagement.Application.DTOs;
using PersonManagement.Application.Validators;

namespace PersonManagement.UnitTests.Validators;

public class CreatePersonRequestValidatorTests
{
    private readonly CreatePersonRequestValidator _validator = new();

    private static PersonAddressDto ValidAddress() => new()
    {
        Street = "Rua Teste",
        Number = "123",
        Neighborhood = "Centro",
        City = "São Paulo",
        State = "SP",
        Country = "Brazil"
    };

    [Fact]
    public async Task Should_fail_when_name_is_empty()
    {
        var dto = new CreatePersonRequestDto
        {
            Name = "",
            DateOfBirth = new DateTime(1990, 1, 1),
            Address = ValidAddress()
        };

        var result = await _validator.ValidateAsync(dto);

        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(e => e.ErrorMessage == "Nome é obrigatório.");
    }

    [Fact]
    public async Task Should_fail_when_name_is_too_short()
    {
        var dto = new CreatePersonRequestDto
        {
            Name = "Ab",
            DateOfBirth = new DateTime(1990, 1, 1),
            Address = ValidAddress()
        };

        var result = await _validator.ValidateAsync(dto);

        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(e => e.ErrorMessage == "Nome deve ter no mínimo 3 caracteres.");
    }

    [Fact]
    public async Task Should_fail_when_date_of_birth_is_in_the_future()
    {
        var dto = new CreatePersonRequestDto
        {
            Name = "João Silva",
            DateOfBirth = DateTime.Today.AddDays(1),
            Address = ValidAddress()
        };

        var result = await _validator.ValidateAsync(dto);

        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(e => e.ErrorMessage == "Data de nascimento não pode ser futura.");
    }

    [Fact]
    public async Task Should_pass_with_valid_data()
    {
        var dto = new CreatePersonRequestDto
        {
            Name = "João Silva",
            DateOfBirth = new DateTime(1990, 1, 1),
            Address = ValidAddress()
        };

        var result = await _validator.ValidateAsync(dto);

        result.IsValid.Should().BeTrue();
    }
}