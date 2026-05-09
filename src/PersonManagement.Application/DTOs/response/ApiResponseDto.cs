namespace PersonManagement.Application.DTOs;

public class ApiResponseDto<T>
{
    public bool Success { get; set; }
    public T? Data { get; set; }
    public string? Message { get; set; }
    public IEnumerable<string>? Errors { get; set; }

    public static ApiResponseDto<T> Ok(T data, string message = "Operação realizada com sucesso.")
        => new() { Success = true, Data = data, Message = message };

    public static ApiResponseDto<T> Fail(IEnumerable<string> errors)
        => new() { Success = false, Errors = errors };

    public static ApiResponseDto<T> Fail(string error)
        => new() { Success = false, Errors = [error] };
}