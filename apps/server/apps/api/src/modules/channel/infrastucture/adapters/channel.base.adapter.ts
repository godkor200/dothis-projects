import { ConfigService } from '@nestjs/config';

export class ChannelBaseAdapter {
  readonly channelColumns: string[] = [
    'CHANNEL_ID',
    'CHANNEL_NAME',
    'CHANNEL_DESCRIPTION',
    'CHANNEL_TAGS',
    'MAINLY_USED_KEYWORDS',
    'MAINLY_USED_TAGS',
    'CHANNEL_COUNTRY',
    'CHANNEL_LINK',
    'CHANNEL_SINCE',
    'CHANNEL_CLUSTER',
    'CRAWLED_DATE',
    'USER_ID',
  ];
}
