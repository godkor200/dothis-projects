import { GetChannelDataCommandHandler } from './get-channel-data.service';
import {
  ChannelDataMock,
  UserChannelDataMock,
} from '@Apps/api/src/app/user/__mock__/get-channel-data.mock';
import { Channel } from '@Apps/api/src/config/database/domain/channel/Channel.entity';
import { GetChannelDataCommandDto } from '@Apps/api/src/app/user/v1/commands/get-channel-data/get-channel-data.command.dto';
import { google } from 'googleapis';

jest.mock('googleapis', () => {
  const googleApisMock = {
    google: {
      youtube: jest.fn().mockImplementation(() => {
        return {
          channels: {
            list: jest.fn().mockImplementation(() => {
              return {
                status: 200,
                data: { items: [{ id: 'A' }] },
              };
            }),
          },
        };
      }),
    },
  };
  return googleApisMock;
});
describe('get-channel-data service', () => {
  describe('유저 데이터가 전달될때', () => {
    it('크롤링된 channel 테이블에서 userChannelData 테이블로 이동해야합니다.', async () => {
      const getChannelDataCommandDto = new GetChannelDataCommandDto({
        userId: '5',
        accessToken: 'adfdsfsadffs',
        userEmail: 'godkor200@gmail.com',
      });
      const userChannelDataDummy = null;
      const channelDummy: Channel = {
        id: 4131,
        channelId: 'UCfsqglnMY55Rf8B_E3TLV-A',
        channelName: 'Su chan Shu chan',
        url: 'https://www.youtube.com/c/shumovie%E5%9B%BD%E9%9A%9B%E7%B5%90%E5%A9%9A%E6%97%A5%E9%9F%93',
        subscriber: 56000,
        description:
          '日本に住む日韓夫婦です。韓国人SUちゃんが日本の様々な事を体験していきます！\n僕たちは「日韓文化の違い」「韓国旅行」「日本旅行」の３つをメインにしています。\n\n「日韓文化の違い」では日韓夫婦にしか気づかない視点や衣食住の違いなど世の中の人が知ってそうで知らない違いなどを解説しています。\n\n「韓国旅行」では韓国の美味しいお店、観光地巡りだけでなくSUちゃんの実家の光州と言う地域や実際に韓国の人がどんな生活をしているかについても動画にしていますので、かなり深く知ることができます。\n\n「日本旅行」ではその地域に行ったSUちゃんの反応・オススメのお店など多様なジャンルの旅行動画になります。\n\n韓国男子と日本女子のyoutubeが多い中、僕たちはその逆の視点や見方を動画にできればと思っています。\nゆるりとした動画ですので楽しんで見てくれたら嬉しいです♪\n\n구독도 잘 부탁 드립니다~^^  チャンネル登録もよろしくね〜^ ^\n\nビジネス関係のお問い合わせはメール(gmail)か動画概要欄のInstagramダイレクトメッセージにお願いします。\n2018/10/21 youtube start',
        since: new Date('2016. 1. 12'),
        totalViews: 31089102,
        totalVideos: 719,
        tag: null,
        country: '일본',
        link: "['tps://www.youtube.com/redirect?q=https://www.instagram.com/shutan4&v=UpqSKXwM4n4&redir_token=V48se2MH0vQAHARLimx7dzEQAEh8MTU1MjgyNzAzNkAxNTUyNzQwNjM2&event=video_description', 'https://twitter.com/shu_movie']",
        keyword: null,
        totalNormalVideos: 657,
        user: null,
        video: null,
      };

      const getChannelDataService = new GetChannelDataCommandHandler(
        new UserChannelDataMock(userChannelDataDummy),
        new ChannelDataMock(channelDummy),
      );
      const res = await getChannelDataService.execute(getChannelDataCommandDto);
      expect(res.success).toBe(true);
    });
  });
});
