CREATE TABLE "Users" (
    "Id" uuid NOT NULL DEFAULT (gen_random_uuid()),
    "FullName" VARCHAR NOT NULL,
    "Email" VARCHAR NOT NULL,
    "Password" VARCHAR NOT NULL,
    "EmailConfirmed" BOOLEAN NOT NULL DEFAULT (FALSE),
    CONSTRAINT "PK_Users" PRIMARY KEY ("Id")
);
