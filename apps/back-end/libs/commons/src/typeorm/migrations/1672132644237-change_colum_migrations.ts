import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeMigrations16721326442371111 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    'ALTER TABLE `new_dothis`.`UserChannelData` CHANGE COLUMN `channel_id` `channel_id` VARCHAR(20) NOT NULL , CHANGE COLUMN `channel_views` `channel_views` INT(1000000) NULL DEFAULT NULL;';
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
