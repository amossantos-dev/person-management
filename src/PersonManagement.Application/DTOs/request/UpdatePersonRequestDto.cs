namespace PersonManagement.Application.DTOs;

public class UpdatePersonRequestDto
{
    public string Name { get; set; } = null!;
    public DateTime DateOfBirth { get; set; }
    public PersonAddressDto Address { get; set; } = null!;
}