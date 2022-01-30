import {MigrationInterface, QueryRunner} from "typeorm";

export class SetNullablePassword1643493338845 implements MigrationInterface {
    name = 'SetNullablePassword1643493338845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`);
    }

}
