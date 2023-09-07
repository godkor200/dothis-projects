import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1693980690505 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE related_words ADD COLUMN cluster TEXT;`,
    );
    await queryRunner.query(
      `ALTER TABLE user ADD COLUMN personalization_tag VARCHAR(255);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE related_words DROP COLUMN cluster;`);
    await queryRunner.query(
      `ALTER TABLE user DROP COLUMN personalization_tag;`,
    );
  }
}
