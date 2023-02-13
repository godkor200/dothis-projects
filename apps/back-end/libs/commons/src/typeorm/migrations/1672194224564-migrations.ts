import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1672194224564 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    'alter table userChannelData modify channel_id varchar(100) not null;';
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
