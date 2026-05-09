namespace PersonManagement.Application.DTOs;

public class CreatePersonRequestDto
{
    public string Name { get; set; } = null!;
    public DateTime DateOfBirth { get; set; }
    public PersonAddressDto Address { get; set; } = null!;
}