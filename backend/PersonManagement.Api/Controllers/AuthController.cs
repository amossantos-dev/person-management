using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PersonManagement.Application.DTOs;

namespace PersonManagement.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly IValidator<LoginRequestDto> _validator;

    public AuthController(IConfiguration configuration, IValidator<LoginRequestDto> validator)
    {
        _configuration = configuration;
        _validator = validator;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestDto dto)
    {
        var validation = await _validator.ValidateAsync(dto);
        if (!validation.IsValid)
            return BadRequest(ApiResponseDto<object>.Fail(validation.Errors.Select(e => e.ErrorMessage)));

        if (dto.Username != "admin" || dto.Password != "admin")
            return Unauthorized(ApiResponseDto<object>.Fail("Credenciais inválidas."));

        var token = GenerateToken();

        return Ok(ApiResponseDto<LoginResponseDto>.Ok(
            new LoginResponseDto { Token = token },
            "Login realizado com sucesso."));
    }

    private string GenerateToken()
    {
        var secretKey = _configuration["Jwt:SecretKey"]!;
        var issuer = _configuration["Jwt:Issuer"]!;
        var audience = _configuration["Jwt:Audience"]!;
        var expirationHours = int.Parse(_configuration["Jwt:ExpirationHours"]!);

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.Name, "admin"),
            new Claim(ClaimTypes.Role, "Admin")
        };

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: DateTime.UtcNow.AddHours(expirationHours),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}