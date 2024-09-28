--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4 (Debian 16.4-1.pgdg120+1)
-- Dumped by pg_dump version 16.4

-- Started on 2024-09-27 22:18:57

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
-- TOC entry 3357 (class 1262 OID 16385)
-- Name: SportHire; Type: DATABASE; Schema: -; Owner: -
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
-- TOC entry 216 (class 1259 OID 24607)
-- Name: Users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Users" (
    "Id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "FullName" character varying NOT NULL,
    "Email" character varying NOT NULL,
    "Password" character varying NOT NULL,
    "EmailConfirmed" boolean DEFAULT false NOT NULL
);


--
-- TOC entry 3208 (class 2606 OID 24615)
-- Name: Users PK_Users; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "PK_Users" PRIMARY KEY ("Id");


--
-- TOC entry 3206 (class 1259 OID 24616)
-- Name: IX_User_Email; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "IX_User_Email" ON public."Users" USING btree ("Email");


-- Completed on 2024-09-27 22:18:57

--
-- PostgreSQL database dump complete
--

