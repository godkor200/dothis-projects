import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1675138119019 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'alter table channel add total_normal_videos int default 0',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
