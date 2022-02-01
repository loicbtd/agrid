import {MigrationInterface, QueryRunner} from "typeorm";

export class FixRoleOfUser1643216407036 implements MigrationInterface {
    name = 'FixRoleOfUser1643216407036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."global_role_of_user_role_enum" AS ENUM('Administrator', 'User')`);
        await queryRunner.query(`CREATE TABLE "global_role_of_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" "public"."global_role_of_user_role_enum" NOT NULL DEFAULT 'User', "userId" uuid, CONSTRAINT "PK_4a4a0bde3acd74c54f813964a7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "global_role_of_user" ADD CONSTRAINT "FK_826ccec18214e538641cb56c747" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "global_role_of_user" DROP CONSTRAINT "FK_826ccec18214e538641cb56c747"`);
        await queryRunner.query(`DROP TABLE "global_role_of_user"`);
        await queryRunner.query(`DROP TYPE "public"."global_role_of_user_role_enum"`);
    }

}
