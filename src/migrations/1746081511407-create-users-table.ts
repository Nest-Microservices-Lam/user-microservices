import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1746081511407 implements MigrationInterface {
    name = 'CreateUsersTable1746081511407'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying(255) NOT NULL, "idCard" character varying(20) NOT NULL, "dateBirth" date, "intentionVote" character varying(40) NOT NULL DEFAULT 'otro', "department" character varying(100) NOT NULL, "municipalitie" character varying(100) NOT NULL, "zona" integer, "votingPlace" character varying(50), "table" integer, "address" character varying(50), "permission_role" jsonb NOT NULL, "phone" character varying(20), "email" character varying(255), "password" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "created_by_user_id" uuid, CONSTRAINT "UQ_5fd7a73d3d447bcaf5b900a9a7a" UNIQUE ("idCard"), CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE INDEX "fullName_index" ON "users" ("fullName") `);
        await queryRunner.query(`CREATE INDEX "idCard_index" ON "users" ("idCard") `);
        await queryRunner.query(`CREATE INDEX "IDX_c162e1fe9d744b0721daea3b1c" ON "users" ("department") `);
        await queryRunner.query(`CREATE INDEX "IDX_0432c1124d45e0e76b4cad1d14" ON "users" ("municipalitie") `);
        await queryRunner.query(`CREATE INDEX "IDX_aea2d3ed0159a82963da79a153" ON "users" ("zona") `);
        await queryRunner.query(`CREATE INDEX "IDX_6bf03b1d2ea84a4207685921af" ON "users" ("votingPlace") `);
        await queryRunner.query(`CREATE INDEX "phone_index" ON "users" ("phone") `);
        await queryRunner.query(`CREATE INDEX "email_index" ON "users" ("email") `);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_3402191df44bc05c18c1cbbdc92" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_3402191df44bc05c18c1cbbdc92"`);
        await queryRunner.query(`DROP INDEX "public"."email_index"`);
        await queryRunner.query(`DROP INDEX "public"."phone_index"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6bf03b1d2ea84a4207685921af"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_aea2d3ed0159a82963da79a153"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0432c1124d45e0e76b4cad1d14"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c162e1fe9d744b0721daea3b1c"`);
        await queryRunner.query(`DROP INDEX "public"."idCard_index"`);
        await queryRunner.query(`DROP INDEX "public"."fullName_index"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
