using Microsoft.EntityFrameworkCore;
using PersonManagement.Domain.Entities;
using PersonManagement.Domain.Interfaces;
using PersonManagement.Infrastructure.Data;

namespace PersonManagement.Infrastructure.Repositories;

public class PersonAddressRepository : IPersonAddressRepository
{
    private readonly AppDbContext _context;

    public PersonAddressRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<PersonAddress?> GetByIdAsync(Guid id)
        => await _context.PersonAddresses.FindAsync(id);

    public async Task AddAsync(PersonAddress address)
        => await _context.PersonAddresses.AddAsync(address);

    public void Update(PersonAddress address)
        => _context.PersonAddresses.Update(address);

    public void Delete(PersonAddress address)
        => _context.PersonAddresses.Remove(address);
}