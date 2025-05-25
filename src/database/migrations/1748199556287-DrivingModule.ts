import { MigrationInterface, QueryRunner } from "typeorm";

export class DrivingModule1748199556287 implements MigrationInterface {
    name = 'DrivingModule1748199556287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "driving_training_record_entity" ("id" uuid NOT NULL, "participantId" uuid, CONSTRAINT "PK_25168302442d900206036642d2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "driving_training_daily_log_entity" ("id" uuid NOT NULL, "drivingTrainingRecordId" uuid, CONSTRAINT "PK_6684c090cea77408eff267a729a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "driving_training_record_entity" ADD CONSTRAINT "FK_eef02f8ae418833067a7c425f59" FOREIGN KEY ("participantId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "driving_training_daily_log_entity" ADD CONSTRAINT "FK_08230934e3cea53201c63de82ec" FOREIGN KEY ("drivingTrainingRecordId") REFERENCES "driving_training_record_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "driving_training_daily_log_entity" DROP CONSTRAINT "FK_08230934e3cea53201c63de82ec"`);
        await queryRunner.query(`ALTER TABLE "driving_training_record_entity" DROP CONSTRAINT "FK_eef02f8ae418833067a7c425f59"`);
        await queryRunner.query(`DROP TABLE "driving_training_daily_log_entity"`);
        await queryRunner.query(`DROP TABLE "driving_training_record_entity"`);
    }

}
