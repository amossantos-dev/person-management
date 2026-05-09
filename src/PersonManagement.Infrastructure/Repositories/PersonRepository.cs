using Microsoft.EntityFrameworkCore;
using PersonManagement.Domain.Entities;
using PersonManagement.Domain.Interfaces;
using PersonManagement.Infrastructure.Data;

namespace PersonManagement.Infrastructure.Repositories;

public class PersonRepository : IPersonRepository
{
    private readonly AppDbContext _context;

    public PersonRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Person?> GetByIdAsync(Guid id)
        => await _context.Persons
            .Include(p => p.Address)
            .FirstOrDefaultAsync(p => p.Id == id);

    public async Task<(IEnumerable<Person> Items, int TotalCount)> GetPagedAsync(
        int page, int pageSize, string? search)
    {
        var query = _context.Persons
            .Include(p => p.Address)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(p =>
                p.Name.Contains(search) ||
                p.Address.City.Contains(search) ||
                p.Address.State.Contains(search));
        }

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderBy(p => p.Name)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, totalCount);
    }

    public async Task AddAsync(Person person)
        => await _context.Persons.AddAsync(person);

    public void Update(Person person)
        => _context.Persons.Update(person);

    public void Delete(Person person)
        => _context.Persons.Remove(person);
}