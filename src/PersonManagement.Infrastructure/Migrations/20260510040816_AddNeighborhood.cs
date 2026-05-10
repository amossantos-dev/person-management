using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PersonManagement.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddNeighborhood : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Neighborhood",
                table: "PersonAddresses",
                type: "nvarchar(150)",
                maxLength: 150,
                nullable: true);

            migrationBuilder.UpdateData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("a1000000-0000-0000-0000-000000000001"),
                column: "Neighborhood",
                value: null);

            migrationBuilder.UpdateData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("a2000000-0000-0000-0000-000000000002"),
                column: "Neighborhood",
                value: null);

            migrationBuilder.UpdateData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("a3000000-0000-0000-0000-000000000003"),
                column: "Neighborhood",
                value: null);

            migrationBuilder.UpdateData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000004"),
                column: "Neighborhood",
                value: null);

            migrationBuilder.UpdateData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("a5000000-0000-0000-0000-000000000005"),
                column: "Neighborhood",
                value: null);

            migrationBuilder.UpdateData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("a6000000-0000-0000-0000-000000000006"),
                column: "Neighborhood",
                value: null);

            migrationBuilder.UpdateData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("a7000000-0000-0000-0000-000000000007"),
                column: "Neighborhood",
                value: null);

            migrationBuilder.UpdateData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("a8000000-0000-0000-0000-000000000008"),
                column: "Neighborhood",
                value: null);

            migrationBuilder.UpdateData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("a9000000-0000-0000-0000-000000000009"),
                column: "Neighborhood",
                value: null);

            migrationBuilder.UpdateData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("aa000000-0000-0000-0000-00000000000a"),
                column: "Neighborhood",
                value: null);

            migrationBuilder.UpdateData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("ab000000-0000-0000-0000-00000000000b"),
                column: "Neighborhood",
                value: null);

            migrationBuilder.UpdateData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("ac000000-0000-0000-0000-00000000000c"),
                column: "Neighborhood",
                value: null);

            migrationBuilder.UpdateData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("ad000000-0000-0000-0000-00000000000d"),
                column: "Neighborhood",
                value: null);

            migrationBuilder.UpdateData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("ae000000-0000-0000-0000-00000000000e"),
                column: "Neighborhood",
                value: null);

            migrationBuilder.UpdateData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("af000000-0000-0000-0000-00000000000f"),
                column: "Neighborhood",
                value: null);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Neighborhood",
                table: "PersonAddresses");
        }
    }
}
