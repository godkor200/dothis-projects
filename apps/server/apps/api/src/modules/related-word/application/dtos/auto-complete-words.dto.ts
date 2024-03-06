export class UpdateAutoCompleteWordsCommandDto {
  constructor(props: UpdateAutoCompleteWordsCommandDto) {}
}

export class FindAutoCompleteWordsCommandDto {
  words: string;
  constructor(props: FindAutoCompleteWordsCommandDto) {
    this.words = props.words;
  }
}
