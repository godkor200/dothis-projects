import { zWord } from '@dothis/dto';
import { extendApi } from '@anatine/zod-openapi';
import { createZodDto } from '@anatine/zod-nestjs';

export class UpdateAutoCompleteWordsCommandDto {
  constructor(props: UpdateAutoCompleteWordsCommandDto) {}
}

export class FindAutoCompleteWordsCommandDto {
  words: string;
  constructor(props: FindAutoCompleteWordsCommandDto) {
    this.words = props.words;
  }
}

/**
 * 스코어 증가
 */

export class WordBody extends createZodDto(extendApi(zWord)) {
  constructor(props: WordBody) {
    super();
  }
}
export class incrementScoreWordsDto {
  word: string;
  constructor(props: WordBody) {
    this.word = props.word;
  }
}
