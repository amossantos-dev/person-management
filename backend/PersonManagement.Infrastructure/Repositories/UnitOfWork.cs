using PersonManagement.Domain.Interfaces;
using PersonManagement.Infrastructure.Data;

namespace PersonManagement.Infrastructure.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly AppDbContext _context;

    public UnitOfWork(AppDbContext context)
    {
        _context = context;
    }

    public async Task<int> CommitAsync()
        => await _context.SaveChangesAsync();
}