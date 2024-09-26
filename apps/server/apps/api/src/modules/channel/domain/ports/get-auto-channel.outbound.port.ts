// 결과 타입 정의
import { ExternalAiServerError } from '@Apps/modules/related-word/domain/errors/related-words.errors';
import { Result } from 'oxide.ts';
import { ChannelData } from '@Apps/modules/channel/infrastucture/adapters/get-auto-channel-name.adapter';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';

export type GetChannelAutocompleteOutboundPortRes = Result<
  ChannelData[],
  ExternalAiServerError | ChannelNotFoundError
>;

// 아웃바운드 포트 인터페이스 정의
export interface GetChannelAutocompleteOutboundPort {
  execute(partialName: string): Promise<GetChannelAutocompleteOutboundPortRes>;
}
