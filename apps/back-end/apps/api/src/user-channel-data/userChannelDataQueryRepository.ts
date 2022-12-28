import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { UserChannelData } from '@Libs/entity/src/domain/userChannelData/UserChannelData.entity';

export class UserChannelQueryRepository extends Repository<UserChannelData> {
  async findUserName(userId: number) {
    const row = await this.findOneByUserId(userId);
    return row;
  }

  private async findOneByUserId(userId: number) {
    // return await queryBuilder.getRawOne();
  }
}
