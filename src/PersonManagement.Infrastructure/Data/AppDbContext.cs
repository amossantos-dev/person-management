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

            entity.Property(a => a.Neighborhood)
                .HasMaxLength(150);

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

        // Seed — 15 pessoas
        var seed = new (string PersonId, string AddressId, string Name, DateTime Dob, string Street, string Number, string? Complement, string City, string State, string Country)[]
        {
            ("b1000000-0000-0000-0000-000000000001", "a1000000-0000-0000-0000-000000000001", "Alice Silva",       new DateTime(1990,  5, 10), "Rua das Flores",           "100",  null,      "São Paulo",      "SP", "BR"),
            ("b2000000-0000-0000-0000-000000000002", "a2000000-0000-0000-0000-000000000002", "Bruno Costa",       new DateTime(1985,  3, 22), "Av. Atlântica",            "200",  "Apto 10", "Rio de Janeiro", "RJ", "BR"),
            ("b3000000-0000-0000-0000-000000000003", "a3000000-0000-0000-0000-000000000003", "Carla Mendes",      new DateTime(1995,  8, 15), "Rua XV de Novembro",       "300",  null,      "Curitiba",       "PR", "BR"),
            ("b4000000-0000-0000-0000-000000000004", "a4000000-0000-0000-0000-000000000004", "Diego Ferreira",    new DateTime(1988,  1, 30), "Av. Paulista",             "1500", "Cj 42",   "São Paulo",      "SP", "BR"),
            ("b5000000-0000-0000-0000-000000000005", "a5000000-0000-0000-0000-000000000005", "Elena Rocha",       new DateTime(1993, 11,  5), "Rua da Liberdade",         "88",   null,      "Belo Horizonte", "MG", "BR"),
            ("b6000000-0000-0000-0000-000000000006", "a6000000-0000-0000-0000-000000000006", "Felipe Andrade",    new DateTime(1982,  7, 19), "Rua Sete de Setembro",     "45",   null,      "Salvador",       "BA", "BR"),
            ("b7000000-0000-0000-0000-000000000007", "a7000000-0000-0000-0000-000000000007", "Gabriela Lima",     new DateTime(1997,  4,  2), "Rua do Comércio",          "210",  "Sala 3",  "Fortaleza",      "CE", "BR"),
            ("b8000000-0000-0000-0000-000000000008", "a8000000-0000-0000-0000-000000000008", "Henrique Souza",    new DateTime(1991,  9, 14), "Av. Brasil",               "900",  null,      "Manaus",         "AM", "BR"),
            ("b9000000-0000-0000-0000-000000000009", "a9000000-0000-0000-0000-000000000009", "Isabela Martins",   new DateTime(1999,  2, 28), "Rua das Palmeiras",        "55",   null,      "Porto Alegre",   "RS", "BR"),
            ("ba000000-0000-0000-0000-00000000000a", "aa000000-0000-0000-0000-00000000000a", "João Pereira",      new DateTime(1980, 12,  1), "Av. Amazonas",             "320",  null,      "Belém",          "PA", "BR"),
            ("bb000000-0000-0000-0000-00000000000b", "ab000000-0000-0000-0000-00000000000b", "Karen Nascimento",  new DateTime(1994,  6, 18), "Rua Marechal Deodoro",     "77",   "Apto 2",  "Recife",         "PE", "BR"),
            ("bc000000-0000-0000-0000-00000000000c", "ac000000-0000-0000-0000-00000000000c", "Lucas Oliveira",    new DateTime(1987,  3, 11), "Rua das Acácias",          "14",   null,      "Goiânia",        "GO", "BR"),
            ("bd000000-0000-0000-0000-00000000000d", "ad000000-0000-0000-0000-00000000000d", "Mariana Castro",    new DateTime(1996, 10, 25), "Rua da Praia",             "500",  null,      "Florianópolis",  "SC", "BR"),
            ("be000000-0000-0000-0000-00000000000e", "ae000000-0000-0000-0000-00000000000e", "Nicolas Barbosa",   new DateTime(2000,  1, 15), "Av. das Nações",           "730",  "Bl. B",   "Brasília",       "DF", "BR"),
            ("bf000000-0000-0000-0000-00000000000f", "af000000-0000-0000-0000-00000000000f", "Olivia Cardoso",    new DateTime(1989,  8,  9), "Rua Tiradentes",           "62",   null,      "Natal",          "RN", "BR"),
        };

        modelBuilder.Entity<PersonAddress>().HasData(
            seed.Select(s => new
            {
                Id = Guid.Parse(s.AddressId),
                Street = s.Street,
                Number = s.Number,
                Complement = s.Complement,
                City = s.City,
                State = s.State,
                Country = s.Country,
            }).ToArray()
        );

        modelBuilder.Entity<Person>().HasData(
            seed.Select(s => new
            {
                Id = Guid.Parse(s.PersonId),
                Name = s.Name,
                DateOfBirth = s.Dob,
                IdAddress = Guid.Parse(s.AddressId),
            }).ToArray()
        );
    }
}
