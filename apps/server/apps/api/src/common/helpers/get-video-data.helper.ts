import { Ok, Err, Result } from 'oxide.ts';
import { GetRelatedWordOutboundPort } from '@Apps/modules/related-word/domain/ports/find-related-word.outbound.port';
import { ExternalAiServerError } from '@Apps/modules/related-word/domain/errors/related-words.errors';
import { AiRelatedWordsResult } from '@Apps/modules/related-word/infrastructure/adapters/get-related-word.adapter';

export async function fetchRelateWords(
  getRelatedWordAdapter: GetRelatedWordOutboundPort,
  search: string,
) {
  const keywordInfoResult = await getRelatedWordAdapter.execute(search);

  if (keywordInfoResult.isErr()) {
    return Err(keywordInfoResult.unwrapErr());
  }

  const keywordInfo = keywordInfoResult.unwrap();

  return Ok(keywordInfo);
}

export class KeywordServiceHelper {
  static async getRelateWords(
    getRelatedWordAdapter: GetRelatedWordOutboundPort,
    search: string,
  ): Promise<Result<AiRelatedWordsResult[] | null, ExternalAiServerError>> {
    return await fetchRelateWords(getRelatedWordAdapter, search);
  }
}
