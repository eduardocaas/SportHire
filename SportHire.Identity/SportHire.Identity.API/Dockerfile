#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5201

ENV ASPNETCORE_URLS=http://+:5201;

RUN apt update && apt install nano

RUN adduser -u 2000 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

RUN mkdir /app/keys
RUN cd /app/keys && openssl genrsa -out private.pem 2048
RUN cd /app/keys && openssl rsa -in private.pem -pubout -outform PEM -out public.pem

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["SportHire.Identity.API/SportHire.Identity.API.csproj", "SportHire.Identity.API/"]
RUN dotnet restore "./SportHire.Identity.API/SportHire.Identity.API.csproj"
COPY . .
WORKDIR "/src/SportHire.Identity.API"
RUN dotnet build "./SportHire.Identity.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./SportHire.Identity.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SportHire.Identity.API.dll"]