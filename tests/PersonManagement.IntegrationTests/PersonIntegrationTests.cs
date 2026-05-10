using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using FluentAssertions;
using PersonManagement.Application.DTOs;
using PersonManagement.IntegrationTests.Helpers;

namespace PersonManagement.IntegrationTests;

public class PersonsIntegrationTests : IClassFixture<CustomWebApplicationFactory>
{
    private readonly HttpClient _client;
    private readonly CustomWebApplicationFactory _factory;

    public PersonsIntegrationTests(CustomWebApplicationFactory factory)
    {
        _factory = factory;
        _client = factory.CreateClient();
    }

    private static CreatePersonRequestDto ValidCreateDto(string name = "João Teste") => new()
    {
        Name = name,
        DateOfBirth = new DateTime(1990, 1, 1),
        Address = new PersonAddressDto
        {
            Street = "Rua Integração",
            Number = "100",
            Neighborhood = "Centro",
            City = "São Paulo",
            State = "SP",
            Country = "Brazil"
        }
    };

    // Auth
    [Fact]
    public async Task Login_should_return_token_with_valid_credentials()
    {
        var response = await _client.PostAsJsonAsync("/api/auth/login", new LoginRequestDto
        {
            Username = "admin",
            Password = "admin"
        });

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var content = await response.Content.ReadAsStringAsync();
        content.Should().Contain("token");
    }

    [Fact]
    public async Task Login_should_return_unauthorized_with_invalid_credentials()
    {
        var response = await _client.PostAsJsonAsync("/api/auth/login", new LoginRequestDto
        {
            Username = "wrong",
            Password = "wrong"
        });

        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
    }

    // Rotas protegidas
    [Fact]
    public async Task Protected_routes_should_return_401_without_token()
    {
        var response = await _client.GetAsync("/api/persons/find");
        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
    }

    // Criar pessoa
    [Fact]
    public async Task Create_person_should_return_200_with_valid_token()
    {
        var token = await AuthHelper.GetTokenAsync(_client);
        _client.AddBearerToken(token);

        var response = await _client.PostAsJsonAsync("/api/persons", ValidCreateDto());

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var content = await response.Content.ReadAsStringAsync();
        content.Should().Contain("Pessoa criada com sucesso.");
    }

    [Fact]
    public async Task Create_person_should_return_401_without_token()
    {
        var client = _factory.CreateClient();
        var response = await client.PostAsJsonAsync("/api/persons", ValidCreateDto());
        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
    }

    // Buscar por ID
    [Fact]
    public async Task Get_person_by_id_should_return_person()
    {
        var token = await AuthHelper.GetTokenAsync(_client);
        _client.AddBearerToken(token);

        var createResponse = await _client.PostAsJsonAsync("/api/persons", ValidCreateDto("Maria Teste"));
        var createContent = await createResponse.Content.ReadAsStringAsync();
        var id = JsonDocument.Parse(createContent)
            .RootElement.GetProperty("data").GetProperty("id").GetString();

        var response = await _client.GetAsync($"/api/persons/{id}");

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var content = await response.Content.ReadAsStringAsync();
        content.Should().Contain("Maria Teste");
    }

    [Fact]
    public async Task Get_person_by_id_should_return_404_when_not_found()
    {
        var token = await AuthHelper.GetTokenAsync(_client);
        _client.AddBearerToken(token);

        var response = await _client.GetAsync($"/api/persons/{Guid.NewGuid()}");

        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    // Atualizar
    [Fact]
    public async Task Update_person_should_return_updated_data()
    {
        var token = await AuthHelper.GetTokenAsync(_client);
        _client.AddBearerToken(token);

        var createResponse = await _client.PostAsJsonAsync("/api/persons", ValidCreateDto("Carlos Original"));
        var createContent = await createResponse.Content.ReadAsStringAsync();
        var id = JsonDocument.Parse(createContent)
            .RootElement.GetProperty("data").GetProperty("id").GetString();

        var updateDto = new UpdatePersonRequestDto
        {
            Name = "Carlos Atualizado",
            DateOfBirth = new DateTime(1990, 1, 1),
            Address = new PersonAddressDto
            {
                Street = "Rua Nova",
                Number = "999",
                Neighborhood = "Centro",
                City = "Curitiba",
                State = "PR",
                Country = "Brazil"
            }
        };

        var response = await _client.PutAsJsonAsync($"/api/persons/{id}", updateDto);

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var content = await response.Content.ReadAsStringAsync();
        content.Should().Contain("Carlos Atualizado");
    }

    // Deletar
    [Fact]
    public async Task Delete_person_should_return_success()
    {
        var token = await AuthHelper.GetTokenAsync(_client);
        _client.AddBearerToken(token);

        var createResponse = await _client.PostAsJsonAsync("/api/persons", ValidCreateDto("Pedro Deletar"));
        var createContent = await createResponse.Content.ReadAsStringAsync();
        var id = JsonDocument.Parse(createContent)
            .RootElement.GetProperty("data").GetProperty("id").GetString();

        var response = await _client.DeleteAsync($"/api/persons/{id}");

        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    // Paginação
    [Fact]
    public async Task Find_should_return_paged_result()
    {
        var token = await AuthHelper.GetTokenAsync(_client);
        _client.AddBearerToken(token);

        var response = await _client.GetAsync("/api/persons/find?page=1&pageSize=10");

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var content = await response.Content.ReadAsStringAsync();
        content.Should().Contain("totalItems");
        content.Should().Contain("items");
    }
}