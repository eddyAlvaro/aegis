import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersTableUpdate21748193697209 implements MigrationInterface {
    name = 'UsersTableUpdate21748193697209'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "otp"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "otpExpiry"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "phoneCountryCode"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "guarantedBalanceAmount"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "availabledBalanceAmount"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "maritalStatus"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "currentLicense" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "desiredLicense" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "procedureType" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "classStartDate" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "classEndDate" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "schedule" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "days" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "shift" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "issueDate" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "course" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "occupation" character varying(50)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "occupation"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "course"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "issueDate"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "shift"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "days"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "schedule"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "classEndDate"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "classStartDate"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "procedureType"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "desiredLicense"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "currentLicense"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "maritalStatus" character varying`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "gender" character varying`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "availabledBalanceAmount" numeric(8,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "guarantedBalanceAmount" numeric(8,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "phoneCountryCode" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "otpExpiry" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "otp" character varying(10)`);
    }

}
