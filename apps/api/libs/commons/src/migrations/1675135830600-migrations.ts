import { MigrationInterface, QueryRunner } from 'typeorm';

export class addChannelId1675135830600 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'alter table channel add channel_id varchar(100) not null',
    );
    await queryRunner.query(
      'alter table channel add total_normal_videos int default 0',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
