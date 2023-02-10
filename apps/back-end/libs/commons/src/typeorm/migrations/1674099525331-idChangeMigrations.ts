import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1674099525331 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `alter table subscribe change sub_id id int not null`,
    );
    await queryRunner.query(
      `alter table channel change channel_index id int unsigned auto_increment`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
