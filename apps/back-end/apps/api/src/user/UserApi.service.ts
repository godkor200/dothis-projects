import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@Libs/entity/src/domain/user/User.entity';
import { UserApiQueryRepository } from './UserApiQueryRepository';
import { google } from 'googleapis';
import { UserChannelData } from '@Libs/entity/src/domain/userChannelData/UserChannelData.entity';

@Injectable()
export class UserApiService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserChannelData)
    private userChannelData: Repository<UserChannelData>,
    private readonly userApiQueryRepository: UserApiQueryRepository,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async registerUserData(userId: string, token: string) {
    const youtube = google.youtube({
      version: 'v3',
      headers: { Authorization: token },
      auth: process.env.GOOGLE_APIKEY,
    });

    return youtube.channels.list(
      {
        part: [
          'id',
          'snippet',
          'brandingSettings',
          'contentDetails',
          'statistics',
          'topicDetails',
        ],
        mine: true,
      },
      async (err, res) => {
        if (err) throw new HttpException('message', HttpStatus.BAD_REQUEST);

        const { snippet, statistics, brandingSettings, id } = res.data.items[0];

        const newUserChannelData = this.userChannelData.create({
          channelId: Number(123123123123),
          userId: Number(3),
          channelName: snippet.title,
          channelVideos: Number(statistics.videoCount),
          channelDescriber: Number(statistics.subscriberCount),
          channelViews: Number(statistics.viewCount),
          channelKeywords: brandingSettings.channel.keywords,
        });
        console.log(newUserChannelData);
        return await this.userChannelData.save(newUserChannelData);
      },
    );
  }
}
