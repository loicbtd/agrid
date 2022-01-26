import {MigrationInterface, QueryRunner} from "typeorm";

export class PersistGlobalRolesForUser1643204646152 implements MigrationInterface {
    name = 'PersistGlobalRolesForUser1643204646152'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "global_role_of_user" ("userId" uuid NOT NULL, "rightId" uuid NOT NULL, CONSTRAINT "PK_8ddbeefc2ce823739b6c02d7e38" PRIMARY KEY ("userId", "rightId"))`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "rights"`);
        await queryRunner.query(`DROP TYPE "public"."user_rights_enum"`);
        await queryRunner.query(`ALTER TABLE "global_role_of_user" ADD CONSTRAINT "FK_826ccec18214e538641cb56c747" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "global_role_of_user" ADD CONSTRAINT "FK_df8d93ad386e485126e2416b2f8" FOREIGN KEY ("rightId") REFERENCES "plan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "global_role_of_user" DROP CONSTRAINT "FK_df8d93ad386e485126e2416b2f8"`);
        await queryRunner.query(`ALTER TABLE "global_role_of_user" DROP CONSTRAINT "FK_826ccec18214e538641cb56c747"`);
        await queryRunner.query(`CREATE TYPE "public"."user_rights_enum" AS ENUM('Administrate')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "rights" "public"."user_rights_enum" array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`DROP TABLE "global_role_of_user"`);
    }

}
