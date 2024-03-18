import { IQuery } from '@nestjs/cqrs';

export class FindDicTermQuery implements IQuery {
  readonly key: string;
  constructor(options: FindDicTermQuery) {
    Object.assign(this, options);
  }
}
