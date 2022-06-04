using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    public partial class V39 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "GeneralImpression",
                table: "Ratings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "InterviewLevel",
                table: "Ratings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "SelectionLength",
                table: "Ratings",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GeneralImpression",
                table: "Ratings");

            migrationBuilder.DropColumn(
                name: "InterviewLevel",
                table: "Ratings");

            migrationBuilder.DropColumn(
                name: "SelectionLength",
                table: "Ratings");
        }
    }
}
