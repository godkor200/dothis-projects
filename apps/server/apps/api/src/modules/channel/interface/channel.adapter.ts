import { FindKeywordByUserResponseDto } from '@Apps/modules/channel/interface/find-keyword-byUser.response.dto';

export interface ChannelAdapter {
  findChannelTagOrKeyword: (
    channelId: string,
  ) => Promise<FindKeywordByUserResponseDto>;
}
