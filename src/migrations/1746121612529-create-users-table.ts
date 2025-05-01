import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1746121612529 implements MigrationInterface {
    name = 'CreateUsersTable1746121612529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_c162e1fe9d744b0721daea3b1c"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "department" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "municipalitie" DROP NOT NULL`);
        await queryRunner.query(`CREATE INDEX "department_index" ON "users" ("department") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."department_index"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "municipalitie" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "department" SET NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_c162e1fe9d744b0721daea3b1c" ON "users" ("department") `);
    }

}
