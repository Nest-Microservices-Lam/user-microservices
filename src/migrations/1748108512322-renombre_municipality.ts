import { MigrationInterface, QueryRunner } from "typeorm";

export class RenombreMunicipality1748108512322 implements MigrationInterface {
    name = 'RenombreMunicipality1748108512322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_0432c1124d45e0e76b4cad1d14"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "municipalitie" TO "municipality"`);
        await queryRunner.query(`CREATE INDEX "IDX_b755133752a90674f5a963c9e6" ON "users" ("municipality") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_b755133752a90674f5a963c9e6"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "municipality" TO "municipalitie"`);
        await queryRunner.query(`CREATE INDEX "IDX_0432c1124d45e0e76b4cad1d14" ON "users" ("municipalitie") `);
    }

}
