export interface VideoServicePort {
  findManyVideo(tag: string): Promise<string[]>;
}
