import {
  GetRelatedWordOutboundPort,
  GetRelatedWordOutboundPortRes,
} from '@Apps/modules/related-word/domain/ports/find-related-word.outbound.port';
import { HttpService } from '@nestjs/axios';
import { getApiResponse } from '@Libs/types';
import { lastValueFrom } from 'rxjs';
import { Err, Ok } from 'oxide.ts';
import { Injectable } from '@nestjs/common';
import { ExternalAiServerError } from '@Apps/modules/related-word/domain/errors/related-words.errors';

/**
 * 외부 api를 통해 관련어를 불러옴
 */
export type AiRelatedWordsResult = {
  keyword: string;
  algorithm: number;
  score: number;
};
@Injectable()
export class GetRelatedWordAdapter implements GetRelatedWordOutboundPort {
  constructor(private readonly httpService: HttpService) {}
  private readonly url: string = 'http://dothis2.iptime.org:8003/';

  async execute(search: string): Promise<GetRelatedWordOutboundPortRes> {
    try {
      const response = await lastValueFrom(
        this.httpService.post<getApiResponse<AiRelatedWordsResult[]>>(
          this.url + 'nlp/related',
          {
            text: search,
          },
        ),
      );
      if (response.status === 200) {
        return Ok(response.data.data);
      }
    } catch (error) {
      return Err(new ExternalAiServerError());
    }
  }
}
