using PersonManagement.Application.DTOs;

namespace PersonManagement.Application.Interfaces;

public interface IPersonService
{
    Task<ApiResponseDto<PersonResponseDto>> CreateAsync(CreatePersonRequestDto dto);
    Task<ApiResponseDto<PersonResponseDto>> UpdateAsync(Guid id, UpdatePersonRequestDto dto);
    Task<ApiResponseDto<bool>> DeleteAsync(Guid id);
    Task<ApiResponseDto<PersonResponseDto>> GetByIdAsync(Guid id);
    Task<ApiResponseDto<PagedResultDto<PersonResponseDto>>> GetPagedAsync(int page, int pageSize, string? search);
}