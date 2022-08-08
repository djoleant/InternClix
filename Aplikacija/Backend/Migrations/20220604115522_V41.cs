using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    public partial class V41 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "InterviewQuestion",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InternshipID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InterviewQuestion", x => x.ID);
                    table.ForeignKey(
                        name: "FK_InterviewQuestion_Internships_InternshipID",
                        column: x => x.InternshipID,
                        principalTable: "Internships",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_InterviewQuestion_InternshipID",
                table: "InterviewQuestion",
                column: "InternshipID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InterviewQuestion");
        }
    }
}
