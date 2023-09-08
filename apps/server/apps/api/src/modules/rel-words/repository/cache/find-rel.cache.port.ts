export interface FindRelCachePort {
  findOneRelWord(keyword: string): Promise<string>;

  setAutoCompleteWord(words: string[]): Promise<boolean>;

  findAutoCompleteWords(words: string): Promise<any>;
}
