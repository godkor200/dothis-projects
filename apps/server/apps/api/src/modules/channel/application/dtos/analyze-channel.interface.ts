import { IQuery } from '@nestjs/cqrs';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { zChannelId } from '@dothis/dto/dist/src';

export class ChannelIdDto extends createZodDto(extendApi(zChannelId)) {
  constructor(props: ChannelIdDto) {
    super();
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
