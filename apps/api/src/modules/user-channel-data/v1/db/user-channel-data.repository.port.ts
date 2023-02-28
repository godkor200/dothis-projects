import { RepositoryPort } from '@Libs/commons/src/ddd/repository.port';
import { UserChannelData } from '@Apps/config/database/domain/userChannelData/UserChannelData.entity';

export interface UserChannelDataRepositoryPort
  extends RepositoryPort<UserChannelData> {
  findOneByUserId(userId: string): Promise<UserChannelData>;
}
