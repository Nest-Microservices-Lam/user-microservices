import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTable1746769607927 implements MigrationInterface {
    name = 'UserTable1746769607927'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "permission_role"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "permission_role" jsonb NOT NULL`);
    }

}
