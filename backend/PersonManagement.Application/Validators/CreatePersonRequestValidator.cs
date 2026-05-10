using FluentValidation;
using PersonManagement.Application.DTOs;

namespace PersonManagement.Application.Validators;

public class CreatePersonRequestValidator : AbstractValidator<CreatePersonRequestDto>
{
    public CreatePersonRequestValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Nome é obrigatório.")
            .MinimumLength(3).WithMessage("Nome deve ter no mínimo 3 caracteres.");

        RuleFor(x => x.DateOfBirth)
            .NotEmpty().WithMessage("Data de nascimento é obrigatória.")
            .LessThan(DateTime.Today).WithMessage("Data de nascimento não pode ser futura.");

        RuleFor(x => x.Address)
            .NotNull().WithMessage("Endereço é obrigatório.")
            .SetValidator(new PersonAddressValidator());
    }
}