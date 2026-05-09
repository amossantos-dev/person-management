namespace PersonManagement.Domain.Entities;

public class Person
{
    public Guid Id { get; private set; }
    public string Name { get; private set; } = null!;
    public DateTime DateOfBirth { get; private set; }
    public Guid IdAddress { get; private set; }

    public PersonAddress Address { get; private set; } = null!;

    protected Person() { }

    public Person(string name, DateTime dateOfBirth, PersonAddress address)
    {
        Id = Guid.NewGuid();
        Name = name;
        DateOfBirth = dateOfBirth;
        Address = address;
        IdAddress = address.Id;
    }

    public void Update(string name, DateTime dateOfBirth)
    {
        Name = name;
        DateOfBirth = dateOfBirth;
    }
}