import {MigrationInterface, QueryRunner} from "typeorm";

export class AddEntitesDate1642668445443 implements MigrationInterface {
    name = 'AddEntitesDate1642668445443'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
    }

}
