import { IQueryResult } from '@nestjs/cqrs';

export class FindDicTermRes implements IQueryResult {
  constructor(readonly dicTerm: Readonly<Record<string, string>>) {}
}
