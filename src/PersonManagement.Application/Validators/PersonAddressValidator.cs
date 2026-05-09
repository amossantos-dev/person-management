using FluentValidation;
using PersonManagement.Application.DTOs;

namespace PersonManagement.Application.Validators;

public class PersonAddressValidator : AbstractValidator<PersonAddressDto>
{
    public PersonAddressValidator()
    {
        RuleFor(x => x.Street).NotEmpty().WithMessage("Rua é obrigatória.");
        RuleFor(x => x.Number).NotEmpty().WithMessage("Número é obrigatório.");
        RuleFor(x => x.City).NotEmpty().WithMessage("Cidade é obrigatória.");
        RuleFor(x => x.State).NotEmpty().WithMessage("Estado é obrigatório.");
        RuleFor(x => x.Country).NotEmpty().WithMessage("País é obrigatório.");
    }
}