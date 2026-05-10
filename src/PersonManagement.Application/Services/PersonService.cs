using AutoMapper;
using FluentValidation;
using PersonManagement.Application.DTOs;
using PersonManagement.Application.Interfaces;
using PersonManagement.Domain.Entities;
using PersonManagement.Domain.Interfaces;

namespace PersonManagement.Application.Services;

public class PersonService : IPersonService
{
    private readonly IPersonRepository _personRepository;
    private readonly IPersonAddressRepository _addressRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly IValidator<CreatePersonRequestDto> _createValidator;
    private readonly IValidator<UpdatePersonRequestDto> _updateValidator;

    public PersonService(
        IPersonRepository personRepository,
        IPersonAddressRepository addressRepository,
        IUnitOfWork unitOfWork,
        IMapper mapper,
        IValidator<CreatePersonRequestDto> createValidator,
        IValidator<UpdatePersonRequestDto> updateValidator)
    {
        _personRepository = personRepository;
        _addressRepository = addressRepository;
        _unitOfWork = unitOfWork;
        _mapper = mapper;
        _createValidator = createValidator;
        _updateValidator = updateValidator;
    }

    public async Task<ApiResponseDto<PersonResponseDto>> CreateAsync(CreatePersonRequestDto dto)
    {
        var validation = await _createValidator.ValidateAsync(dto);
        if (!validation.IsValid)
            return ApiResponseDto<PersonResponseDto>.Fail(validation.Errors.Select(e => e.ErrorMessage));

        var address = new PersonAddress(
            dto.Address.Street,
            dto.Address.Number,
            dto.Address.Complement,
            dto.Address.Neighborhood,
            dto.Address.City,
            dto.Address.State,
            dto.Address.Country);

        var person = new Person(dto.Name, dto.DateOfBirth, address);

        await _addressRepository.AddAsync(address);
        await _personRepository.AddAsync(person);
        await _unitOfWork.CommitAsync();

        return ApiResponseDto<PersonResponseDto>.Ok(
            _mapper.Map<PersonResponseDto>(person),
            "Pessoa criada com sucesso.");
    }

    public async Task<ApiResponseDto<PersonResponseDto>> UpdateAsync(Guid id, UpdatePersonRequestDto dto)
    {
        var validation = await _updateValidator.ValidateAsync(dto);
        if (!validation.IsValid)
            return ApiResponseDto<PersonResponseDto>.Fail(validation.Errors.Select(e => e.ErrorMessage));

        var person = await _personRepository.GetByIdAsync(id);
        if (person is null)
            return ApiResponseDto<PersonResponseDto>.Fail("Pessoa não encontrada.");

        person.Update(dto.Name, dto.DateOfBirth);
        person.Address.Update(
            dto.Address.Street,
            dto.Address.Number,
            dto.Address.Complement,
            dto.Address.Neighborhood,
            dto.Address.City,
            dto.Address.State,
            dto.Address.Country);

        _personRepository.Update(person);
        await _unitOfWork.CommitAsync();

        return ApiResponseDto<PersonResponseDto>.Ok(
            _mapper.Map<PersonResponseDto>(person),
            "Pessoa atualizada com sucesso.");
    }

    public async Task<ApiResponseDto<bool>> DeleteAsync(Guid id)
    {
        var person = await _personRepository.GetByIdAsync(id);
        if (person is null)
            return ApiResponseDto<bool>.Fail("Pessoa não encontrada.");

        _addressRepository.Delete(person.Address);
        _personRepository.Delete(person);
        await _unitOfWork.CommitAsync();

        return ApiResponseDto<bool>.Ok(true, "Pessoa deletada com sucesso.");
    }

    public async Task<ApiResponseDto<PersonResponseDto>> GetByIdAsync(Guid id)
    {
        var person = await _personRepository.GetByIdAsync(id);
        if (person is null)
            return ApiResponseDto<PersonResponseDto>.Fail("Pessoa não encontrada.");

        return ApiResponseDto<PersonResponseDto>.Ok(_mapper.Map<PersonResponseDto>(person));
    }

    public async Task<ApiResponseDto<PagedResultDto<PersonResponseDto>>> GetPagedAsync(
        int page, int pageSize, string? search)
    {
        var (items, totalCount) = await _personRepository.GetPagedAsync(page, pageSize, search);

        var result = new PagedResultDto<PersonResponseDto>
        {
            Items = _mapper.Map<IEnumerable<PersonResponseDto>>(items),
            Page = page,
            PageSize = pageSize,
            TotalItems = totalCount
        };

        return ApiResponseDto<PagedResultDto<PersonResponseDto>>.Ok(result, "Consulta realizada com sucesso.");
    }

    public async Task<ApiResponseDto<bool>> DeleteManyAsync(DeleteManyPersonsRequestDto dto)
    {
        if (!dto.Ids.Any())
            return ApiResponseDto<bool>.Fail("Nenhum ID informado.");

        await _personRepository.DeleteManyAsync(dto.Ids);
        await _unitOfWork.CommitAsync();

        return ApiResponseDto<bool>.Ok(true, "Pessoas deletadas com sucesso.");
    }
}