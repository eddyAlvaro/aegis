import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersTableUpdate1748178906592 implements MigrationInterface {
    name = 'UsersTableUpdate1748178906592'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "status" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."role_entity_type_enum" AS ENUM('PLATFORM', 'ORGANIZATION')`);
        await queryRunner.query(`CREATE TYPE "public"."role_entity_status_enum" AS ENUM('ACTIVE', 'INACTIVE')`);
        await queryRunner.query(`CREATE TABLE "role_entity" ("id" text NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "type" "public"."role_entity_type_enum" NOT NULL DEFAULT 'ORGANIZATION', "isSystem" boolean NOT NULL, "grantIds" jsonb NOT NULL DEFAULT '[]', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "status" "public"."role_entity_status_enum" NOT NULL, "deletedAt" TIMESTAMP, CONSTRAINT "PK_7bc1bd2364b6e9bf7c84b1e52e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_entity_type_enum" AS ENUM('SUPER_ADMIN', 'PLATFORM_ADMIN', 'PLATFORM_USER', 'ORGANIZATION_ADMIN', 'ORGANIZATION_USER', 'PARTICIPANT')`);
        await queryRunner.query(`CREATE TYPE "public"."user_entity_status_enum" AS ENUM('SUSPENDED', 'ACTIVE', 'BLOCKED', 'NOT_VERIFIED')`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" uuid NOT NULL, "email" character varying NOT NULL, "password" character varying, "firstName" character varying, "lastName" character varying, "commonName" character varying NOT NULL DEFAULT '', "documentIdentifier" character varying(50) NOT NULL, "phoneNumber" character varying(50) NOT NULL, "otp" character varying(10), "otpExpiry" TIMESTAMP WITH TIME ZONE, "phoneCountryCode" character varying(50) NOT NULL, "type" "public"."user_entity_type_enum" NOT NULL, "status" "public"."user_entity_status_enum" NOT NULL, "guarantedBalanceAmount" numeric(8,2) NOT NULL DEFAULT '0', "availabledBalanceAmount" numeric(8,2) NOT NULL DEFAULT '0', "gender" character varying, "maritalStatus" character varying, "birthDate" date, "loginAttempts" integer NOT NULL DEFAULT '0', "lastResetPasswordDelivery" TIMESTAMP WITH TIME ZONE, "passwordUpdatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "passwordExpirationNotifiedAt" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "connectedAt" TIMESTAMP WITH TIME ZONE, "suspensionReason" character varying(255), CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f2dda8af4def80688e670e1a14" ON "user_entity" ("firstName") `);
        await queryRunner.query(`CREATE INDEX "IDX_bd48799d4fcc841fbda47b95f8" ON "user_entity" ("lastName") `);
        await queryRunner.query(`CREATE TABLE "session" ("id" uuid NOT NULL, "hash" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ddc5" ON "session" ("userId") `);
        await queryRunner.query(`CREATE TABLE "role" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "path" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auditable_event" ("eventId" character varying(120) NOT NULL, "version" integer NOT NULL, "event" character varying NOT NULL, "payload" jsonb NOT NULL DEFAULT '{}', "aggregateId" character varying NOT NULL, "occurredOn" TIMESTAMP WITH TIME ZONE NOT NULL, "correlationId" character varying(255), "causationId" character varying(255), CONSTRAINT "PK_f2f8c322b51cea422718aa0cd25" PRIMARY KEY ("eventId", "version"))`);
        await queryRunner.query(`CREATE TABLE "role_entity_users_user_entity" ("roleEntityId" text NOT NULL, "userEntityId" uuid NOT NULL, CONSTRAINT "PK_140409a59b6cdb1d21f91880166" PRIMARY KEY ("roleEntityId", "userEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_71bc9edd8f7fe2cd3702f45a6e" ON "role_entity_users_user_entity" ("roleEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_42cf3453eccbf7f761b3468253" ON "role_entity_users_user_entity" ("userEntityId") `);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_entity_users_user_entity" ADD CONSTRAINT "FK_71bc9edd8f7fe2cd3702f45a6ed" FOREIGN KEY ("roleEntityId") REFERENCES "role_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_entity_users_user_entity" ADD CONSTRAINT "FK_42cf3453eccbf7f761b3468253f" FOREIGN KEY ("userEntityId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_entity_users_user_entity" DROP CONSTRAINT "FK_42cf3453eccbf7f761b3468253f"`);
        await queryRunner.query(`ALTER TABLE "role_entity_users_user_entity" DROP CONSTRAINT "FK_71bc9edd8f7fe2cd3702f45a6ed"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_42cf3453eccbf7f761b3468253"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_71bc9edd8f7fe2cd3702f45a6e"`);
        await queryRunner.query(`DROP TABLE "role_entity_users_user_entity"`);
        await queryRunner.query(`DROP TABLE "auditable_event"`);
        await queryRunner.query(`DROP TABLE "file"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3d2f174ef04fb312fdebd0ddc5"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bd48799d4fcc841fbda47b95f8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f2dda8af4def80688e670e1a14"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP TYPE "public"."user_entity_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_entity_type_enum"`);
        await queryRunner.query(`DROP TABLE "role_entity"`);
        await queryRunner.query(`DROP TYPE "public"."role_entity_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."role_entity_type_enum"`);
        await queryRunner.query(`DROP TABLE "status"`);
    }

}
