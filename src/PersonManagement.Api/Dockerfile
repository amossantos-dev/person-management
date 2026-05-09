FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["src/PersonManagement.Api/PersonManagement.Api.csproj", "src/PersonManagement.Api/"]
COPY ["src/PersonManagement.Application/PersonManagement.Application.csproj", "src/PersonManagement.Application/"]
COPY ["src/PersonManagement.Domain/PersonManagement.Domain.csproj", "src/PersonManagement.Domain/"]
COPY ["src/PersonManagement.Infrastructure/PersonManagement.Infrastructure.csproj", "src/PersonManagement.Infrastructure/"]

RUN dotnet restore "src/PersonManagement.Api/PersonManagement.Api.csproj"

COPY . .
RUN dotnet publish "src/PersonManagement.Api/PersonManagement.Api.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "PersonManagement.Api.dll"]
