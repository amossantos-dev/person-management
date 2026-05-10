using AutoMapper;
using FluentAssertions;
using FluentValidation;
using Moq;
using PersonManagement.Application.DTOs;
using PersonManagement.Application.Services;
using PersonManagement.Application.Validators;
using PersonManagement.Domain.Entities;
using PersonManagement.Domain.Interfaces;
using PersonManagement.UnitTests.Helpers;

namespace PersonManagement.UnitTests.Services;

public class PersonServiceTests
{
    private readonly Mock<IPersonRepository> _personRepoMock = new();
    private readonly Mock<IPersonAddressRepository> _addressRepoMock = new();
    private readonly Mock<IUnitOfWork> _unitOfWorkMock = new();
    private readonly IMapper _mapper = MapperHelper.Create();
    private readonly IValidator<CreatePersonRequestDto> _createValidator = new CreatePersonRequestValidator();
    private readonly IValidator<UpdatePersonRequestDto> _updateValidator = new UpdatePersonRequestValidator();

    private PersonService CreateService() => new(
        _personRepoMock.Object,
        _addressRepoMock.Object,
        _unitOfWorkMock.Object,
        _mapper,
        _createValidator,
        _updateValidator);

    private static CreatePersonRequestDto ValidCreateDto() => new()
    {
        Name = "João Silva",
        DateOfBirth = new DateTime(1990, 1, 1),
        Address = new PersonAddressDto
        {
            Street = "Rua Teste",
            Number = "123",
            Neighborhood = "Centro",
            City = "São Paulo",
            State = "SP",
            Country = "Brazil"
        }
    };

    private static Person ValidPerson()
    {
        var address = new PersonAddress("Rua Teste", "123", null, "Centro", "São Paulo", "SP", "BR");
        return new Person("João Silva", new DateTime(1990, 1, 1), address);
    }

    [Fact]
    public async Task CreateAsync_should_return_success_with_valid_data()
    {
        var service = CreateService();
        var dto = ValidCreateDto();

        var result = await service.CreateAsync(dto);

        result.Success.Should().BeTrue();
        result.Data.Should().NotBeNull();
        result.Data!.Name.Should().Be(dto.Name);
    }

    [Fact]
    public async Task CreateAsync_should_fail_with_invalid_data()
    {
        var service = CreateService();
        var dto = ValidCreateDto();
        dto.Name = "";

        var result = await service.CreateAsync(dto);

        result.Success.Should().BeFalse();
        result.Errors.Should().NotBeEmpty();
    }

    [Fact]
    public async Task GetByIdAsync_should_return_person_when_exists()
    {
        var person = ValidPerson();
        _personRepoMock.Setup(r => r.GetByIdAsync(person.Id)).ReturnsAsync(person);

        var service = CreateService();
        var result = await service.GetByIdAsync(person.Id);

        result.Success.Should().BeTrue();
        result.Data!.Name.Should().Be(person.Name);
    }

    [Fact]
    public async Task GetByIdAsync_should_fail_when_person_not_found()
    {
        _personRepoMock.Setup(r => r.GetByIdAsync(It.IsAny<Guid>())).ReturnsAsync((Person?)null);

        var service = CreateService();
        var result = await service.GetByIdAsync(Guid.NewGuid());

        result.Success.Should().BeFalse();
        result.Errors.Should().Contain("Pessoa não encontrada.");
    }

    [Fact]
    public async Task DeleteAsync_should_return_success_when_person_exists()
    {
        var person = ValidPerson();
        _personRepoMock.Setup(r => r.GetByIdAsync(person.Id)).ReturnsAsync(person);

        var service = CreateService();
        var result = await service.DeleteAsync(person.Id);

        result.Success.Should().BeTrue();
        _personRepoMock.Verify(r => r.Delete(person), Times.Once);
        _unitOfWorkMock.Verify(u => u.CommitAsync(), Times.Once);
    }

    [Fact]
    public async Task DeleteAsync_should_fail_when_person_not_found()
    {
        _personRepoMock.Setup(r => r.GetByIdAsync(It.IsAny<Guid>())).ReturnsAsync((Person?)null);

        var service = CreateService();
        var result = await service.DeleteAsync(Guid.NewGuid());

        result.Success.Should().BeFalse();
        result.Errors.Should().Contain("Pessoa não encontrada.");
    }

    [Fact]
    public async Task GetPagedAsync_should_return_paged_result()
    {
        var persons = new List<Person> { ValidPerson() };
        _personRepoMock.Setup(r => r.GetPagedAsync(1, 10, null)).ReturnsAsync((persons, 1));

        var service = CreateService();
        var result = await service.GetPagedAsync(1, 10, null);

        result.Success.Should().BeTrue();
        result.Data!.TotalItems.Should().Be(1);
        result.Data.Items.Should().HaveCount(1);
    }

    [Fact]
    public async Task UpdateAsync_should_fail_when_person_not_found()
    {
        _personRepoMock.Setup(r => r.GetByIdAsync(It.IsAny<Guid>())).ReturnsAsync((Person?)null);

        var service = CreateService();
        var result = await service.UpdateAsync(Guid.NewGuid(), new UpdatePersonRequestDto
        {
            Name = "Novo Nome",
            DateOfBirth = new DateTime(1990, 1, 1),
            Address = new PersonAddressDto
            {
                Street = "Rua Nova",
                Number = "456",
                Neighborhood = "Centro",
                City = "Rio",
                State = "RJ",
                Country = "Brazil"
            }
        });

        result.Success.Should().BeFalse();
        result.Errors.Should().Contain("Pessoa não encontrada.");
    }
}