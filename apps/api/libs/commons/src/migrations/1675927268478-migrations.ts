import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1675927268478 implements MigrationInterface {
  name = 'migrations1675927268478';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`UserChannelData\` DROP FOREIGN KEY \`FK_user_TO_UserChannelData_1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`subscribe\` DROP FOREIGN KEY \`fk_subscribe_user1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`daily_views\` DROP FOREIGN KEY \`fk_daily_views_videos1\``,
    );
    await queryRunner.query(`DROP INDEX \`id\` ON \`UserChannelData\``);
    await queryRunner.query(
      `DROP INDEX \`fk_subscribe_user1_idx\` ON \`subscribe\``,
    );
    await queryRunner.query(`DROP INDEX \`date\` ON \`daily_views\``);
    await queryRunner.query(
      `DROP INDEX \`fk_daily_views_videos1_idx\` ON \`daily_views\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`Channel\` (\`id\` int NOT NULL AUTO_INCREMENT, \`channel_id\` varchar(255) NOT NULL, \`user_id\` int NOT NULL, \`channel_name\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`subscriber\` int NOT NULL, \`description\` varchar(255) NOT NULL, \`since\` datetime NOT NULL, \`total_views\` int NOT NULL, \`total_videos\` int NOT NULL, \`country\` varchar(255) NOT NULL, \`link\` varchar(255) NOT NULL, \`keyword\` varchar(255) NOT NULL, \`total_normal_videos\` int NOT NULL, \`tag\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`User\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_email\` varchar(255) NOT NULL, \`channel_id\` int NOT NULL, \`token_refresh\` varchar(255) NOT NULL, \`agree_promotion\` varchar(255) NOT NULL, \`plan\` varchar(255) NOT NULL, \`is_admin\` tinyint NOT NULL, \`status\` varchar(255) NOT NULL, \`date_sign_in\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`video\` (\`id\` int NOT NULL AUTO_INCREMENT, \`channel_index\` int NOT NULL, \`video_title\` varchar(255) NOT NULL, \`video_url\` varchar(255) NOT NULL, \`video_description\` varchar(255) NOT NULL, \`video_duration\` int NOT NULL, \`video_published\` varchar(255) NOT NULL, \`video_views\` varchar(255) NOT NULL, \`video_likes\` int NOT NULL, \`video_tags\` varchar(255) NOT NULL, \`video_category\` varchar(255) NOT NULL, \`video_info_card\` varchar(255) NOT NULL, \`video_with_ads\` varchar(255) NOT NULL, \`video_end_screen\` varchar(255) NOT NULL, \`video_core_keyword\` varchar(255) NOT NULL, \`video_average_views\` int NOT NULL, \`video_timestamp\` datetime NOT NULL, \`channelIndex\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`subscribe\` ADD \`userId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`daily_views\` ADD \`videoId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`UserChannelData\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`UserChannelData\` DROP COLUMN \`channel_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`UserChannelData\` ADD \`channel_id\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`UserChannelData\` CHANGE \`user_id\` \`user_id\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`UserChannelData\` DROP COLUMN \`channel_name\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`UserChannelData\` ADD \`channel_name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`UserChannelData\` CHANGE \`channel_videos\` \`channel_videos\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`UserChannelData\` CHANGE \`channel_describer\` \`channel_describer\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`UserChannelData\` CHANGE \`channel_views\` \`channel_views\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`UserChannelData\` DROP COLUMN \`channel_keywords\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`UserChannelData\` ADD \`channel_keywords\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`UserChannelData\` DROP COLUMN \`channel_used_tags\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`UserChannelData\` ADD \`channel_used_tags\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`UserChannelData\` DROP COLUMN \`channel_tags\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`UserChannelData\` ADD \`channel_tags\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`subscribe\` DROP PRIMARY KEY`);
    await queryRunner.query(`ALTER TABLE \`subscribe\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`subscribe\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`subscribe\` CHANGE \`user_id\` \`user_id\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`subscribe\` CHANGE \`sub_price\` \`sub_price\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`subscribe\` CHANGE \`sub_status\` \`sub_status\` tinyint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`subscribe\` DROP COLUMN \`sub_start\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`subscribe\` ADD \`sub_start\` datetime NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`subscribe\` DROP COLUMN \`sub_end\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`subscribe\` ADD \`sub_end\` datetime NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`subscribe\` DROP COLUMN \`update_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`subscribe\` ADD \`update_at\` datetime NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`subscribe\` DROP COLUMN \`created_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`subscribe\` ADD \`created_at\` datetime NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`daily_views\` DROP PRIMARY KEY`);
    await queryRunner.query(`ALTER TABLE \`daily_views\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`daily_views\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`,
    );
    await queryRunner.query(`ALTER TABLE \`daily_views\` DROP COLUMN \`date\``);
    await queryRunner.query(
      `ALTER TABLE \`daily_views\` ADD \`date\` datetime NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`daily_views\` CHANGE \`views\` \`views\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`daily_views\` CHANGE \`channel_index\` \`channel_index\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`daily_views\` DROP COLUMN \`video_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`daily_views\` ADD \`video_id\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`UserChannelData\` ADD CONSTRAINT \`FK_066861949fbb9f716c03caec4da\` FOREIGN KEY (\`user_id\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`subscribe\` ADD CONSTRAINT \`FK_78138550e21d8b67790d761148d\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Channel\` ADD CONSTRAINT \`FK_27aed305e7e3969251bfa03b364\` FOREIGN KEY (\`user_id\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`video\` ADD CONSTRAINT \`FK_0817747efedb00deef1aa24efc7\` FOREIGN KEY (\`channelIndex\`) REFERENCES \`Channel\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`daily_views\` ADD CONSTRAINT \`FK_a56b5b7434feec040609897b2c7\` FOREIGN KEY (\`videoId\`) REFERENCES \`video\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`daily_views\` DROP FOREIGN KEY \`FK_a56b5b7434feec040609897b2c7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`video\` DROP FOREIGN KEY \`FK_0817747efedb00deef1aa24efc7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Channel\` DROP FOREIGN KEY \`FK_27aed305e7e3969251bfa03b364\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`subscribe\` DROP FOREIGN KEY \`FK_78138550e21d8b67790d761148d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`UserChannelData\` DROP FOREIGN KEY \`FK_066861949fbb9f716c03caec4da\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`daily_views\` DROP COLUMN \`video_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`daily_views\` ADD \`video_id\` varchar(45) CHARACTER SET "utf8mb3" COLLATE "utf8_bin" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`daily_views\` CHANGE \`channel_index\` \`channel_index\` int UNSIGNED NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`daily_views\` CHANGE \`views\` \`views\` int NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`daily_views\` DROP COLUMN \`date\``);
    await queryRunner.query(
      `ALTER TABLE \`daily_views\` ADD \`date\` date NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`daily_views\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`daily_views\` ADD \`id\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`daily_views\` ADD PRIMARY KEY (\`id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`subscribe\` DROP COLUMN \`created_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`subscribe\` ADD \`created_at\` timestamp NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`subscribe\` DROP COLUMN \`update_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`subscribe\` ADD \`update_at\` timestamp NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`subscribe\` DROP COLUMN \`sub_end\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`subscribe\` ADD \`sub_end\` timestamp NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`subscribe\` DROP COLUMN \`sub_start\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`subscribe\` ADD \`sub_start\` timestamp NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`subscribe\` CHANGE \`sub_status\` \`sub_status\` tinyint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`subscribe\` CHANGE \`sub_price\` \`sub_price\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`subscribe\` CHANGE \`user_id\` \`user_id\` int UNSIGNED NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`subscribe\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`subscribe\` ADD \`id\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`subscribe\` ADD PRIMARY KEY (\`id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`UserChannelData\` DROP COLUMN \`channel_tags\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`UserChannelData\` ADD \`channel_tags\` varchar(100) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`UserChannelData\` DROP COLUMN \`channel_used_tags\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`UserChannelData\` ADD \`channel_used_tags\` varchar(100) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`UserChannelData\` DROP COLUMN \`channel_keywords\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`UserChannelData\` ADD \`channel_keywords\` varchar(100) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`UserChannelData\` CHANGE \`channel_views\` \`channel_views\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`UserChannelData\` CHANGE \`channel_describer\` \`channel_describer\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`UserChannelData\` CHANGE \`channel_videos\` \`channel_videos\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`UserChannelData\` DROP COLUMN \`channel_name\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`UserChannelData\` ADD \`channel_name\` varchar(100) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`UserChannelData\` CHANGE \`user_id\` \`user_id\` int UNSIGNED NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`UserChannelData\` DROP COLUMN \`channel_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`UserChannelData\` ADD \`channel_id\` varchar(100) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`UserChannelData\` CHANGE \`id\` \`id\` int UNSIGNED NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`daily_views\` DROP COLUMN \`videoId\``,
    );
    await queryRunner.query(`ALTER TABLE \`subscribe\` DROP COLUMN \`userId\``);
    await queryRunner.query(`DROP TABLE \`video\``);
    await queryRunner.query(`DROP TABLE \`User\``);
    await queryRunner.query(`DROP TABLE \`Channel\``);
    await queryRunner.query(
      `CREATE INDEX \`fk_daily_views_videos1_idx\` ON \`daily_views\` (\`channel_index\`, \`video_id\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`date\` ON \`daily_views\` (\`date\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`fk_subscribe_user1_idx\` ON \`subscribe\` (\`user_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`id\` ON \`UserChannelData\` (\`id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`daily_views\` ADD CONSTRAINT \`fk_daily_views_videos1\` FOREIGN KEY (\`channel_index\`, \`video_id\`) REFERENCES \`videos\`(\`channel_index\`,\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`subscribe\` ADD CONSTRAINT \`fk_subscribe_user1\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`UserChannelData\` ADD CONSTRAINT \`FK_user_TO_UserChannelData_1\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
