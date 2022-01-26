import {MigrationInterface, QueryRunner} from "typeorm";

export class DatabaseStructureInitialization1639406623395 implements MigrationInterface {
    name = 'DatabaseStructureInitialization1639406623395'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "company_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_b21e9ab8361b2fcc85e6c4f4fa7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "latitude" double precision, "longitude" double precision, "companyTypeId" uuid, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "support_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_40c60faee4ebf95dce7c3a369e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "plan" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" double precision NOT NULL, "supportTypeId" uuid, CONSTRAINT "PK_54a2b686aed3b637654bf7ddbb3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "service" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_85a21558c006647cd76fdce044b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "service_included_in_plan" ("serviceId" uuid NOT NULL, "planId" uuid NOT NULL, CONSTRAINT "PK_2c6c12b7769a17950384fb3fe63" PRIMARY KEY ("serviceId", "planId"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "rights" "public"."user_rights_enum" array NOT NULL DEFAULT '{}', "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "companyId" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subscription" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creationDate" TIMESTAMP NOT NULL, "renewalDate" TIMESTAMP NOT NULL, "renewalCount" integer NOT NULL, "userId" uuid, "planId" uuid, CONSTRAINT "PK_8c3e00ebd02103caa1174cd5d9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_37552f955f40c7423baa07355e9" FOREIGN KEY ("companyTypeId") REFERENCES "company_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "plan" ADD CONSTRAINT "FK_ec88191407b2d967f69f83ee20b" FOREIGN KEY ("supportTypeId") REFERENCES "support_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_included_in_plan" ADD CONSTRAINT "FK_50c41e22413bdab3f37c756b491" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_included_in_plan" ADD CONSTRAINT "FK_3bbb5ca9d8f42247a97e8acf131" FOREIGN KEY ("planId") REFERENCES "plan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_86586021a26d1180b0968f98502" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_cc906b4bc892b048f1b654d2aa0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_6b6d0e4dc88105a4a11103dd2cd" FOREIGN KEY ("planId") REFERENCES "plan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_6b6d0e4dc88105a4a11103dd2cd"`);
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_cc906b4bc892b048f1b654d2aa0"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_86586021a26d1180b0968f98502"`);
        await queryRunner.query(`ALTER TABLE "service_included_in_plan" DROP CONSTRAINT "FK_3bbb5ca9d8f42247a97e8acf131"`);
        await queryRunner.query(`ALTER TABLE "service_included_in_plan" DROP CONSTRAINT "FK_50c41e22413bdab3f37c756b491"`);
        await queryRunner.query(`ALTER TABLE "plan" DROP CONSTRAINT "FK_ec88191407b2d967f69f83ee20b"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_37552f955f40c7423baa07355e9"`);
        await queryRunner.query(`DROP TABLE "subscription"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "service_included_in_plan"`);
        await queryRunner.query(`DROP TABLE "service"`);
        await queryRunner.query(`DROP TABLE "plan"`);
        await queryRunner.query(`DROP TABLE "support_type"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "company_type"`);
    }

}
