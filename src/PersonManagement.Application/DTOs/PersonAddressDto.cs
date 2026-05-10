namespace PersonManagement.Application.DTOs;

public class PersonAddressDto
{
    public string Street { get; set; } = null!;
    public string Number { get; set; } = null!;
    public string? Complement { get; set; }
    public string? Neighborhood { get; set; }
    public string City { get; set; } = null!;
    public string State { get; set; } = null!;
    public string Country { get; set; } = null!;
}