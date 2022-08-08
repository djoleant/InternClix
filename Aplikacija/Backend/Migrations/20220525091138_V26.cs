using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    public partial class V26 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<int>(
                name: "Dislikes",
                table: "Ratings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Likes",
                table: "Ratings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Likes",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "InternshipStudent",
                columns: table => new
                {
                    AppliedInternshipsID = table.Column<int>(type: "int", nullable: false),
                    AppliedStudentsId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InternshipStudent", x => new { x.AppliedInternshipsID, x.AppliedStudentsId });
                    table.ForeignKey(
                        name: "FK_InternshipStudent_AspNetUsers_AppliedStudentsId",
                        column: x => x.AppliedStudentsId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InternshipStudent_Internships_AppliedInternshipsID",
                        column: x => x.AppliedInternshipsID,
                        principalTable: "Internships",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InternshipStudent1",
                columns: table => new
                {
                    PreviousInternshipsID = table.Column<int>(type: "int", nullable: false),
                    PreviousStudentsId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InternshipStudent1", x => new { x.PreviousInternshipsID, x.PreviousStudentsId });
                    table.ForeignKey(
                        name: "FK_InternshipStudent1_AspNetUsers_PreviousStudentsId",
                        column: x => x.PreviousStudentsId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InternshipStudent1_Internships_PreviousInternshipsID",
                        column: x => x.PreviousInternshipsID,
                        principalTable: "Internships",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InternshipStudent2",
                columns: table => new
                {
                    WishlistID = table.Column<int>(type: "int", nullable: false),
                    WishlistStudentsId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InternshipStudent2", x => new { x.WishlistID, x.WishlistStudentsId });
                    table.ForeignKey(
                        name: "FK_InternshipStudent2_AspNetUsers_WishlistStudentsId",
                        column: x => x.WishlistStudentsId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InternshipStudent2_Internships_WishlistID",
                        column: x => x.WishlistID,
                        principalTable: "Internships",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_InternshipStudent_AppliedStudentsId",
                table: "InternshipStudent",
                column: "AppliedStudentsId");

            migrationBuilder.CreateIndex(
                name: "IX_InternshipStudent1_PreviousStudentsId",
                table: "InternshipStudent1",
                column: "PreviousStudentsId");

            migrationBuilder.CreateIndex(
                name: "IX_InternshipStudent2_WishlistStudentsId",
                table: "InternshipStudent2",
                column: "WishlistStudentsId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InternshipStudent");

            migrationBuilder.DropTable(
                name: "InternshipStudent1");

            migrationBuilder.DropTable(
                name: "InternshipStudent2");

            migrationBuilder.DropColumn(
                name: "Dislikes",
                table: "Ratings");

            migrationBuilder.DropColumn(
                name: "Likes",
                table: "Ratings");

            migrationBuilder.DropColumn(
                name: "Likes",
                table: "AspNetUsers");

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
    }
}
