import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeMigrations16721326442371111 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `new_dothis`.`userChannelData` CHANGE COLUMN `channel_id` `channel_id` VARCHAR(20) NOT NULL , CHANGE COLUMN `channel_views` `channel_views` INT(255) NULL DEFAULT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
