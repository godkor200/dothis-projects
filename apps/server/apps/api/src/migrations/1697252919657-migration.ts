import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1697252919657 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "UPDATE user SET agree_promotion = (CASE WHEN agree_promotion = 'true' THEN true ELSE false END)",
    ),
      await queryRunner.query(
        'alter table user modify agree_promotion TINYINT not null default 0',
      );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE user modify agree_promotion TYPE varchar',
    );
  }
}
