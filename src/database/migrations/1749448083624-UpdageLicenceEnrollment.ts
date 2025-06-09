import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdageLicenceEnrollment1749448083624 implements MigrationInterface {
    name = 'UpdageLicenceEnrollment1749448083624'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" DROP CONSTRAINT "FK_cd11a317bd4dabf2180ef49453f"`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" RENAME COLUMN "desiredLicenceId" TO "desiredLicenseId"`);
        await queryRunner.query(`ALTER TABLE "driving_teoric_record_entity" DROP COLUMN "initDate"`);
        await queryRunner.query(`ALTER TABLE "driving_teoric_record_entity" ADD "initDate" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "driving_teoric_record_entity" DROP COLUMN "endDate"`);
        await queryRunner.query(`ALTER TABLE "driving_teoric_record_entity" ADD "endDate" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" DROP COLUMN "desiredLicenseId"`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" ADD "desiredLicenseId" text`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" ADD CONSTRAINT "FK_0a4774f22209a729ed08d3e7174" FOREIGN KEY ("desiredLicenseId") REFERENCES "license_category_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" DROP CONSTRAINT "FK_0a4774f22209a729ed08d3e7174"`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" DROP COLUMN "desiredLicenseId"`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" ADD "desiredLicenseId" uuid`);
        await queryRunner.query(`ALTER TABLE "driving_teoric_record_entity" DROP COLUMN "endDate"`);
        await queryRunner.query(`ALTER TABLE "driving_teoric_record_entity" ADD "endDate" date`);
        await queryRunner.query(`ALTER TABLE "driving_teoric_record_entity" DROP COLUMN "initDate"`);
        await queryRunner.query(`ALTER TABLE "driving_teoric_record_entity" ADD "initDate" date`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" RENAME COLUMN "desiredLicenseId" TO "desiredLicenceId"`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" ADD CONSTRAINT "FK_cd11a317bd4dabf2180ef49453f" FOREIGN KEY ("desiredLicenceId") REFERENCES "driving_teoric_record_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
