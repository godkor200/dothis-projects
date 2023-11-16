import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1697187949781 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE user ALTER COLUMN agree_promotion SET DEFAULT false',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE user ALTER COLUMN agree_promotion DROP DEFAULT',
    );
  }
}
