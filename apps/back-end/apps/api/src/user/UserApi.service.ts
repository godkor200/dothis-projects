import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@Libs/entity/src/domain/user/User.entity';
import { UserRepository } from './v1/db/user.repository';
import { google } from 'googleapis';
import { UserChannelData } from '@Libs/entity/src/domain/userChannelData/UserChannelData.entity';

@Injectable()
export class UserApiService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserChannelData)
    private userChannelData: Repository<UserChannelData>,
    private readonly userApiQueryRepository: UserRepository,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async registerUserData(userId: string, token: string) {
    const conflictCheck = await this.userChannelData.findOne({
      where: { userId: +userId },
    });

    if (conflictCheck) throw new HttpException('conflict', HttpStatus.CONFLICT);

    const youtube = google.youtube({
      version: 'v3',
      headers: { Authorization: token },
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

    if (res.statusText === 'OK' && res.status === 200) {
      const { snippet, statistics, brandingSettings, id } = res.data.items[0];
      const newUserChannelData = new UserChannelData();
      newUserChannelData.id = id;
      newUserChannelData.userId = Number(userId);
      newUserChannelData.channelName = snippet.title;
      newUserChannelData.channelVideos = Number(statistics.videoCount);
      newUserChannelData.channelDescriber = Number(statistics.subscriberCount);
      newUserChannelData.channelViews = Number(statistics.viewCount);
      newUserChannelData.channelKeywords = brandingSettings.channel.keywords;

      return await this.userChannelData.save(newUserChannelData);
    } else {
      throw new HttpException(
        'google server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
