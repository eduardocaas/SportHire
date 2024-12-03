--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4 (Debian 16.4-1.pgdg120+1)
-- Dumped by pg_dump version 16.4

-- Started on 2024-12-02 23:25:50

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3369 (class 1262 OID 16385)
-- Name: SportHire; Type: DATABASE; Schema: -; Owner: postgre_user
--

CREATE DATABASE "SportHire" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';

\connect "SportHire"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

-- CREATE SCHEMA public;


-- ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3370 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

-- COMMENT ON SCHEMA public IS 'standard public schema';


-- SET default_tablespace = '';

-- SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 24607)
-- Name: Users; Type: TABLE; Schema: public; Owner: postgre_user
--

CREATE TABLE public."Users" (
    "Id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "FullName" character varying NOT NULL,
    "Email" character varying NOT NULL,
    "Password" character varying NOT NULL,
    "EmailConfirmed" boolean DEFAULT false NOT NULL
);


-- ALTER TABLE public."Users" OWNER TO postgre_user;

--
-- TOC entry 217 (class 1259 OID 32794)
-- Name: Wallet; Type: TABLE; Schema: public; Owner: postgre_user
--

CREATE TABLE public."Wallet" (
    "Id" uuid NOT NULL,
    "Balance" numeric NOT NULL,
    "UserId" uuid NOT NULL
);


-- ALTER TABLE public."Wallet" OWNER TO postgre_user;

--
-- TOC entry 215 (class 1259 OID 24602)
-- Name: __EFMigrationsHistory; Type: TABLE; Schema: public; Owner: postgre_user
--

CREATE TABLE public."__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL
);


-- ALTER TABLE public."__EFMigrationsHistory" OWNER TO postgre_user;

--
-- TOC entry 3216 (class 2606 OID 24615)
-- Name: Users PK_Users; Type: CONSTRAINT; Schema: public; Owner: postgre_user
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "PK_Users" PRIMARY KEY ("Id");


--
-- TOC entry 3219 (class 2606 OID 32800)
-- Name: Wallet PK_Wallet; Type: CONSTRAINT; Schema: public; Owner: postgre_user
--

ALTER TABLE ONLY public."Wallet"
    ADD CONSTRAINT "PK_Wallet" PRIMARY KEY ("Id");


--
-- TOC entry 3213 (class 2606 OID 24606)
-- Name: __EFMigrationsHistory PK___EFMigrationsHistory; Type: CONSTRAINT; Schema: public; Owner: postgre_user
--

ALTER TABLE ONLY public."__EFMigrationsHistory"
    ADD CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId");


--
-- TOC entry 3214 (class 1259 OID 24616)
-- Name: IX_User_Email; Type: INDEX; Schema: public; Owner: postgre_user
--

CREATE UNIQUE INDEX "IX_User_Email" ON public."Users" USING btree ("Email");


--
-- TOC entry 3217 (class 1259 OID 32806)
-- Name: IX_Wallet_UserId; Type: INDEX; Schema: public; Owner: postgre_user
--

CREATE UNIQUE INDEX "IX_Wallet_UserId" ON public."Wallet" USING btree ("UserId");


--
-- TOC entry 3220 (class 2606 OID 32801)
-- Name: Wallet FK_Wallet_Users_UserId; Type: FK CONSTRAINT; Schema: public; Owner: postgre_user
--

ALTER TABLE ONLY public."Wallet"
    ADD CONSTRAINT "FK_Wallet_Users_UserId" FOREIGN KEY ("UserId") REFERENCES public."Users"("Id") ON DELETE CASCADE;


-- Completed on 2024-12-02 23:25:50

--
-- PostgreSQL database dump complete
--

