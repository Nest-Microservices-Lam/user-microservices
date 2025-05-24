import { MigrationInterface, QueryRunner } from "typeorm";

export class CambioNombreColmna1748104622287 implements MigrationInterface {
    name = 'CambioNombreColmna1748104622287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "table" TO "tableNumber"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "tableNumber" TO "table"`);
    }

}
