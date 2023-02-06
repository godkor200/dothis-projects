import { MigrationInterface, QueryRunner } from 'typeorm';
import { migrations1674099525331 } from '@Libs/commons/src/typeorm/migrations/1674099525331-idChangeMigrations';

export class migrationsAddTagKeyword1674811473433
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`alter table channel add tag varchar(255) null`);
    // await queryRunner.query(
    //   `alter table channel add keyword varchar(255) null`,
    // );
    // alter table channel
    // change channel_url url varchar(100) null;
    /**
     alter table channel
     change channel_subscriber subscriber int null;
     alter table channel
     change channel_description description text null;
     alter table channel
     change channel_since since varchar(30) null;
     alter table channel
     change channel_total_views total_views bigint null;
     alter table channel
     change channel_total_videos total_videos int null;
     alter table channel
     change channel_tag tag varchar(255) null;

     alter table channel
     change channel_country country varchar(30) null;
     alter table channel
     change channel_link link text null;
     alter table channel
     change channel_keyword keyword varchar(255) null;
     **/
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
