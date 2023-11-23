import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1675927340467 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `alter table user modify channel_id varchar(100) null`,
    );

    await queryRunner.query(`alter table user add unique (channel_id)`);

    await queryRunner.query(
      `alter table user add constraint user_channel_channel_id_fk foreign key (channel_id) references channel (channel_id)`,
    );
    await queryRunner.query(`drop index user_id_UNIQUE on user`);

    await queryRunner.query(`drop index channel_id_2 on user;

    drop index channel_id_3 on user;

    drop index channel_id_4 on user;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`alter table channel drop column user_id`);
  }
}
