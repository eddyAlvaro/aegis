import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeEnrollment1751759549958 implements MigrationInterface {
    name = 'ChangeEnrollment1751759549958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" ADD "drivingTrainingRecordId" uuid`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" ADD CONSTRAINT "UQ_e56557a0a92271b57196e14bcf9" UNIQUE ("drivingTrainingRecordId")`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" ADD CONSTRAINT "FK_e56557a0a92271b57196e14bcf9" FOREIGN KEY ("drivingTrainingRecordId") REFERENCES "driving_training_record_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" DROP CONSTRAINT "FK_e56557a0a92271b57196e14bcf9"`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" DROP CONSTRAINT "UQ_e56557a0a92271b57196e14bcf9"`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" DROP COLUMN "drivingTrainingRecordId"`);
    }

}
