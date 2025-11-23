import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1763865162675 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "user" (
      "id" VARCHAR(21) PRIMARY KEY UNIQUE NOT NULL,
      "username" VARCHAR(20) UNIQUE NOT NULL,
      "password" VARCHAR NOT NULL
    );`);

    await queryRunner.query(`CREATE TABLE "user_profile" (
      "user_id" VARCHAR(21) PRIMARY KEY UNIQUE NOT NULL,
      "display_name" VARCHAR(255),
      "summary" TEXT,
      FOREIGN KEY ("user_id") REFERENCES "user"("id")
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "user_profile";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "user";`);
  }
}
