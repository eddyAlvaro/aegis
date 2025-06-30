import { MigrationInterface, QueryRunner } from "typeorm";

export class CredentialTable1750886367686 implements MigrationInterface {
    name = 'CredentialTable1750886367686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "password_reset_token_entity" ("id" text NOT NULL, "token" character varying NOT NULL, "used" boolean NOT NULL DEFAULT false, "expiresAt" TIMESTAMP NOT NULL, "userId" uuid, CONSTRAINT "UQ_f65cbdba07a863514b9c6d678a5" UNIQUE ("token"), CONSTRAINT "PK_6e44372654725cce46fe5fc8877" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "password_reset_token_entity" ADD CONSTRAINT "FK_4a0222f5f5b306cce0277c3b16a" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "password_reset_token_entity" DROP CONSTRAINT "FK_4a0222f5f5b306cce0277c3b16a"`);
        await queryRunner.query(`DROP TABLE "password_reset_token_entity"`);
    }

}
