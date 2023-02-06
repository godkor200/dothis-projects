import { MigrationInterface, QueryRunner } from 'typeorm';

export class deleteAcesstokenColunm1671083280549 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(
    //   // 'ALTER TABLE `new_dothis`.`user` DROP COLUMN `token_access`, DROP COLUMN `token_expires`, DROP COLUMN `token_id`',
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
