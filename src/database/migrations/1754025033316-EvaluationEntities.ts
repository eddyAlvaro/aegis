import { MigrationInterface, QueryRunner } from "typeorm";

export class EvaluationEntities1754025033316 implements MigrationInterface {
    name = 'EvaluationEntities1754025033316'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "driving_evalutation_entity" ("id" uuid NOT NULL, "drivingSkillScore" double precision, "parkingSkillScore" double precision, "trafficRulesApplicationScore" double precision, "finalScore" double precision, CONSTRAINT "PK_845efc94d4157661cb2e701b2b1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teoric_evalutation_entity" ("id" uuid NOT NULL, "examScore" double precision, "generalCourseScore" double precision, "specificCourseScore" double precision, "finalScore" double precision, CONSTRAINT "PK_2b6cba5919b7b223687a4ba1ea7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" ADD "drivingEvaluationId" uuid`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" ADD CONSTRAINT "UQ_75d0651abaf1de31d709445df0b" UNIQUE ("drivingEvaluationId")`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" ADD "teoricEvaluationId" uuid`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" ADD CONSTRAINT "UQ_72755567634ea61a4edbc6d4183" UNIQUE ("teoricEvaluationId")`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" ADD CONSTRAINT "FK_75d0651abaf1de31d709445df0b" FOREIGN KEY ("drivingEvaluationId") REFERENCES "driving_evalutation_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" ADD CONSTRAINT "FK_72755567634ea61a4edbc6d4183" FOREIGN KEY ("teoricEvaluationId") REFERENCES "teoric_evalutation_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" DROP CONSTRAINT "FK_72755567634ea61a4edbc6d4183"`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" DROP CONSTRAINT "FK_75d0651abaf1de31d709445df0b"`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" DROP CONSTRAINT "UQ_72755567634ea61a4edbc6d4183"`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" DROP COLUMN "teoricEvaluationId"`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" DROP CONSTRAINT "UQ_75d0651abaf1de31d709445df0b"`);
        await queryRunner.query(`ALTER TABLE "enrollment_record_entity" DROP COLUMN "drivingEvaluationId"`);
        await queryRunner.query(`DROP TABLE "teoric_evalutation_entity"`);
        await queryRunner.query(`DROP TABLE "driving_evalutation_entity"`);
    }

}
