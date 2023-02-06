import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1675315097351 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'alter table UserChannelData add channel_id varchar(100) null',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
