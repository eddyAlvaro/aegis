import { MigrationInterface, QueryRunner } from "typeorm";

export class BaseTable1750663104510 implements MigrationInterface {
    name = 'BaseTable1750663104510'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "status" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."role_entity_type_enum" AS ENUM('PLATFORM', 'ORGANIZATION')`);
        await queryRunner.query(`CREATE TYPE "public"."role_entity_status_enum" AS ENUM('ACTIVE', 'INACTIVE')`);
        await queryRunner.query(`CREATE TABLE "role_entity" ("id" text NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "type" "public"."role_entity_type_enum" NOT NULL DEFAULT 'ORGANIZATION', "isSystem" boolean NOT NULL, "grantIds" jsonb NOT NULL DEFAULT '[]', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "status" "public"."role_entity_status_enum" NOT NULL, "deletedAt" TIMESTAMP, CONSTRAINT "PK_7bc1bd2364b6e9bf7c84b1e52e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "driving_training_daily_log_entity" ("id" uuid NOT NULL, "initDate" TIMESTAMP, "endDate" TIMESTAMP, "mileageStart" character varying(50), "mileageEnd" character varying(50), "instructor" character varying(50), "drivingTrainingRecordId" uuid, CONSTRAINT "PK_6684c090cea77408eff267a729a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "driving_training_record_entity" ("id" uuid NOT NULL, "vehicleId" text, CONSTRAINT "PK_25168302442d900206036642d2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vehicles_entity" ("id" text NOT NULL, "plate_number" character varying NOT NULL, "category" character varying NOT NULL, "mileage" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying(50), "licenceCategoryId" text, CONSTRAINT "UQ_3a83082a85866cbd4f42c96e206" UNIQUE ("plate_number"), CONSTRAINT "PK_421ffdb466a4a18ef2fccb8079c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "license_category_entity" ("id" text NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_aa3b5c1b9a713fbb5fb453cff62" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "courses_entity" ("id" uuid NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "hours" integer NOT NULL, "position" integer NOT NULL, CONSTRAINT "PK_a07b88e4aaedb8cf09c79ba5cef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "driving_teoric_record_entity" ("id" uuid NOT NULL, "initDate" TIMESTAMP, "endDate" TIMESTAMP, "class" character varying(50), "instructor" character varying(50), "comments" character varying(150), "hours" integer, "enrollmentRecordId" uuid, CONSTRAINT "PK_d117cd5994e5e9139e99ecd1722" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "enrollment_record_entity" ("id" uuid NOT NULL, "status" character varying(50), "procedureType" character varying(50), "classStartDate" TIMESTAMP WITH TIME ZONE, "classEndDate" TIMESTAMP WITH TIME ZONE, "schedule" character varying(50), "shift" character varying(50), "occupation" character varying(50), "issueDate" TIMESTAMP WITH TIME ZONE, "score" character varying(50), "payrollNumber" character varying(50), "certificateNumber" character varying(50), "enrolledUserId" uuid, "desiredLicenseId" text, CONSTRAINT "PK_60c6310c29f249604ae5e6cfc7b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_entity_type_enum" AS ENUM('SUPER_ADMIN', 'PLATFORM_ADMIN', 'PLATFORM_USER', 'ORGANIZATION_ADMIN', 'ORGANIZATION_USER', 'PARTICIPANT')`);
        await queryRunner.query(`CREATE TYPE "public"."user_entity_status_enum" AS ENUM('SUSPENDED', 'ACTIVE', 'BLOCKED', 'NOT_VERIFIED')`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" uuid NOT NULL, "email" character varying NOT NULL, "password" character varying, "firstName" character varying, "lastName" character varying, "commonName" character varying NOT NULL DEFAULT '', "documentIdentifier" character varying(50) NOT NULL, "phoneNumber" character varying(50) NOT NULL, "currentLicense" character varying(50), "type" "public"."user_entity_type_enum" NOT NULL, "status" "public"."user_entity_status_enum" NOT NULL, "birthDate" date, "loginAttempts" integer NOT NULL DEFAULT '0', "lastResetPasswordDelivery" TIMESTAMP WITH TIME ZONE, "passwordUpdatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "passwordExpirationNotifiedAt" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "connectedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
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
        await queryRunner.query(`CREATE TABLE "license_category_entity_courses_courses_entity" ("licenseCategoryEntityId" text NOT NULL, "coursesEntityId" uuid NOT NULL, CONSTRAINT "PK_ac43a53b743953c370c1f08c6b6" PRIMARY KEY ("licenseCategoryEntityId", "coursesEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_03486144ef94f269bdad726d7a" ON "license_category_entity_courses_courses_entity" ("licenseCategoryEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0dbe2fad3b36c67405dc739139" ON "license_category_entity_courses_courses_entity" ("coursesEntityId") `);
        await queryRunner.query(`CREATE TABLE "driving_teoric_record_entity_courses_courses_entity" ("drivingTeoricRecordEntityId" uuid NOT NULL, "coursesEntityId" uuid NOT NULL, CONSTRAINT "PK_05ee2f00d3b624ba125f958ab9c" PRIMARY KEY ("drivingTeoricRecordEntityId", "coursesEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1ed6967b1687e379a103d8db5a" ON "driving_teoric_record_entity_courses_courses_entity" ("drivingTeoricRecordEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3410f36f7c5d37f2cc38c8c0c8" ON "driving_teoric_record_entity_courses_courses_entity" ("coursesEntityId") `);
        await queryRunner.query(`ALTER TABLE "driving_training_daily_log_entity" ADD CONSTRAINT "FK_08230934e3cea53201c63de82ec" FOREIGN KEY ("drivingTrainingRecordId") REFERENCES "driving_training_record_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "driving_training_record_entity" ADD CONSTRAINT "FK_798861c4d971b3bf8d5d278006b" FOREIGN KEY ("vehicleId") REFERENCES "vehicles_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicles_entity" ADD CONSTRAINT "FK_8fe3722a569c294c75e52bc6541" FOREIGN KEY ("licenceCategoryId") REFERENCES "license_category_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "driving_teoric_record_entity" ADD CONSTRAINT "FK_7bd49a0cc6775472c04002aa0a8" FOREIGN KEY ("enrollmentRecordId") REFERENCES "enrollment_record_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" ADD CONSTRAINT "FK_89c1b96700caab3e8f881f0d7d4" FOREIGN KEY ("enrolledUserId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" ADD CONSTRAINT "FK_0a4774f22209a729ed08d3e7174" FOREIGN KEY ("desiredLicenseId") REFERENCES "license_category_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_entity_users_user_entity" ADD CONSTRAINT "FK_71bc9edd8f7fe2cd3702f45a6ed" FOREIGN KEY ("roleEntityId") REFERENCES "role_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_entity_users_user_entity" ADD CONSTRAINT "FK_42cf3453eccbf7f761b3468253f" FOREIGN KEY ("userEntityId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "license_category_entity_courses_courses_entity" ADD CONSTRAINT "FK_03486144ef94f269bdad726d7ab" FOREIGN KEY ("licenseCategoryEntityId") REFERENCES "license_category_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "license_category_entity_courses_courses_entity" ADD CONSTRAINT "FK_0dbe2fad3b36c67405dc7391396" FOREIGN KEY ("coursesEntityId") REFERENCES "courses_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "driving_teoric_record_entity_courses_courses_entity" ADD CONSTRAINT "FK_1ed6967b1687e379a103d8db5ad" FOREIGN KEY ("drivingTeoricRecordEntityId") REFERENCES "driving_teoric_record_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "driving_teoric_record_entity_courses_courses_entity" ADD CONSTRAINT "FK_3410f36f7c5d37f2cc38c8c0c84" FOREIGN KEY ("coursesEntityId") REFERENCES "courses_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "driving_teoric_record_entity_courses_courses_entity" DROP CONSTRAINT "FK_3410f36f7c5d37f2cc38c8c0c84"`);
        await queryRunner.query(`ALTER TABLE "driving_teoric_record_entity_courses_courses_entity" DROP CONSTRAINT "FK_1ed6967b1687e379a103d8db5ad"`);
        await queryRunner.query(`ALTER TABLE "license_category_entity_courses_courses_entity" DROP CONSTRAINT "FK_0dbe2fad3b36c67405dc7391396"`);
        await queryRunner.query(`ALTER TABLE "license_category_entity_courses_courses_entity" DROP CONSTRAINT "FK_03486144ef94f269bdad726d7ab"`);
        await queryRunner.query(`ALTER TABLE "role_entity_users_user_entity" DROP CONSTRAINT "FK_42cf3453eccbf7f761b3468253f"`);
        await queryRunner.query(`ALTER TABLE "role_entity_users_user_entity" DROP CONSTRAINT "FK_71bc9edd8f7fe2cd3702f45a6ed"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" DROP CONSTRAINT "FK_0a4774f22209a729ed08d3e7174"`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" DROP CONSTRAINT "FK_89c1b96700caab3e8f881f0d7d4"`);
        await queryRunner.query(`ALTER TABLE "driving_teoric_record_entity" DROP CONSTRAINT "FK_7bd49a0cc6775472c04002aa0a8"`);
        await queryRunner.query(`ALTER TABLE "vehicles_entity" DROP CONSTRAINT "FK_8fe3722a569c294c75e52bc6541"`);
        await queryRunner.query(`ALTER TABLE "driving_training_record_entity" DROP CONSTRAINT "FK_798861c4d971b3bf8d5d278006b"`);
        await queryRunner.query(`ALTER TABLE "driving_training_daily_log_entity" DROP CONSTRAINT "FK_08230934e3cea53201c63de82ec"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3410f36f7c5d37f2cc38c8c0c8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1ed6967b1687e379a103d8db5a"`);
        await queryRunner.query(`DROP TABLE "driving_teoric_record_entity_courses_courses_entity"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0dbe2fad3b36c67405dc739139"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_03486144ef94f269bdad726d7a"`);
        await queryRunner.query(`DROP TABLE "license_category_entity_courses_courses_entity"`);
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
        await queryRunner.query(`DROP TABLE "enrollment_record_entity"`);
        await queryRunner.query(`DROP TABLE "driving_teoric_record_entity"`);
        await queryRunner.query(`DROP TABLE "courses_entity"`);
        await queryRunner.query(`DROP TABLE "license_category_entity"`);
        await queryRunner.query(`DROP TABLE "vehicles_entity"`);
        await queryRunner.query(`DROP TABLE "driving_training_record_entity"`);
        await queryRunner.query(`DROP TABLE "driving_training_daily_log_entity"`);
        await queryRunner.query(`DROP TABLE "role_entity"`);
        await queryRunner.query(`DROP TYPE "public"."role_entity_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."role_entity_type_enum"`);
        await queryRunner.query(`DROP TABLE "status"`);
    }

}
