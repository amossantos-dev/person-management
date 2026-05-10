using PersonManagement.Domain.Entities;

namespace PersonManagement.Domain.Interfaces;

public interface IPersonAddressRepository
{
    Task<PersonAddress?> GetByIdAsync(Guid id);
    Task AddAsync(PersonAddress address);
    void Update(PersonAddress address);
    void Delete(PersonAddress address);
}