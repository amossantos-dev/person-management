using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PersonManagement.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class SeedInitialData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "PersonAddresses",
                columns: new[] { "Id", "City", "Complement", "Country", "Number", "State", "Street" },
                values: new object[,]
                {
                    { new Guid("a1000000-0000-0000-0000-000000000001"), "São Paulo", null, "Brazil", "100", "SP", "Rua das Flores" },
                    { new Guid("a2000000-0000-0000-0000-000000000002"), "Rio de Janeiro", "Apto 10", "Brazil", "200", "RJ", "Av. Atlântica" },
                    { new Guid("a3000000-0000-0000-0000-000000000003"), "Curitiba", null, "Brazil", "300", "PR", "Rua XV de Novembro" }
                });

            migrationBuilder.InsertData(
                table: "Persons",
                columns: new[] { "Id", "DateOfBirth", "IdAddress", "Name" },
                values: new object[,]
                {
                    { new Guid("b1000000-0000-0000-0000-000000000001"), new DateTime(1990, 5, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("a1000000-0000-0000-0000-000000000001"), "Alice Silva" },
                    { new Guid("b2000000-0000-0000-0000-000000000002"), new DateTime(1985, 3, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("a2000000-0000-0000-0000-000000000002"), "Bruno Costa" },
                    { new Guid("b3000000-0000-0000-0000-000000000003"), new DateTime(1995, 8, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("a3000000-0000-0000-0000-000000000003"), "Carla Mendes" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Persons",
                keyColumn: "Id",
                keyValue: new Guid("b1000000-0000-0000-0000-000000000001"));

            migrationBuilder.DeleteData(
                table: "Persons",
                keyColumn: "Id",
                keyValue: new Guid("b2000000-0000-0000-0000-000000000002"));

            migrationBuilder.DeleteData(
                table: "Persons",
                keyColumn: "Id",
                keyValue: new Guid("b3000000-0000-0000-0000-000000000003"));

            migrationBuilder.DeleteData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("a1000000-0000-0000-0000-000000000001"));

            migrationBuilder.DeleteData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("a2000000-0000-0000-0000-000000000002"));

            migrationBuilder.DeleteData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("a3000000-0000-0000-0000-000000000003"));
        }
    }
}
