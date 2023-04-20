import { AwsAthenaService } from '@Apps/common/aws/service/aws.athena.service';
import { ConfigService } from '@nestjs/config';
import { VideoServicePort } from './video.service.port';
import { InternalServerErrorException } from '@nestjs/common';
import { AthenaExpress } from 'athena-express';

export class VideoService
  extends AwsAthenaService<{ video_id: string }>
  implements VideoServicePort
{
  protected athenaClient: AthenaExpress<{ video_id: string }>;

  constructor(configService: ConfigService) {
    super(configService);
  }
  async findManyVideo(tag: string): Promise<any[]> {
    const query = `SELECT video_id FROM dothis.video WHERE (video_title like '%${tag}%' or video_title like '${tag}%' or video_title like '%${tag}' or video_tag like '%${tag}%' or video_tag like '${tag}%' or video_tag like '%${tag}')`;
    try {
      const res = await this.athenaClient.query(query);
      return res.Items.map((e) => e.video_id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
