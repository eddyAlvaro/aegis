import { MigrationInterface, QueryRunner } from "typeorm";

export class LicenceRelation1749096284016 implements MigrationInterface {
    name = 'LicenceRelation1749096284016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" DROP CONSTRAINT "FK_cd11a317bd4dabf2180ef49453f"`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" DROP COLUMN "desiredLicenceId"`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" ADD "desiredLicenceId" text`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" ADD CONSTRAINT "FK_cd11a317bd4dabf2180ef49453f" FOREIGN KEY ("desiredLicenceId") REFERENCES "license_category_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" DROP CONSTRAINT "FK_cd11a317bd4dabf2180ef49453f"`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" DROP COLUMN "desiredLicenceId"`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" ADD "desiredLicenceId" uuid`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" ADD CONSTRAINT "FK_cd11a317bd4dabf2180ef49453f" FOREIGN KEY ("desiredLicenceId") REFERENCES "driving_teoric_record_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
