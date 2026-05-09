namespace PersonManagement.Domain.Interfaces;

public interface IUnitOfWork
{
    Task<int> CommitAsync();
}