import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { Err, Ok } from 'oxide.ts';
import { ExternalAiServerError } from '@Apps/modules/related-word/domain/errors/related-words.errors';
import { getApiResponse } from '@Libs/types';
import {
  GetChannelAutocompleteOutboundPort,
  GetChannelAutocompleteOutboundPortRes,
} from '@Apps/modules/channel/domain/ports/get-auto-channel.outbound.port';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';

export interface ChannelData {
  channel_title: string;
  channel_thumbnail: string;
  channel_description: string | null; // Allows null if description is missing
  channel_handler: string;
  channel_subscribers: number;
}

@Injectable()
export class GetAutoChannelNameAdapter
  implements GetChannelAutocompleteOutboundPort
{
  constructor(private readonly httpService: HttpService) {}
  private readonly url: string =
    'https://vc2nqcxgphxrixcizq2jfqdsei0mytqt.lambda-url.ap-northeast-2.on.aws/';

  async execute(
    search: string,
  ): Promise<GetChannelAutocompleteOutboundPortRes> {
    try {
      const response = await lastValueFrom(
        this.httpService.post<getApiResponse<ChannelData[]>>(
          this.url + 'related_channel',
          { keyword: search },
        ),
      );

      if (response.status === 200) {
        const validatedData = response.data;

        return Ok(validatedData.data);
      } else {
        if (
          response.data.code === 500 &&
          response.data.message === 'No contents'
        ) {
          return Err(new ChannelNotFoundError());
        }
        return Err(new ExternalAiServerError());
      }
    } catch (error) {
      return Err(new ExternalAiServerError(error.message));
    }
  }
}
