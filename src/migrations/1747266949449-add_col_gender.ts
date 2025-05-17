import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColGender1747266949449 implements MigrationInterface {
    name = 'AddColGender1747266949449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "gender" character varying(20) DEFAULT 'masculino'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "gender"`);
    }

}
