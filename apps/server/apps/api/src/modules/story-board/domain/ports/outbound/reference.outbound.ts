import { RepositoryPort } from '@Libs/commons';
import { ReferenceEntity } from '@Apps/modules/story-board/domain/entities/reference.entity';
import { PostReferenceDao } from '@Apps/modules/story-board/infrastructure/daos/reference.dao';

export interface ReferenceOutboundPort extends RepositoryPort<ReferenceEntity> {
  create(props: PostReferenceDao): Promise<ReferenceEntity>;
}
