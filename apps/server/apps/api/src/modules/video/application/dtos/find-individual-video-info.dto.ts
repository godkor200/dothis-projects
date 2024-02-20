import { IQuery } from '@nestjs/cqrs';

export class FindIndividualVideoInfoV1Dto implements IQuery {
  readonly videoId: string;

  readonly clusterNumber: string;

  constructor(props: FindIndividualVideoInfoV1Dto) {
    this.videoId = props.videoId;
    this.clusterNumber = props.clusterNumber;
  }
}

export enum PredictionStatus {
  INSUFFICIENT_DATA = 'INSUFFICIENT_DATA',
  PREDICTING = 'PREDICTING',
}
