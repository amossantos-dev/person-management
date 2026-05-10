FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /build

COPY ["backend/PersonManagement.Api/PersonManagement.Api.csproj", "backend/PersonManagement.Api/"]
COPY ["backend/PersonManagement.Application/PersonManagement.Application.csproj", "backend/PersonManagement.Application/"]
COPY ["backend/PersonManagement.Domain/PersonManagement.Domain.csproj", "backend/PersonManagement.Domain/"]
COPY ["backend/PersonManagement.Infrastructure/PersonManagement.Infrastructure.csproj", "backend/PersonManagement.Infrastructure/"]

RUN dotnet restore "backend/PersonManagement.Api/PersonManagement.Api.csproj"

COPY . .
RUN dotnet publish "backend/PersonManagement.Api/PersonManagement.Api.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "PersonManagement.Api.dll"]
