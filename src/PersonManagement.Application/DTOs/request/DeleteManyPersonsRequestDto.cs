namespace PersonManagement.Application.DTOs;

public class DeleteManyPersonsRequestDto
{
    public IEnumerable<Guid> Ids { get; set; } = [];
}