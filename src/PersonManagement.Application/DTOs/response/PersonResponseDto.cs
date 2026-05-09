namespace PersonManagement.Application.DTOs;

public class PersonResponseDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public DateTime DateOfBirth { get; set; }
    public PersonAddressDto Address { get; set; } = null!;
}