import { MigrationInterface, QueryRunner } from "typeorm";

export class EnrollmentSettings1748503909741 implements MigrationInterface {
    name = 'EnrollmentSettings1748503909741'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "driving_training_record_entity" DROP CONSTRAINT "FK_eef02f8ae418833067a7c425f59"`);
        await queryRunner.query(`ALTER TABLE "driving_training_record_entity" RENAME COLUMN "participantId" TO "enrollmentRecordId"`);
        await queryRunner.query(`CREATE TABLE "courses_entity" ("id" uuid NOT NULL, "category" character varying NOT NULL, "type" character varying NOT NULL, "hours" integer NOT NULL, CONSTRAINT "PK_a07b88e4aaedb8cf09c79ba5cef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "driving_teoric_record_entity" ("id" uuid NOT NULL, "initDate" date, "endDate" date, "class" character varying(50), "instructor" character varying(50), "comments" character varying(150), "hours" integer, "enrollmentRecordId" uuid, CONSTRAINT "PK_d117cd5994e5e9139e99ecd1722" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "enrollment_record_entity" ("id" uuid NOT NULL, "status" character varying(50), "payrollNumber" character varying(50), "enrolledUserId" uuid, CONSTRAINT "PK_60c6310c29f249604ae5e6cfc7b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vehicles_entity" ("id" text NOT NULL, "plate_number" character varying NOT NULL, "category" character varying NOT NULL, "mileage" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_3a83082a85866cbd4f42c96e206" UNIQUE ("plate_number"), CONSTRAINT "PK_421ffdb466a4a18ef2fccb8079c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "license_category_entity" ("id" text NOT NULL, "category" character varying NOT NULL, CONSTRAINT "PK_aa3b5c1b9a713fbb5fb453cff62" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "driving_training_daily_log_entity" ADD "mileageStart" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "driving_training_daily_log_entity" ADD "mileageEnd" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "driving_teoric_record_entity" ADD CONSTRAINT "FK_7bd49a0cc6775472c04002aa0a8" FOREIGN KEY ("enrollmentRecordId") REFERENCES "enrollment_record_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" ADD CONSTRAINT "FK_89c1b96700caab3e8f881f0d7d4" FOREIGN KEY ("enrolledUserId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "driving_training_record_entity" ADD CONSTRAINT "FK_dd48652ca1888293492cd1497d4" FOREIGN KEY ("enrollmentRecordId") REFERENCES "enrollment_record_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "driving_training_record_entity" DROP CONSTRAINT "FK_dd48652ca1888293492cd1497d4"`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" DROP CONSTRAINT "FK_89c1b96700caab3e8f881f0d7d4"`);
        await queryRunner.query(`ALTER TABLE "driving_teoric_record_entity" DROP CONSTRAINT "FK_7bd49a0cc6775472c04002aa0a8"`);
        await queryRunner.query(`ALTER TABLE "driving_training_daily_log_entity" DROP COLUMN "mileageEnd"`);
        await queryRunner.query(`ALTER TABLE "driving_training_daily_log_entity" DROP COLUMN "mileageStart"`);
        await queryRunner.query(`DROP TABLE "license_category_entity"`);
        await queryRunner.query(`DROP TABLE "vehicles_entity"`);
        await queryRunner.query(`DROP TABLE "enrollment_record_entity"`);
        await queryRunner.query(`DROP TABLE "driving_teoric_record_entity"`);
        await queryRunner.query(`DROP TABLE "courses_entity"`);
        await queryRunner.query(`ALTER TABLE "driving_training_record_entity" RENAME COLUMN "enrollmentRecordId" TO "participantId"`);
        await queryRunner.query(`ALTER TABLE "driving_training_record_entity" ADD CONSTRAINT "FK_eef02f8ae418833067a7c425f59" FOREIGN KEY ("participantId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
