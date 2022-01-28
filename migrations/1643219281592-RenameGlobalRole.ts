import {MigrationInterface, QueryRunner} from "typeorm";

export class RenameGlobalRole1643219281592 implements MigrationInterface {
    name = 'RenameGlobalRole1643219281592'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "global_role_of_user" RENAME COLUMN "role" TO "globalRole"`);
        await queryRunner.query(`ALTER TYPE "public"."global_role_of_user_role_enum" RENAME TO "global_role_of_user_globalrole_enum"`);
        await queryRunner.query(`ALTER TABLE "global_role_of_user" ALTER COLUMN "globalRole" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "global_role_of_user" ALTER COLUMN "globalRole" SET DEFAULT 'User'`);
        await queryRunner.query(`ALTER TYPE "public"."global_role_of_user_globalrole_enum" RENAME TO "global_role_of_user_role_enum"`);
        await queryRunner.query(`ALTER TABLE "global_role_of_user" RENAME COLUMN "globalRole" TO "role"`);
    }

}
