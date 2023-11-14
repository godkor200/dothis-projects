import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class migration1699258546059 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'search_word',
        type: 'varchar(255)',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'search_word');
  }
}
