import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnsToSubscription1643506831450 implements MigrationInterface {
    name = 'AddColumnsToSubscription1643506831450'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscription" DROP COLUMN "creationDate"`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD "stripeSubscriptionId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD "active" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscription" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "subscription" DROP COLUMN "stripeSubscriptionId"`);
        await queryRunner.query(`ALTER TABLE "subscription" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "subscription" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD "creationDate" TIMESTAMP NOT NULL`);
    }

}
