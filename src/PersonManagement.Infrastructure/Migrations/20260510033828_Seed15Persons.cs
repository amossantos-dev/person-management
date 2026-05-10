using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PersonManagement.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Seed15Persons : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("a1000000-0000-0000-0000-000000000001"),
                column: "Country",
                value: "Brasil");

            migrationBuilder.UpdateData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("a2000000-0000-0000-0000-000000000002"),
                column: "Country",
                value: "Brasil");

            migrationBuilder.UpdateData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("a3000000-0000-0000-0000-000000000003"),
                column: "Country",
                value: "Brasil");

            migrationBuilder.InsertData(
                table: "PersonAddresses",
                columns: new[] { "Id", "City", "Complement", "Country", "Number", "State", "Street" },
                values: new object[,]
                {
                    { new Guid("a4000000-0000-0000-0000-000000000004"), "São Paulo", "Cj 42", "Brasil", "1500", "SP", "Av. Paulista" },
                    { new Guid("a5000000-0000-0000-0000-000000000005"), "Belo Horizonte", null, "Brasil", "88", "MG", "Rua da Liberdade" },
                    { new Guid("a6000000-0000-0000-0000-000000000006"), "Salvador", null, "Brasil", "45", "BA", "Rua Sete de Setembro" },
                    { new Guid("a7000000-0000-0000-0000-000000000007"), "Fortaleza", "Sala 3", "Brasil", "210", "CE", "Rua do Comércio" },
                    { new Guid("a8000000-0000-0000-0000-000000000008"), "Manaus", null, "Brasil", "900", "AM", "Av. Brasil" },
                    { new Guid("a9000000-0000-0000-0000-000000000009"), "Porto Alegre", null, "Brasil", "55", "RS", "Rua das Palmeiras" },
                    { new Guid("aa000000-0000-0000-0000-00000000000a"), "Belém", null, "Brasil", "320", "PA", "Av. Amazonas" },
                    { new Guid("ab000000-0000-0000-0000-00000000000b"), "Recife", "Apto 2", "Brasil", "77", "PE", "Rua Marechal Deodoro" },
                    { new Guid("ac000000-0000-0000-0000-00000000000c"), "Goiânia", null, "Brasil", "14", "GO", "Rua das Acácias" },
                    { new Guid("ad000000-0000-0000-0000-00000000000d"), "Florianópolis", null, "Brasil", "500", "SC", "Rua da Praia" },
                    { new Guid("ae000000-0000-0000-0000-00000000000e"), "Brasília", "Bl. B", "Brasil", "730", "DF", "Av. das Nações" },
                    { new Guid("af000000-0000-0000-0000-00000000000f"), "Natal", null, "Brasil", "62", "RN", "Rua Tiradentes" }
                });

            migrationBuilder.InsertData(
                table: "Persons",
                columns: new[] { "Id", "DateOfBirth", "IdAddress", "Name" },
                values: new object[,]
                {
                    { new Guid("b4000000-0000-0000-0000-000000000004"), new DateTime(1988, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("a4000000-0000-0000-0000-000000000004"), "Diego Ferreira" },
                    { new Guid("b5000000-0000-0000-0000-000000000005"), new DateTime(1993, 11, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("a5000000-0000-0000-0000-000000000005"), "Elena Rocha" },
                    { new Guid("b6000000-0000-0000-0000-000000000006"), new DateTime(1982, 7, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("a6000000-0000-0000-0000-000000000006"), "Felipe Andrade" },
                    { new Guid("b7000000-0000-0000-0000-000000000007"), new DateTime(1997, 4, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("a7000000-0000-0000-0000-000000000007"), "Gabriela Lima" },
                    { new Guid("b8000000-0000-0000-0000-000000000008"), new DateTime(1991, 9, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("a8000000-0000-0000-0000-000000000008"), "Henrique Souza" },
                    { new Guid("b9000000-0000-0000-0000-000000000009"), new DateTime(1999, 2, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("a9000000-0000-0000-0000-000000000009"), "Isabela Martins" },
                    { new Guid("ba000000-0000-0000-0000-00000000000a"), new DateTime(1980, 12, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("aa000000-0000-0000-0000-00000000000a"), "João Pereira" },
                    { new Guid("bb000000-0000-0000-0000-00000000000b"), new DateTime(1994, 6, 18, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("ab000000-0000-0000-0000-00000000000b"), "Karen Nascimento" },
                    { new Guid("bc000000-0000-0000-0000-00000000000c"), new DateTime(1987, 3, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("ac000000-0000-0000-0000-00000000000c"), "Lucas Oliveira" },
                    { new Guid("bd000000-0000-0000-0000-00000000000d"), new DateTime(1996, 10, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("ad000000-0000-0000-0000-00000000000d"), "Mariana Castro" },
                    { new Guid("be000000-0000-0000-0000-00000000000e"), new DateTime(2000, 1, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("ae000000-0000-0000-0000-00000000000e"), "Nicolas Barbosa" },
                    { new Guid("bf000000-0000-0000-0000-00000000000f"), new DateTime(1989, 8, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("af000000-0000-0000-0000-00000000000f"), "Olivia Cardoso" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Persons",
                keyColumn: "Id",
                keyValue: new Guid("b4000000-0000-0000-0000-000000000004"));

            migrationBuilder.DeleteData(
                table: "Persons",
                keyColumn: "Id",
                keyValue: new Guid("b5000000-0000-0000-0000-000000000005"));

            migrationBuilder.DeleteData(
                table: "Persons",
                keyColumn: "Id",
                keyValue: new Guid("b6000000-0000-0000-0000-000000000006"));

            migrationBuilder.DeleteData(
                table: "Persons",
                keyColumn: "Id",
                keyValue: new Guid("b7000000-0000-0000-0000-000000000007"));

            migrationBuilder.DeleteData(
                table: "Persons",
                keyColumn: "Id",
                keyValue: new Guid("b8000000-0000-0000-0000-000000000008"));

            migrationBuilder.DeleteData(
                table: "Persons",
                keyColumn: "Id",
                keyValue: new Guid("b9000000-0000-0000-0000-000000000009"));

            migrationBuilder.DeleteData(
                table: "Persons",
                keyColumn: "Id",
                keyValue: new Guid("ba000000-0000-0000-0000-00000000000a"));

            migrationBuilder.DeleteData(
                table: "Persons",
                keyColumn: "Id",
                keyValue: new Guid("bb000000-0000-0000-0000-00000000000b"));

            migrationBuilder.DeleteData(
                table: "Persons",
                keyColumn: "Id",
                keyValue: new Guid("bc000000-0000-0000-0000-00000000000c"));

            migrationBuilder.DeleteData(
                table: "Persons",
                keyColumn: "Id",
                keyValue: new Guid("bd000000-0000-0000-0000-00000000000d"));

            migrationBuilder.DeleteData(
                table: "Persons",
                keyColumn: "Id",
                keyValue: new Guid("be000000-0000-0000-0000-00000000000e"));

            migrationBuilder.DeleteData(
                table: "Persons",
                keyColumn: "Id",
                keyValue: new Guid("bf000000-0000-0000-0000-00000000000f"));

            migrationBuilder.DeleteData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("a4000000-0000-0000-0000-000000000004"));

            migrationBuilder.DeleteData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("a5000000-0000-0000-0000-000000000005"));

            migrationBuilder.DeleteData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("a6000000-0000-0000-0000-000000000006"));

            migrationBuilder.DeleteData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("a7000000-0000-0000-0000-000000000007"));

            migrationBuilder.DeleteData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("a8000000-0000-0000-0000-000000000008"));

            migrationBuilder.DeleteData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("a9000000-0000-0000-0000-000000000009"));

            migrationBuilder.DeleteData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("aa000000-0000-0000-0000-00000000000a"));

            migrationBuilder.DeleteData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("ab000000-0000-0000-0000-00000000000b"));

            migrationBuilder.DeleteData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("ac000000-0000-0000-0000-00000000000c"));

            migrationBuilder.DeleteData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("ad000000-0000-0000-0000-00000000000d"));

            migrationBuilder.DeleteData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("ae000000-0000-0000-0000-00000000000e"));

            migrationBuilder.DeleteData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("af000000-0000-0000-0000-00000000000f"));

            migrationBuilder.UpdateData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("a1000000-0000-0000-0000-000000000001"),
                column: "Country",
                value: "Brazil");

            migrationBuilder.UpdateData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("a2000000-0000-0000-0000-000000000002"),
                column: "Country",
                value: "Brazil");

            migrationBuilder.UpdateData(
                table: "PersonAddresses",
                keyColumn: "Id",
                keyValue: new Guid("a3000000-0000-0000-0000-000000000003"),
                column: "Country",
                value: "Brazil");
        }
    }
}
