import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRolTable1746831575693 implements MigrationInterface {
    name = 'AddRolTable1746831575693'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "rol" character varying(20)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "rol"`);
    }

}
