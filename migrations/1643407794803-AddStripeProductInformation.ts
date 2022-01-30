import {MigrationInterface, QueryRunner} from "typeorm";

export class AddStripeProductInformation1643407794803 implements MigrationInterface {
    name = 'AddStripeProductInformation1643407794803'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plan" ADD "stripeProductId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "plan" ADD "stripeProductPriceId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "plan" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "plan" ADD "price" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plan" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "plan" ADD "price" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "plan" DROP COLUMN "stripeProductPriceId"`);
        await queryRunner.query(`ALTER TABLE "plan" DROP COLUMN "stripeProductId"`);
    }

}
