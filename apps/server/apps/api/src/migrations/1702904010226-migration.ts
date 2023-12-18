import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1702904010226 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE membership MODIFY COLUMN sub_end DATE NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE membership MODIFY COLUMN sub_end DATE NOT NULL',
    );
  }
}
