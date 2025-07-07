import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeIdVehicle1751755731515 implements MigrationInterface {
    name = 'ChangeIdVehicle1751755731515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "driving_training_record_entity" DROP CONSTRAINT "FK_798861c4d971b3bf8d5d278006b"`);
        await queryRunner.query(`ALTER TABLE "driving_training_record_entity" DROP COLUMN "vehicleId"`);
        await queryRunner.query(`ALTER TABLE "driving_training_record_entity" ADD "vehicleId" uuid`);
        await queryRunner.query(`ALTER TABLE "vehicles_entity" DROP CONSTRAINT "PK_421ffdb466a4a18ef2fccb8079c"`);
        await queryRunner.query(`ALTER TABLE "vehicles_entity" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "vehicles_entity" ADD "id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicles_entity" ADD CONSTRAINT "PK_421ffdb466a4a18ef2fccb8079c" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "driving_training_record_entity" ADD CONSTRAINT "FK_798861c4d971b3bf8d5d278006b" FOREIGN KEY ("vehicleId") REFERENCES "vehicles_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "driving_training_record_entity" DROP CONSTRAINT "FK_798861c4d971b3bf8d5d278006b"`);
        await queryRunner.query(`ALTER TABLE "vehicles_entity" DROP CONSTRAINT "PK_421ffdb466a4a18ef2fccb8079c"`);
        await queryRunner.query(`ALTER TABLE "vehicles_entity" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "vehicles_entity" ADD "id" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicles_entity" ADD CONSTRAINT "PK_421ffdb466a4a18ef2fccb8079c" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "driving_training_record_entity" DROP COLUMN "vehicleId"`);
        await queryRunner.query(`ALTER TABLE "driving_training_record_entity" ADD "vehicleId" text`);
        await queryRunner.query(`ALTER TABLE "driving_training_record_entity" ADD CONSTRAINT "FK_798861c4d971b3bf8d5d278006b" FOREIGN KEY ("vehicleId") REFERENCES "vehicles_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
