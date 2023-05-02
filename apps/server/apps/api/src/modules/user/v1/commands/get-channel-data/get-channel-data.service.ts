import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ChannelDataRepositoryPort } from 'apps/api/src/modules/channel/repository/db/channel-data.repository.port';
import { CHANNEL_DATA_REPOSITORY } from 'apps/api/src/modules/channel/constants/channel-data.di-token.constants';
import { GetChannelDataCommandDto } from 'apps/api/src/modules/user/v1/commands/get-channel-data/get-channel-data.command.dto';
import { google } from 'googleapis';

@CommandHandler(GetChannelDataCommandDto)
export class GetChannelDataCommandHandler
  implements ICommandHandler<GetChannelDataCommandDto>
{
  constructor(
    @Inject(CHANNEL_DATA_REPOSITORY)
    protected readonly channelDataRepo: ChannelDataRepositoryPort,
  ) {}
  async execute(command: GetChannelDataCommandDto) {
    const youtube = google.youtube('v3');

    if (!youtube)
      throw new HttpException(
        'Google accessToken or apikey is weird',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    const res = await youtube.channels.list({
      access_token: command.accessToken,
      auth: process.env.GOOGLE_APIKEY,
      part: [
        'id',
        'snippet',
        'brandingSettings',
        'contentDetails',
        'statistics',
        'topicDetails',
      ],
      mine: true,
    });

    if (res.status !== 200)
      throw new HttpException(
        'Google server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    const { id: channelId } = res.data.items[0];
    //TODO: 추후 api로 가져온 태그 담는 컬럼도 필요함
    await this.channelDataRepo.updateOne({
      id: channelId,
      userId: command.userId,
    });
    //TODO: 추후 api로 가져온 태그 담는 컬럼도 필요함

    return await this.channelDataRepo.findOneById(channelId);
  }
}
