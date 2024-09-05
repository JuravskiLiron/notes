using System.Linq.Expressions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyNotes.Contracts;
using MyNotes.DataAccess;
using MyNotes.Models;

namespace MyNotes.Controllers;

[ApiController]
[Route("[controller]")]
public class NotesController : ControllerBase
{
    private readonly NotesDbContext _dbContext;

    public NotesController(NotesDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateNoteRequest request, CancellationToken ct)
    {
        var note = new Note(request.Title, request.Description);

        await _dbContext.Notes.AddAsync(note, ct);
        await _dbContext.SaveChangesAsync(ct);

        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] GetNotesRequest request, CancellationToken ct)
    {
        var notesQuery = _dbContext.Notes
            .Where(n => string.IsNullOrWhiteSpace(request.Search) ||
                        n.Title.ToLower().Contains(request.Search.ToLower()));

        Expression<Func<Note, object>> selectorKey = request.SortItem?.ToLower() switch
        {
            "date" => note => note.CreatedAt,
            "title" => note => note.Title,
            _ => note => note.Id
        };

        notesQuery = request.SortOrder == "desc"
            ? notesQuery.OrderByDescending(selectorKey)
            : notesQuery.OrderBy(selectorKey);

        var noteDtos = await notesQuery
            .Select(n => new NoteDto(n.Id, n.Title, n.Description, n.CreatedAt))
            .ToListAsync(cancellationToken: ct);

        return Ok(new GetNotesResponse(noteDtos));
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateNoteRequest request, CancellationToken ct)
    {
        var note = await _dbContext.Notes.FindAsync(new object[] { id }, cancellationToken: ct);

        if (note == null)
        {
            return NotFound();
        }

        // Обновление только полей, которые были переданы в запросе
        if (request.Title != null)
        {
            note.Title = request.Title;
        }

        if (request.Description != null)
        {
            note.Description = request.Description;
        }

        await _dbContext.SaveChangesAsync(ct);

        return NoContent(); // Возвращаем статус 204 No Content после успешного обновления
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken ct)
    {
        var note = await _dbContext.Notes.FindAsync(new object[] {id}, cancellationToken: ct);
        
        _dbContext.Remove(note);
        
        await _dbContext.SaveChangesAsync(ct);
        
        return Ok();
    }
}