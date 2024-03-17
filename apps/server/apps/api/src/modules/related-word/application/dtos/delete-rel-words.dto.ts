export class DeleteRelWordsCommandDto {
  constructor(
    public readonly id: string,
    public readonly deleteRelWords: Array<string>,
  ) {}
}
