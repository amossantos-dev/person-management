using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PersonManagement.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddZipCode : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ZipCode",
                table: "PersonAddresses",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("a1000000-0000-0000-0000-000000000001"),
                column: "ZipCode",
                value: null);

            migrationBuilder.UpdateData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("a2000000-0000-0000-0000-000000000002"),
                column: "ZipCode",
                value: null);

            migrationBuilder.UpdateData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("a3000000-0000-0000-0000-000000000003"),
                column: "ZipCode",
                value: null);

            migrationBuilder.UpdateData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000004"),
                column: "ZipCode",
                value: null);

            migrationBuilder.UpdateData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("a5000000-0000-0000-0000-000000000005"),
                column: "ZipCode",
                value: null);

            migrationBuilder.UpdateData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("a6000000-0000-0000-0000-000000000006"),
                column: "ZipCode",
                value: null);

            migrationBuilder.UpdateData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("a7000000-0000-0000-0000-000000000007"),
                column: "ZipCode",
                value: null);

            migrationBuilder.UpdateData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("a8000000-0000-0000-0000-000000000008"),
                column: "ZipCode",
                value: null);

            migrationBuilder.UpdateData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("a9000000-0000-0000-0000-000000000009"),
                column: "ZipCode",
                value: null);

            migrationBuilder.UpdateData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("aa000000-0000-0000-0000-00000000000a"),
                column: "ZipCode",
                value: null);

            migrationBuilder.UpdateData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("ab000000-0000-0000-0000-00000000000b"),
                column: "ZipCode",
                value: null);

            migrationBuilder.UpdateData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("ac000000-0000-0000-0000-00000000000c"),
                column: "ZipCode",
                value: null);

            migrationBuilder.UpdateData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("ad000000-0000-0000-0000-00000000000d"),
                column: "ZipCode",
                value: null);

            migrationBuilder.UpdateData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("ae000000-0000-0000-0000-00000000000e"),
                column: "ZipCode",
                value: null);

            migrationBuilder.UpdateData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("af000000-0000-0000-0000-00000000000f"),
                column: "ZipCode",
                value: null);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ZipCode",
                table: "PersonAddresses");
        }
    }
}
