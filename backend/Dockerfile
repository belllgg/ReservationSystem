# Usar el SDK de .NET 9.0
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copiar los archivos de proyecto
COPY ["ReservationSystem.Api/ReservationSystem.Api.csproj", "ReservationSystem.Api/"]
COPY ["ReservationSystem.Data/ReservationSystem.Data.csproj", "ReservationSystem.Data/"]

# Restaurar las dependencias
RUN dotnet restore "ReservationSystem.Api/ReservationSystem.Api.csproj"

# Copiar el resto de los archivos
COPY . .

WORKDIR "/src/ReservationSystem.Api"

# Construir el proyecto en modo Release
RUN dotnet build "ReservationSystem.Api.csproj" -c Release -o /app/build

# Publicar el proyecto
FROM build AS publish
RUN dotnet publish "ReservationSystem.Api.csproj" -c Release -o /app/publish

# Usar la imagen de ASP.NET 9.0 para el entorno de ejecución
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app

# Copiar los archivos publicados desde el contenedor de publicación
COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "ReservationSystem.Api.dll"]
