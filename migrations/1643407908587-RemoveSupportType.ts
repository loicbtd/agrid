import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveSupportType1643407908587 implements MigrationInterface {
    name = 'RemoveSupportType1643407908587'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plan" DROP CONSTRAINT "FK_ec88191407b2d967f69f83ee20b"`);
        await queryRunner.query(`ALTER TABLE "plan" DROP COLUMN "supportTypeId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plan" ADD "supportTypeId" uuid`);
        await queryRunner.query(`ALTER TABLE "plan" ADD CONSTRAINT "FK_ec88191407b2d967f69f83ee20b" FOREIGN KEY ("supportTypeId") REFERENCES "support_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
