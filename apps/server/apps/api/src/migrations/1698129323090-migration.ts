import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class migration1698129323090 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'isEnvLocal',
        type: 'boolean',
        default: false, // 기본값 설정
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'isEnvLocal');
  }
}
