import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { USER_CHANNEL_DATA_REPOSITORY } from '@Apps/api/src/user-channel-data/user-channel-data.di-token';
import { UserChannelDataRepositoryPort } from '@Apps/api/src/user-channel-data/v1/db/user-channel-data.repository.port';
import { google } from 'googleapis';
import { UserChannelData } from '@Libs/entity/src/domain/userChannelData/UserChannelData.entity';
import { throws } from 'assert';

export class GetChannelDataCommandDto {
  userId: string;
  accessToken: string;

  userEmail: string;
  constructor(props: GetChannelDataCommandDto) {
    this.userId = props.userId;
    this.accessToken = props.accessToken;
    this.userEmail = props.userEmail;
  }
}

@CommandHandler(GetChannelDataCommandDto)
export class GetChannelDataCommandHandler
  implements ICommandHandler<GetChannelDataCommandDto>
{
  constructor(
    @Inject(USER_CHANNEL_DATA_REPOSITORY)
    protected readonly userChannnelDataRepo: UserChannelDataRepositoryPort,
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

    const { snippet, statistics, brandingSettings, id } = res.data.items[0];

    console.log(res.data.items[0]);
    const newUserChannelData = new UserChannelData();
    newUserChannelData.id = id;
    newUserChannelData.userId = Number(command.userId);
    newUserChannelData.channelName = snippet.title;
    newUserChannelData.channelVideos = Number(statistics.videoCount);
    newUserChannelData.channelDescriber = Number(statistics.subscriberCount);
    newUserChannelData.channelViews = Number(statistics.viewCount);
    newUserChannelData.channelKeywords = brandingSettings.channel.keywords;

    return await this.userChannnelDataRepo.insert(newUserChannelData);
  }
}
