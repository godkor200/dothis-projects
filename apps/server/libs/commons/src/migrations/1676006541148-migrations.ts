import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1676006541148 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `alter table user modify user_email varchar(100) null`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
