import { GetChannelAutocompleteOutboundPort } from '@Apps/modules/channel/domain/ports/get-auto-channel.outbound.port';
import { Inject } from '@nestjs/common';
import {
  AUTO_CHANNEL_NAME_DI_TOKEN,
  CHANNEL_DATA_BY_ELEMENT_DI_TOKEN,
  CHANNEL_INFO_ADAPTER_DI_TOKEN,
} from '@Apps/modules/channel/channel.di-token';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetChannelNameAutocompleteDto } from '@Apps/modules/channel/application/dtos/channel-name-auto-complete.dto';
import { Err, Ok, Result } from 'oxide.ts';
import { TChannelNameAutocompleteResponse } from '@dothis/dto';
import { ExternalAiServerError } from '@Apps/modules/related-word/domain/errors/related-words.errors';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';
import { ChannelInfoOutboundPort } from '@Apps/modules/channel/domain/ports/channel-info.outbound.port';
import { ChannelDataByElementPort } from '@Apps/modules/channel/domain/ports/channel_data_by_element.port';

export type TGetChannelNameAutocompleteResult = Result<
  TChannelNameAutocompleteResponse[],
  ExternalAiServerError | ChannelNotFoundError
>;
@QueryHandler(GetChannelNameAutocompleteDto)
export class GetAutoCompleteChannelNameService
  implements
    IQueryHandler<
      GetChannelNameAutocompleteDto,
      TGetChannelNameAutocompleteResult
    >
{
  constructor(
    @Inject(AUTO_CHANNEL_NAME_DI_TOKEN)
    private readonly getChannelAutocompleteAdapter: GetChannelAutocompleteOutboundPort,

    @Inject(CHANNEL_DATA_BY_ELEMENT_DI_TOKEN)
    private readonly channelDataByElementAdapter: ChannelDataByElementPort,
  ) {}

  async execute(
    dto: GetChannelNameAutocompleteDto,
  ): Promise<TGetChannelNameAutocompleteResult> {
    try {
      const resp = await this.getChannelAutocompleteAdapter.execute(
        dto.channelName,
      );

      if (resp.isOk()) {
        const respUnwrap = resp.unwrap();
        const channelIndex = respUnwrap.map((e) => e.channel_title);
        const channelInfo = await this.channelDataByElementAdapter.execute({
          element: channelIndex,
        });
        const channelInfoUnwrap = channelInfo.unwrap();
        const result = respUnwrap.map((e) => {
          const channelMatch = channelInfoUnwrap.find(
            (source) => source.channelName === e.channel_title,
          );
          return {
            channelId: channelMatch ? channelMatch.channelId : null,
            thumbnail: e.channel_thumbnail,
            channelName: e.channel_title,
            subscriberCount: e.channel_subscribers,
          };
        });

        return Ok(result);
      }
      return Err(resp.unwrapErr());
    } catch (err) {
      return Err(err);
    }
  }
}
