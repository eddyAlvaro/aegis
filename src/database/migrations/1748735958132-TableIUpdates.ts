import { MigrationInterface, QueryRunner } from "typeorm";

export class TableIUpdates1748735958132 implements MigrationInterface {
    name = 'TableIUpdates1748735958132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "license_category_entity" RENAME COLUMN "category" TO "name"`);
        await queryRunner.query(`CREATE TABLE "license_category_entity_courses_courses_entity" ("licenseCategoryEntityId" text NOT NULL, "coursesEntityId" uuid NOT NULL, CONSTRAINT "PK_ac43a53b743953c370c1f08c6b6" PRIMARY KEY ("licenseCategoryEntityId", "coursesEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_03486144ef94f269bdad726d7a" ON "license_category_entity_courses_courses_entity" ("licenseCategoryEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0dbe2fad3b36c67405dc739139" ON "license_category_entity_courses_courses_entity" ("coursesEntityId") `);
        await queryRunner.query(`CREATE TABLE "driving_teoric_record_entity_courses_courses_entity" ("drivingTeoricRecordEntityId" uuid NOT NULL, "coursesEntityId" uuid NOT NULL, CONSTRAINT "PK_05ee2f00d3b624ba125f958ab9c" PRIMARY KEY ("drivingTeoricRecordEntityId", "coursesEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1ed6967b1687e379a103d8db5a" ON "driving_teoric_record_entity_courses_courses_entity" ("drivingTeoricRecordEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3410f36f7c5d37f2cc38c8c0c8" ON "driving_teoric_record_entity_courses_courses_entity" ("coursesEntityId") `);
        await queryRunner.query(`ALTER TABLE "courses_entity" DROP COLUMN "category"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "classEndDate"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "classStartDate"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "desiredLicense"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "suspensionReason"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "occupation"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "course"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "issueDate"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "shift"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "days"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "schedule"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "procedureType"`);
        await queryRunner.query(`ALTER TABLE "courses_entity" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "courses_entity" ADD "position" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" ADD "procedureType" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" ADD "classStartDate" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" ADD "classEndDate" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" ADD "schedule" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" ADD "shift" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" ADD "occupation" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" ADD "issueDate" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" ADD "score" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" ADD "certificateNumber" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" ADD "desiredLicenceId" uuid`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" ADD CONSTRAINT "FK_cd11a317bd4dabf2180ef49453f" FOREIGN KEY ("desiredLicenceId") REFERENCES "driving_teoric_record_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
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
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" DROP CONSTRAINT "FK_cd11a317bd4dabf2180ef49453f"`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" DROP COLUMN "desiredLicenceId"`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" DROP COLUMN "certificateNumber"`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" DROP COLUMN "score"`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" DROP COLUMN "issueDate"`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" DROP COLUMN "occupation"`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" DROP COLUMN "shift"`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" DROP COLUMN "schedule"`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" DROP COLUMN "classEndDate"`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" DROP COLUMN "classStartDate"`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" DROP COLUMN "procedureType"`);
        await queryRunner.query(`ALTER TABLE "courses_entity" DROP COLUMN "position"`);
        await queryRunner.query(`ALTER TABLE "courses_entity" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "procedureType" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "schedule" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "days" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "shift" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "issueDate" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "course" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "occupation" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "suspensionReason" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "desiredLicense" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "classStartDate" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "classEndDate" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "courses_entity" ADD "category" character varying NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3410f36f7c5d37f2cc38c8c0c8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1ed6967b1687e379a103d8db5a"`);
        await queryRunner.query(`DROP TABLE "driving_teoric_record_entity_courses_courses_entity"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0dbe2fad3b36c67405dc739139"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_03486144ef94f269bdad726d7a"`);
        await queryRunner.query(`DROP TABLE "license_category_entity_courses_courses_entity"`);
        await queryRunner.query(`ALTER TABLE "license_category_entity" RENAME COLUMN "name" TO "category"`);
    }

}
