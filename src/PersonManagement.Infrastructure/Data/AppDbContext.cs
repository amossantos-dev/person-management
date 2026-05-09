using Microsoft.EntityFrameworkCore;
using PersonManagement.Domain.Entities;

namespace PersonManagement.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Person> Persons => Set<Person>();
    public DbSet<PersonAddress> PersonAddresses => Set<PersonAddress>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Person>(entity =>
        {
            entity.HasKey(p => p.Id);

            entity.Property(p => p.Name)
                .IsRequired()
                .HasMaxLength(200);

            entity.Property(p => p.DateOfBirth)
                .IsRequired();

            entity.HasOne(p => p.Address)
                .WithOne()
                .HasForeignKey<Person>(p => p.IdAddress)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<PersonAddress>(entity =>
        {
            entity.HasKey(a => a.Id);

            entity.Property(a => a.Street)
                .IsRequired()
                .HasMaxLength(300);

            entity.Property(a => a.Number)
                .IsRequired()
                .HasMaxLength(20);

            entity.Property(a => a.Complement)
                .HasMaxLength(200);

            entity.Property(a => a.City)
                .IsRequired()
                .HasMaxLength(100);

            entity.Property(a => a.State)
                .IsRequired()
                .HasMaxLength(100);

            entity.Property(a => a.Country)
                .IsRequired()
                .HasMaxLength(100);
        });

        // Seed
        var addressId1 = Guid.Parse("a1000000-0000-0000-0000-000000000001");
        var addressId2 = Guid.Parse("a2000000-0000-0000-0000-000000000002");
        var addressId3 = Guid.Parse("a3000000-0000-0000-0000-000000000003");

        modelBuilder.Entity<PersonAddress>().HasData(
            new { Id = addressId1, Street = "Rua das Flores", Number = "100", Complement = (string?)null, City = "São Paulo", State = "SP", Country = "Brazil" },
            new { Id = addressId2, Street = "Av. Atlântica", Number = "200", Complement = "Apto 10", City = "Rio de Janeiro", State = "RJ", Country = "Brazil" },
            new { Id = addressId3, Street = "Rua XV de Novembro", Number = "300", Complement = (string?)null, City = "Curitiba", State = "PR", Country = "Brazil" }
        );

        modelBuilder.Entity<Person>().HasData(
            new { Id = Guid.Parse("b1000000-0000-0000-0000-000000000001"), Name = "Alice Silva", DateOfBirth = new DateTime(1990, 5, 10), IdAddress = addressId1 },
            new { Id = Guid.Parse("b2000000-0000-0000-0000-000000000002"), Name = "Bruno Costa", DateOfBirth = new DateTime(1985, 3, 22), IdAddress = addressId2 },
            new { Id = Guid.Parse("b3000000-0000-0000-0000-000000000003"), Name = "Carla Mendes", DateOfBirth = new DateTime(1995, 8, 15), IdAddress = addressId3 }
        );
    }
}