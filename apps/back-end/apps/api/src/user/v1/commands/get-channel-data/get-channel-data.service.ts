import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { UserChannelDataRepositoryPort } from '@Apps/api/src/user-channel-data/v1/db/user-channel-data.repository.port';
import { google } from 'googleapis';
import { UserChannelData } from '@Apps/api/src/config/database/domain/userChannelData/UserChannelData.entity';
import { ChannelDataRepositoryPost } from '@Apps/api/src/channel/v1/db/channel-data.repository.post';
import { USER_CHANNEL_DATA_REPOSITORY } from '@Apps/api/src/user-channel-data/user-channel-data.di-token';
import { CHANNEL_DATA_REPOSITORY } from '@Apps/api/src/channel/channel-data.di-token';
import { GetChannelDataCommandDto } from '@Apps/api/src/user/v1/commands/get-channel-data/get-channel-data.command.dto';

@CommandHandler(GetChannelDataCommandDto)
export class GetChannelDataCommandHandler
  implements ICommandHandler<GetChannelDataCommandDto>
{
  constructor(
    @Inject(USER_CHANNEL_DATA_REPOSITORY)
    protected readonly userChannnelDataRepo: UserChannelDataRepositoryPort,

    @Inject(CHANNEL_DATA_REPOSITORY)
    protected readonly channelDataRepo: ChannelDataRepositoryPost,
  ) {}
  async execute(command: GetChannelDataCommandDto) {
    const conflictCheck = await this.userChannnelDataRepo.findOneByUserId(
      command.userId,
    );

    if (conflictCheck) throw new HttpException('conflict', HttpStatus.CONFLICT);

    const youtube = google.youtube({
      version: 'v3',
      headers: { Authorization: 'Bearer ' + command.accessToken },
      auth: process.env.GOOGLE_APIKEY,
    });

    if (!youtube)
      throw new HttpException(
        'Google accessToken or apikey is weird',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    const res = await youtube.channels.list({
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

    const { channelName, totalVideos, subscriber, totalViews, keyword } =
      await this.channelDataRepo.findOneByChannelId(channelId);

    const newUserChannelData = new UserChannelData(
      channelId,
      Number(command.userId),
      channelName,
      totalVideos,
      subscriber,
      totalViews,
      keyword,
    );

    return await this.userChannnelDataRepo.insert(newUserChannelData);
  }
}
