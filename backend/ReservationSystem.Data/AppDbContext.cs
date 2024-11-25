using Microsoft.EntityFrameworkCore;
using ReservationSystem.Data.Models;

namespace ReservationSystem.Data;

public class AppDbContext : DbContext 
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public required DbSet<Reservation> Reservations { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Reservation>()
            .Property(r => r.ServicePrice)
            .HasColumnType("decimal(18,2)");
    }
}