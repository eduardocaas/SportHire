#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5301

ENV ASPNETCORE_URLS=http://+:5301;

RUN apt update && apt install nano
RUN apt install net-tools && apt install iputils-ping

RUN adduser -u 2000 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

RUN mkdir /app/keys

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["SportHire.Events.API/SportHire.Events.API.csproj", "SportHire.Events.API/"]
RUN dotnet restore "./SportHire.Events.API/SportHire.Events.API.csproj"
COPY . .
WORKDIR "/src/SportHire.Events.API"
RUN dotnet build "./SportHire.Events.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./SportHire.Events.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SportHire.Events.API.dll"]