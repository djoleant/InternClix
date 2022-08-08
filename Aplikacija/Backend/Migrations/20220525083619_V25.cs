using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    public partial class V25 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "StudentId",
                table: "Internships",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StudentId1",
                table: "Internships",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Internships_StudentId",
                table: "Internships",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_Internships_StudentId1",
                table: "Internships",
                column: "StudentId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Internships_AspNetUsers_StudentId",
                table: "Internships",
                column: "StudentId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Internships_AspNetUsers_StudentId1",
                table: "Internships",
                column: "StudentId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Internships_AspNetUsers_StudentId",
                table: "Internships");

            migrationBuilder.DropForeignKey(
                name: "FK_Internships_AspNetUsers_StudentId1",
                table: "Internships");

            migrationBuilder.DropIndex(
                name: "IX_Internships_StudentId",
                table: "Internships");

            migrationBuilder.DropIndex(
                name: "IX_Internships_StudentId1",
                table: "Internships");

            migrationBuilder.DropColumn(
                name: "StudentId",
                table: "Internships");

            migrationBuilder.DropColumn(
                name: "StudentId1",
                table: "Internships");
        }
    }
}
