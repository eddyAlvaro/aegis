import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeTrainingLog1751767695087 implements MigrationInterface {
    name = 'ChangeTrainingLog1751767695087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "driving_training_daily_log_entity" ADD "drivingCircuit" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "driving_training_daily_log_entity" ADD "courseId" uuid`);
        await queryRunner.query(`ALTER TABLE "driving_training_daily_log_entity" ADD CONSTRAINT "FK_38a0d0cb6b15015951f56144668" FOREIGN KEY ("courseId") REFERENCES "courses_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "driving_training_daily_log_entity" DROP CONSTRAINT "FK_38a0d0cb6b15015951f56144668"`);
        await queryRunner.query(`ALTER TABLE "driving_training_daily_log_entity" DROP COLUMN "courseId"`);
        await queryRunner.query(`ALTER TABLE "driving_training_daily_log_entity" DROP COLUMN "drivingCircuit"`);
    }

}
