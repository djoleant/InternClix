using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace Models
{
    public class InternClixDbContext : IdentityDbContext<ApplicationUser>
    {
        // DbSet...
        public DbSet<Student> Students { get; set; }
        public DbSet<Employer> Employers { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Internship> Internships { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<Category> Categories { get; set; }

        public DbSet<AdditionalInfo> AdditionalInfos { get; set; }
        public DbSet<CV> CVs { get; set; }
        public DbSet<Message> Messages { get; set; }

        public DbSet<Experience> Experiences { get; set; }

        public DbSet<InternshipApplication> InternshipApplication { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);



            modelBuilder.Entity<ApplicationUser>()
                .HasMany(x => x.SentMessages)
                .WithOne(x => x.Sender)
                .HasForeignKey("SenderId");


            modelBuilder.Entity<Internship>()
                .HasMany(x => x.AppliedStudents)
                .WithMany(x => x.AppliedInternships);

            modelBuilder.Entity<Internship>()
                .HasMany(x => x.PreviousStudents)
                .WithMany(x => x.PreviousInternships);

            modelBuilder.Entity<Internship>()
                .HasMany(x => x.WishlistStudents)
                .WithMany(x => x.Wishlist);


        }


#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public InternClixDbContext(DbContextOptions options) : base(options)
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        {


        }
    }
}
