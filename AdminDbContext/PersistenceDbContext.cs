using Common;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Model;

namespace AdminDbContext
{
    public class PersistenceDbContext : IdentityDbContext
    {
        public PersistenceDbContext(DbContextOptions<PersistenceDbContext> options)
            :base(options)
        {}

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

        }

        public DbSet<PagoEfectivo> PagoEfectivo { get; set; }
        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<Miscelaneo> Miscelaneo { get; set; }
    }
}
