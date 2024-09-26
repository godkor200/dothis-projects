import { GetChannelAutocompleteOutboundPort } from '@Apps/modules/channel/domain/ports/get-auto-channel.outbound.port';
import { Inject } from '@nestjs/common';
import { AUTO_CHANNEL_NAME_DI_TOKEN } from '@Apps/modules/channel/channel.di-token';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetChannelNameAutocompleteDto } from '@Apps/modules/channel/application/dtos/channel-name-auto-complete.dto';
import { Err, Ok, Result } from 'oxide.ts';
import { TChannelNameAutocompleteResponse } from '@dothis/dto';
import { ExternalAiServerError } from '@Apps/modules/related-word/domain/errors/related-words.errors';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';

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
    private readonly getChannelAutocompleteService: GetChannelAutocompleteOutboundPort,
  ) {}

  async execute(
    dto: GetChannelNameAutocompleteDto,
  ): Promise<TGetChannelNameAutocompleteResult> {
    try {
      const resp = await this.getChannelAutocompleteService.execute(
        dto.channelName,
      );
      if (resp.isOk()) {
        const result = resp.unwrap().map((e) => ({
          thumbnail: e.channel_thumbnail,
          channelName: e.channel_title,
          subscriberCount: e.channel_subscribers,
        }));

        return Ok(result);
      }
      return Err(resp.unwrapErr());
    } catch (err) {
      return Err(err);
    }
  }
}
