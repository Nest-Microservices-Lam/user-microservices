import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1746072759767 implements MigrationInterface {
  name = 'CreateUsersTable1746072759767';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "usuarios" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying(255) NOT NULL, "idCard" character varying(20) NOT NULL, "created_by_user_id" text, "dateBirth" date, "intentionVote" character varying(40) NOT NULL DEFAULT 'otro', "department" character varying(100) NOT NULL, "municipalitie" character varying(100) NOT NULL, "zona" integer, "position" character varying(50), "table" integer, "address" character varying(50), "permission_role" jsonb NOT NULL, "phone" character varying(20), "email" character varying(255), "password" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_f64d96ba6269b6aa0ad2ebb585a" UNIQUE ("idCard"), CONSTRAINT "UQ_2514d37d064085405337e3cf0b7" UNIQUE ("phone"), CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "PK_c1806a0df4e7affbc10e2f3618b" PRIMARY KEY ("userId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "fullName_index" ON "usuarios" ("fullName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idCard_index" ON "usuarios" ("idCard") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_258bea420dd94cab99fcd4b690" ON "usuarios" ("department") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e2ba5ed1ba46899f7bf77e64d5" ON "usuarios" ("municipalitie") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5a2d8b5ee2ff3aa74edf3cb75a" ON "usuarios" ("zona") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_be90d439f229e8a199597da4c7" ON "usuarios" ("position") `,
    );
    await queryRunner.query(
      `CREATE INDEX "phone_index" ON "usuarios" ("phone") `,
    );
    await queryRunner.query(
      `CREATE INDEX "email_index" ON "usuarios" ("email") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."email_index"`);
    await queryRunner.query(`DROP INDEX "public"."phone_index"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_be90d439f229e8a199597da4c7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5a2d8b5ee2ff3aa74edf3cb75a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e2ba5ed1ba46899f7bf77e64d5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_258bea420dd94cab99fcd4b690"`,
    );
    await queryRunner.query(`DROP INDEX "public"."idCard_index"`);
    await queryRunner.query(`DROP INDEX "public"."fullName_index"`);
    await queryRunner.query(`DROP TABLE "usuarios"`);
  }
}
