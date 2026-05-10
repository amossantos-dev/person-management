namespace PersonManagement.Domain.Entities;

public class PersonAddress
{
    public Guid Id { get; private set; }
    public string? ZipCode { get; private set; }
    public string Street { get; private set; } = null!;
    public string Number { get; private set; } = null!;
    public string? Complement { get; private set; }
    public string Neighborhood { get; private set; } = null!;
    public string City { get; private set; } = null!;
    public string State { get; private set; } = null!;
    public string Country { get; private set; } = null!;

    protected PersonAddress() { }

    public PersonAddress(string? zipCode, string street, string number, string? complement, string neighborhood, string city, string state, string country)
    {
        Id = Guid.NewGuid();
        ZipCode = zipCode;
        Street = street;
        Number = number;
        Complement = complement;
        Neighborhood = neighborhood;
        City = city;
        State = state;
        Country = country;
    }

    public void Update(string? zipCode, string street, string number, string? complement, string neighborhood, string city, string state, string country)
    {
        ZipCode = zipCode;
        Street = street;
        Number = number;
        Complement = complement;
        Neighborhood = neighborhood;
        City = city;
        State = state;
        Country = country;
    }
}
