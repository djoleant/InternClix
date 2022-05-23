using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    public partial class V22 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Score",
                table: "Ratings",
                newName: "SkillImprovementScore");

            migrationBuilder.RenameColumn(
                name: "Comment",
                table: "Ratings",
                newName: "PositiveExperience");

            migrationBuilder.AddColumn<float>(
                name: "BenefitsScore",
                table: "Ratings",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<string>(
                name: "NegativeExperience",
                table: "Ratings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<float>(
                name: "OverallScore",
                table: "Ratings",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<bool>(
                name: "Recommended",
                table: "Ratings",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BenefitsScore",
                table: "Ratings");

            migrationBuilder.DropColumn(
                name: "NegativeExperience",
                table: "Ratings");

            migrationBuilder.DropColumn(
                name: "OverallScore",
                table: "Ratings");

            migrationBuilder.DropColumn(
                name: "Recommended",
                table: "Ratings");

            migrationBuilder.RenameColumn(
                name: "SkillImprovementScore",
                table: "Ratings",
                newName: "Score");

            migrationBuilder.RenameColumn(
                name: "PositiveExperience",
                table: "Ratings",
                newName: "Comment");
        }
    }
}
