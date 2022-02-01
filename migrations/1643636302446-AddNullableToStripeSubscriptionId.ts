import {MigrationInterface, QueryRunner} from "typeorm";

export class AddNullableToStripeSubscriptionId1643636302446 implements MigrationInterface {
    name = 'AddNullableToStripeSubscriptionId1643636302446'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscription" ALTER COLUMN "stripeSubscriptionId" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscription" ALTER COLUMN "stripeSubscriptionId" SET NOT NULL`);
    }

}
