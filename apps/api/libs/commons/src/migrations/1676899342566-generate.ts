import { MigrationInterface, QueryRunner } from 'typeorm';

export class generate1676899342566 implements MigrationInterface {
  name = 'generate1676899342566';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`membership\` DROP FOREIGN KEY \`FK_channel_to_subscribe_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`user_channel_channel_id_fk\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`daily_views\` DROP FOREIGN KEY \`FK_views_to_channel\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`daily_views\` DROP FOREIGN KEY \`FK_views_to_video\``,
    );
    await queryRunner.query(
      `DROP INDEX \`FK_user_TO_UserChannelData_1\` ON \`UserChannelData\``,
    );
    await queryRunner.query(
      `DROP INDEX \`FK_channel_to_subscribe_id_idx\` ON \`membership\``,
    );
    await queryRunner.query(
      `DROP INDEX \`channel_channel_id_index\` ON \`channel\``,
    );
    await queryRunner.query(`DROP INDEX \`id\` ON \`channel\``);
    await queryRunner.query(`DROP INDEX \`channel_id\` ON \`user\``);
    await queryRunner.query(`DROP INDEX \`channel_id_2\` ON \`user\``);
    await queryRunner.query(
      `DROP INDEX \`FK_views_to_channel_idx\` ON \`daily_views\``,
    );
    await queryRunner.query(
      `DROP INDEX \`FK_views_to_video_idx\` ON \`daily_views\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`video\` (\`id\` int NOT NULL AUTO_INCREMENT, \`channel_index\` int NOT NULL, \`video_title\` varchar(255) NOT NULL, \`video_url\` varchar(255) NOT NULL, \`video_description\` varchar(255) NOT NULL, \`video_duration\` int NOT NULL, \`video_published\` varchar(255) NOT NULL, \`video_views\` varchar(255) NOT NULL, \`video_likes\` int NOT NULL, \`video_tags\` varchar(255) NOT NULL, \`video_category\` varchar(255) NOT NULL, \`video_info_card\` varchar(255) NOT NULL, \`video_with_ads\` varchar(255) NOT NULL, \`video_end_screen\` varchar(255) NOT NULL, \`video_core_keyword\` varchar(255) NOT NULL, \`video_average_views\` int NOT NULL, \`video_timestamp\` datetime NOT NULL, \`channelIndex\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`membership\` DROP COLUMN \`channel_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`membership\` ADD \`userId\` int NULL`,
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
    await queryRunner.query(`ALTER TABLE \`membership\` DROP PRIMARY KEY`);
    await queryRunner.query(`ALTER TABLE \`membership\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`membership\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`membership\` CHANGE \`user_id\` \`user_id\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`membership\` CHANGE \`sub_price\` \`sub_price\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`membership\` CHANGE \`sub_status\` \`sub_status\` tinyint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`membership\` DROP COLUMN \`sub_start\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`membership\` ADD \`sub_start\` datetime NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`membership\` DROP COLUMN \`sub_end\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`membership\` ADD \`sub_end\` datetime NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`membership\` DROP COLUMN \`update_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`membership\` ADD \`update_at\` datetime NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`membership\` DROP COLUMN \`created_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`membership\` ADD \`created_at\` datetime NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`channel\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`channel\` DROP COLUMN \`channel_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`channel\` ADD \`channel_id\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`channel\` DROP COLUMN \`channel_name\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`channel\` ADD \`channel_name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`channel\` CHANGE \`url\` \`url\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`channel\` CHANGE \`subscriber\` \`subscriber\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`channel\` DROP COLUMN \`description\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`channel\` ADD \`description\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`channel\` DROP COLUMN \`since\``);
    await queryRunner.query(
      `ALTER TABLE \`channel\` ADD \`since\` datetime NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`channel\` DROP COLUMN \`total_views\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`channel\` ADD \`total_views\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`channel\` CHANGE \`total_videos\` \`total_videos\` int NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`channel\` DROP COLUMN \`country\``);
    await queryRunner.query(
      `ALTER TABLE \`channel\` ADD \`country\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`channel\` DROP COLUMN \`link\``);
    await queryRunner.query(
      `ALTER TABLE \`channel\` ADD \`link\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`channel\` CHANGE \`keyword\` \`keyword\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`channel\` CHANGE \`total_normal_videos\` \`total_normal_videos\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`channel\` CHANGE \`tag\` \`tag\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`user_email\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`user_email\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`channel_id\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`channel_id\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP COLUMN \`token_refresh\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`token_refresh\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP COLUMN \`agree_promotion\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`agree_promotion\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`plan\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`plan\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`is_admin\` \`is_admin\` tinyint NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`status\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`status\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP COLUMN \`date_sign_in\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`date_sign_in\` datetime NOT NULL`,
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
      `ALTER TABLE \`UserChannelData\` ADD CONSTRAINT \`FK_066861949fbb9f716c03caec4da\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`membership\` ADD CONSTRAINT \`FK_eef2d9d9c70cd13bed868afedf4\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`channel\` ADD CONSTRAINT \`FK_161c95ba32beeb8aa68267b54ae\` FOREIGN KEY (\`channel_id\`) REFERENCES \`user\`(\`channel_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`video\` ADD CONSTRAINT \`FK_0817747efedb00deef1aa24efc7\` FOREIGN KEY (\`channelIndex\`) REFERENCES \`channel\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE \`channel\` DROP FOREIGN KEY \`FK_161c95ba32beeb8aa68267b54ae\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`membership\` DROP FOREIGN KEY \`FK_eef2d9d9c70cd13bed868afedf4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`UserChannelData\` DROP FOREIGN KEY \`FK_066861949fbb9f716c03caec4da\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`daily_views\` DROP COLUMN \`video_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`daily_views\` ADD \`video_id\` varchar(45) CHARACTER SET "utf8mb3" COLLATE "utf8_general_ci" NOT NULL`,
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
      `ALTER TABLE \`user\` DROP COLUMN \`date_sign_in\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`date_sign_in\` timestamp NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`status\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`status\` char(10) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`is_admin\` \`is_admin\` tinyint NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`plan\``);
    await queryRunner.query(`ALTER TABLE \`user\` ADD \`plan\` char(10) NULL`);
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP COLUMN \`agree_promotion\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`agree_promotion\` char(10) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP COLUMN \`token_refresh\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`token_refresh\` varchar(220) NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`channel_id\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`channel_id\` varchar(100) NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`user_email\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`user_email\` varchar(100) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`id\` \`id\` int UNSIGNED NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`channel\` CHANGE \`tag\` \`tag\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`channel\` CHANGE \`total_normal_videos\` \`total_normal_videos\` int NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`channel\` CHANGE \`keyword\` \`keyword\` varchar(255) NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`channel\` DROP COLUMN \`link\``);
    await queryRunner.query(`ALTER TABLE \`channel\` ADD \`link\` text NULL`);
    await queryRunner.query(`ALTER TABLE \`channel\` DROP COLUMN \`country\``);
    await queryRunner.query(
      `ALTER TABLE \`channel\` ADD \`country\` varchar(30) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`channel\` CHANGE \`total_videos\` \`total_videos\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`channel\` DROP COLUMN \`total_views\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`channel\` ADD \`total_views\` bigint NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`channel\` DROP COLUMN \`since\``);
    await queryRunner.query(
      `ALTER TABLE \`channel\` ADD \`since\` varchar(30) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`channel\` DROP COLUMN \`description\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`channel\` ADD \`description\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`channel\` CHANGE \`subscriber\` \`subscriber\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`channel\` CHANGE \`url\` \`url\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`channel\` DROP COLUMN \`channel_name\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`channel\` ADD \`channel_name\` varchar(100) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`channel\` DROP COLUMN \`channel_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`channel\` ADD \`channel_id\` varchar(100) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`channel\` CHANGE \`id\` \`id\` int UNSIGNED NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`membership\` DROP COLUMN \`created_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`membership\` ADD \`created_at\` timestamp NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`membership\` DROP COLUMN \`update_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`membership\` ADD \`update_at\` timestamp NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`membership\` DROP COLUMN \`sub_end\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`membership\` ADD \`sub_end\` timestamp NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`membership\` DROP COLUMN \`sub_start\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`membership\` ADD \`sub_start\` timestamp NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`membership\` CHANGE \`sub_status\` \`sub_status\` tinyint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`membership\` CHANGE \`sub_price\` \`sub_price\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`membership\` CHANGE \`user_id\` \`user_id\` int UNSIGNED NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`membership\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`membership\` ADD \`id\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`membership\` ADD PRIMARY KEY (\`id\`)`,
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
    await queryRunner.query(
      `ALTER TABLE \`membership\` DROP COLUMN \`userId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`membership\` ADD \`channel_id\` int UNSIGNED NULL`,
    );
    await queryRunner.query(`DROP TABLE \`video\``);
    await queryRunner.query(
      `CREATE INDEX \`FK_views_to_video_idx\` ON \`daily_views\` (\`video_id\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`FK_views_to_channel_idx\` ON \`daily_views\` (\`channel_index\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`channel_id_2\` ON \`user\` (\`channel_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`channel_id\` ON \`user\` (\`channel_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`id\` ON \`channel\` (\`id\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`channel_channel_id_index\` ON \`channel\` (\`channel_id\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`FK_channel_to_subscribe_id_idx\` ON \`membership\` (\`channel_id\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`FK_user_TO_UserChannelData_1\` ON \`UserChannelData\` (\`user_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`daily_views\` ADD CONSTRAINT \`FK_views_to_video\` FOREIGN KEY (\`video_id\`) REFERENCES \`videos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`daily_views\` ADD CONSTRAINT \`FK_views_to_channel\` FOREIGN KEY (\`channel_index\`) REFERENCES \`channel\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`user_channel_channel_id_fk\` FOREIGN KEY (\`channel_id\`) REFERENCES \`channel\`(\`channel_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`membership\` ADD CONSTRAINT \`FK_channel_to_subscribe_id\` FOREIGN KEY (\`channel_id\`) REFERENCES \`channel\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
