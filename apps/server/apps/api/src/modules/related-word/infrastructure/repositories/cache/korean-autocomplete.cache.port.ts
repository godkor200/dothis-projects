export interface KoreanAutocompleteCachePort {
  addWords(words: string[]): Promise<void>;

  search(query: string): Promise<string[]>;
}
