using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PersonManagement.Infrastructure.Data;
using Testcontainers.MsSql;

namespace PersonManagement.IntegrationTests;

public class CustomWebApplicationFactory : WebApplicationFactory<Program>, IAsyncLifetime
{
    private readonly MsSqlContainer _sqlContainer = new MsSqlBuilder("mcr.microsoft.com/mssql/server:2022-latest")
        .WithPassword("Admin@123456")
        .Build();

    public async Task InitializeAsync()
    {
        await _sqlContainer.StartAsync();
    }

    public new async Task DisposeAsync()
    {
        await _sqlContainer.StopAsync();
    }

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            // Remove o DbContext original
            var descriptor = services.SingleOrDefault(d =>
                d.ServiceType == typeof(DbContextOptions<AppDbContext>));

            if (descriptor != null)
                services.Remove(descriptor);

            // Adiciona o DbContext apontando pro container de teste
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(_sqlContainer.GetConnectionString()));

            // Cria o banco e aplica migrations automaticamente
            var sp = services.BuildServiceProvider();
            using var scope = sp.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            db.Database.Migrate();
        });
    }
}