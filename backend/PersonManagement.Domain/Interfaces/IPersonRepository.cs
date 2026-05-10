using PersonManagement.Domain.Entities;

namespace PersonManagement.Domain.Interfaces;

public interface IPersonRepository
{
    Task<Person?> GetByIdAsync(Guid id);
    Task<(IEnumerable<Person> Items, int TotalCount)> GetPagedAsync(int page, int pageSize, string? search);
    Task AddAsync(Person person);
    void Update(Person person);
    void Delete(Person person);
    Task DeleteManyAsync(IEnumerable<Guid> ids);
}