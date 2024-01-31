import { RepositoryPort } from '@Libs/commons/src';
import { ReferenceEntity } from '@Apps/modules/story-board/domain/entities/reference.entity';
import { PostReferenceDao } from '@Apps/modules/story-board/domain/daos/reference.dao';

export interface ReferenceOutboundPort extends RepositoryPort<ReferenceEntity> {
  create(props: PostReferenceDao): Promise<ReferenceEntity>;
}
