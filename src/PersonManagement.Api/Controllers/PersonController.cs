using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PersonManagement.Application.DTOs;
using PersonManagement.Application.Interfaces;

namespace PersonManagement.Api.Controllers;

[ApiController]
[Route("api/persons")]
[Authorize]
public class PersonsController : ControllerBase
{
    private readonly IPersonService _personService;

    public PersonsController(IPersonService personService)
    {
        _personService = personService;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreatePersonRequestDto dto)
    {
        var result = await _personService.CreateAsync(dto);
        return result.Success ? Ok(result) : BadRequest(result);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdatePersonRequestDto dto)
    {
        var result = await _personService.UpdateAsync(id, dto);
        if (!result.Success && result.Errors!.Contains("Pessoa não encontrada."))
            return NotFound(result);
        return result.Success ? Ok(result) : BadRequest(result);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await _personService.DeleteAsync(id);
        return result.Success ? Ok(result) : NotFound(result);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var result = await _personService.GetByIdAsync(id);
        return result.Success ? Ok(result) : NotFound(result);
    }

    [HttpGet("find")]
    public async Task<IActionResult> Find(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? search = null)
    {
        var result = await _personService.GetPagedAsync(page, pageSize, search);
        return Ok(result);
    }
}