I'll create a minimal API for a todo app with endpoints for CRUD operations. Let me update the Program.cs file: 

Read [](file:///Users/vigneshnadar/Projects/todoApp/todoapi/Program.cs#1-1), lines 1 to 50

Here's the updated minimal API for a todo app:

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// In-memory todo list for demo
var todos = new List<Todo>();
var nextId = 1;

// GET all todos
app.MapGet("/todos", () => todos)
    .WithName("GetTodos")
    .WithOpenApi();

// GET todo by id
app.MapGet("/todos/{id}", (int id) =>
    todos.FirstOrDefault(t => t.Id == id) is Todo todo
        ? Results.Ok(todo)
        : Results.NotFound())
    .WithName("GetTodoById")
    .WithOpenApi();

// POST create new todo
app.MapPost("/todos", (CreateTodoRequest request) =>
{
    var todo = new Todo
    {
        Id = nextId++,
        Title = request.Title,
        Description = request.Description,
        IsCompleted = false,
        CreatedAt = DateTime.UtcNow
    };
    todos.Add(todo);
    return Results.Created($"/todos/{todo.Id}", todo);
})
.WithName("CreateTodo")
.WithOpenApi();

// PUT update todo
app.MapPut("/todos/{id}", (int id, UpdateTodoRequest request) =>
{
    var todo = todos.FirstOrDefault(t => t.Id == id);
    if (todo is null)
        return Results.NotFound();

    todo.Title = request.Title ?? todo.Title;
    todo.Description = request.Description ?? todo.Description;
    todo.IsCompleted = request.IsCompleted ?? todo.IsCompleted;
    return Results.Ok(todo);
})
.WithName("UpdateTodo")
.WithOpenApi();

// DELETE todo
app.MapDelete("/todos/{id}", (int id) =>
{
    var todo = todos.FirstOrDefault(t => t.Id == id);
    if (todo is null)
        return Results.NotFound();

    todos.Remove(todo);
    return Results.NoContent();
})
.WithName("DeleteTodo")
.WithOpenApi();

app.Run();

// Models
record Todo
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public bool IsCompleted { get; set; }
    public DateTime CreatedAt { get; set; }
}

record CreateTodoRequest(string Title, string Description);

record UpdateTodoRequest(string? Title, string? Description, bool? IsCompleted);
```

This API includes:
- **GET /todos** - Get all todos
- **GET /todos/{id}** - Get single todo
- **POST /todos** - Create new todo
- **PUT /todos/{id}** - Update todo
- **DELETE /todos/{id}** - Delete todo

Run `dotnet run` and access Swagger at `http://localhost:5257/swagger` to test the endpoints.