import { Status } from "../models/enums/status";
import { UF } from "../models/enums/uf";
import { Event } from "../models/event";

export const eventsFindPortoAlegreAberto: Event[] = [
  {
    Id: "507f1f77bcf86cd799439011",
    Sport: 1,
    EmailOwner: "owner1@example.com",
    Uf: UF.RS,
    City: "Porto Alegre",
    Address: "Rua A, 123",
    StartDate: new Date("2024-11-10T10:00:00"),
    Duration: 90,
    Status: Status.ABERTO,
    Cost: 100,
  },
  {
    Id: "507f1f77bcf86cd799439012",
    Sport: 2,
    EmailOwner: "owner2@example.com",
    Uf: UF.RS,
    City: "Porto Alegre",
    Address: "Rua B, 456",
    StartDate: new Date("2024-11-11T15:00:00"),
    Duration: 120,
    Status: Status.ABERTO,
    Cost: 150,
  },
  {
    Id: "507f1f77bcf86cd799439013",
    Sport: 3,
    EmailOwner: "owner3@example.com",
    Uf: UF.RS,
    City: "Porto Alegre",
    Address: "Rua C, 789",
    StartDate: new Date("2024-11-12T09:00:00"),
    Duration: 60,
    Status: Status.ABERTO,
    Cost: 200,
  },
  {
    Id: "507f1f77bcf86cd799439014",
    Sport: 2,
    EmailOwner: "owner4@example.com",
    Uf: UF.RS,
    City: "Porto Alegre",
    Address: "Rua D, 101",
    StartDate: new Date("2024-11-13T14:00:00"),
    Duration: 45,
    Status: Status.ABERTO,
    Cost: 120,
  },
  {
    Id: "507f1f77bcf86cd799439015",
    Sport: 3,
    EmailOwner: "owner5@example.com",
    Uf: UF.RS,
    City: "Porto Alegre",
    Address: "Rua E, 202",
    StartDate: new Date("2024-11-14T08:00:00"),
    Duration: 30,
    Status: Status.ABERTO,
    Cost: 80,
  },
  {
    Id: "507f1f77bcf86cd799439016",
    Sport: 1,
    EmailOwner: "owner6@example.com",
    Uf: UF.RS,
    City: "Porto Alegre",
    Address: "Rua F, 303",
    StartDate: new Date("2024-11-15T11:00:00"),
    Duration: 150,
    Status: Status.ABERTO,
    Cost: 200,
  },
  {
    Id: "507f1f77bcf86cd799439017",
    Sport: 1,
    EmailOwner: "owner7@example.com",
    Uf: UF.RS,
    City: "Porto Alegre",
    Address: "Rua G, 404",
    StartDate: new Date("2024-11-16T13:00:00"),
    Duration: 75,
    Status: Status.ABERTO,
    Cost: 170,
  },
];
