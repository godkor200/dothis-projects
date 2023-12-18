import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserMembershipRelationship1702868285322
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE membership
            ADD CONSTRAINT fk_membership_user
            FOREIGN KEY (user_id)
            REFERENCES user (user_id)
            ON DELETE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE membership
            DROP CONSTRAINT fk_membership_user
        `);
  }
}
