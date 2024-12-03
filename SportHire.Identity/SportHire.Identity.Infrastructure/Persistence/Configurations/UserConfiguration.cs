using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SportHire.Identity.Core.Entities;

namespace SportHire.Identity.Infrastructure.Persistence.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder
                .ToTable("Users")
                .HasKey(u => u.Id);

            builder
                .Property(u => u.Id)
                .HasDefaultValueSql("gen_random_uuid()")
                .ValueGeneratedOnAdd();

            builder
                .Property(u => u.FullName)
                .HasColumnType("VARCHAR")
                .HasMaxLength(255)
                .IsRequired();

            builder
                .Property(u => u.Email)
                .HasColumnType("VARCHAR")
                .HasMaxLength(255)
                .IsRequired();

            builder
                .Property(u => u.Password)
                .HasColumnType("VARCHAR")
                .HasMaxLength(255)
                .IsRequired();

            builder
                .Property(u => u.EmailConfirmed)
                .HasColumnType("BOOLEAN")
                .HasDefaultValueSql("FALSE");

            builder
                .HasIndex(u => u.Email, "IX_User_Email")
                .IsUnique();
        }
    }
}
