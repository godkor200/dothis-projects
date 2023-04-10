import { RepositoryPort } from '@Libs/commons/src/ddd/repository.port';
import { UserChannelData } from '@Apps/config/database/domain/entities/userChannelData/userChannelData.entity';

export interface UserChannelDataRepositoryPort
  extends RepositoryPort<UserChannelData> {
  findOneByUserId(userId: string): Promise<UserChannelData>;
}
