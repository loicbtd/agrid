import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnStripeCustomerIdToUser1643494812312 implements MigrationInterface {
    name = 'AddColumnStripeCustomerIdToUser1643494812312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "stripeCustomerId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "stripeCustomerId"`);
    }

}
