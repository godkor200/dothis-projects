import { FindAccumulateQuery } from '@Apps/modules/video/dtos/find-accumulate-videos.dtos';

export class FindVideosDao extends FindAccumulateQuery {
  readonly cluster: string;
  constructor(props: FindVideosDao) {
    super(props);
  }
}
