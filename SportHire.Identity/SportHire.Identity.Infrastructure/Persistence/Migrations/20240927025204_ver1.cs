using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SportHire.Identity.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ver1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    FullName = table.Column<string>(type: "VARCHAR", maxLength: 255, nullable: false),
                    Email = table.Column<string>(type: "VARCHAR", maxLength: 255, nullable: false),
                    Password = table.Column<string>(type: "VARCHAR", maxLength: 255, nullable: false),
                    EmailConfirmed = table.Column<bool>(type: "BOOLEAN", nullable: false, defaultValueSql: "FALSE")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_User_Email",
                table: "Users",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
