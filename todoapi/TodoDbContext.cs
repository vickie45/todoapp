using Microsoft.EntityFrameworkCore;

public class TodoDbContext : DbContext
{
    public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options)
    {
    }

    // This DbSet represents the 'todos' table in your database
    public DbSet<Todo> Todos { get; set; } = default!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // You can add additional model configurations here if needed
    }
}