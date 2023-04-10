import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { UserChannelDataRepositoryPort } from '@Apps/modules/user-channel-data/v1/db/user-channel-data.repository.port';
import { UserChannelData } from '@Apps/config/database/domain/entities/UserChannelData/UserChannelData.entity';
import { ChannelDataRepositoryPort } from '@Apps/modules/channel/db/channel-data.repository.port';
import { USER_CHANNEL_DATA_REPOSITORY } from '@Apps/modules/user-channel-data/user-channel-data.di-token';
import { CHANNEL_DATA_REPOSITORY } from '@Apps/modules/channel/constants/channel-data.di-token.constants';
import { GetChannelDataCommandDto } from '@Apps/modules/user/v1/commands/get-channel-data/get-channel-data.command.dto';
import { google } from 'googleapis';

@CommandHandler(GetChannelDataCommandDto)
export class GetChannelDataCommandHandler
  implements ICommandHandler<GetChannelDataCommandDto>
{
  constructor(
    @Inject(USER_CHANNEL_DATA_REPOSITORY)
    protected readonly userChannnelDataRepo: UserChannelDataRepositoryPort,

    @Inject(CHANNEL_DATA_REPOSITORY)
    protected readonly channelDataRepo: ChannelDataRepositoryPort,
  ) {}
  async execute(command: GetChannelDataCommandDto) {
    const conflictCheck = await this.userChannnelDataRepo.findOneByUserId(
      command.userId,
    );

    if (conflictCheck) throw new HttpException('conflict', HttpStatus.CONFLICT);

    const youtube = google.youtube('v3');

    if (!youtube)
      throw new HttpException(
        'Google accessToken or apikey is weird',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    const res = await youtube.channels.list({
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
        'google server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    const { id: channelId } = res.data.items[0];

    const { channelName, subscriber, keyword } =
      await this.channelDataRepo.findOneByChannelId(channelId);

    const newUserChannelData = new UserChannelData(
      channelId,
      Number(command.userId),
      channelName,
      undefined,
      subscriber,
      undefined,
      keyword,
    );

    return await this.userChannnelDataRepo.insert(newUserChannelData);
  }
}
