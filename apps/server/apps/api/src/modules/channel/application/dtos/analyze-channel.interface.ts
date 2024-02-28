import { IQuery } from '@nestjs/cqrs';

export class AnalyzeChannelDto implements IQuery {
  channelId: string;
  constructor(props: AnalyzeChannelDto) {
    Object.assign(this, props);
  }
}

export interface ChannelInfoOs {
  channel_id: string;
  channel_name: string;
  channel_url: string;
  channel_description: string;
  channel_since: string;
  channel_country: string;
  channel_link: string;
  channel_cluster: number;
  channel_tags?: string;
  crawled_date: string;
  video_list: string[];
}
