using System.Net.Http.Json;
using System.Text.Json;
using PersonManagement.Application.DTOs;

namespace PersonManagement.IntegrationTests.Helpers;

public static class AuthHelper
{
    public static async Task<string> GetTokenAsync(HttpClient client)
    {
        var response = await client.PostAsJsonAsync("/api/auth/login", new LoginRequestDto
        {
            Username = "admin",
            Password = "admin"
        });

        var content = await response.Content.ReadAsStringAsync();

        var json = JsonDocument.Parse(content);
        return json.RootElement
            .GetProperty("data")
            .GetProperty("token")
            .GetString()!;
    }

    public static void AddBearerToken(this HttpClient client, string token)
    {
        client.DefaultRequestHeaders.Authorization =
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
    }
}