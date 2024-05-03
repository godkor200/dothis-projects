import { IgniteResultToObjectMapper } from '@Apps/common/ignite/mapper';

describe('mapResultToObjects', () => {
  // 첫 번째 테스트: 고유 비디오 수 계산
  it('should correctly transform query results into objects with day and unique video count', async () => {
    const query = `SELECT vh.DAY, COUNT(DISTINCT vh.VIDEO_ID) AS unique_video_count
       FROM`;
    const res = IgniteResultToObjectMapper.mapResultToObjects(
      [
        ['a', 'b'], // 예제 입력 데이터
        ['c', 'd'],
      ],
      query,
    );

    // 기대 결과: 입력 데이터가 객체로 변환되어 'day'와 'uniqueVideoCount' 속성을 포함해야 함
    expect(res).toStrictEqual([
      { day: 'a', uniqueVideoCount: 'b' },
      { day: 'c', uniqueVideoCount: 'd' },
    ]);
  });

  // 두 번째 테스트: 비디오 정보 변환
  it('should correctly transform query results into objects with video details', async () => {
    const query = `SELECT VH.VIDEO_ID, VH.VIDEO_VIEWS, VH.DAY, VD.video_title, CH.CHANNEL_AVERAGE_VIEWS, VD.channel_id, VD.video_tags, to_char(VD.video_published, 'YYYY-MM-DD') AS video_published
        FROM`;
    const res = IgniteResultToObjectMapper.mapResultToObjects(
      [
        ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'], // 예제 입력 데이터
        ['i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'],
      ],
      query,
    );

    // 기대 결과: 입력 데이터가 전체 비디오 정보를 포함한 객체로 변환되어야 함
    expect(res).toStrictEqual([
      {
        videoId: 'a',
        videoViews: 'b',
        day: 'c',
        videoTitle: 'd',
        channelAverageViews: 'e',
        channelId: 'f',
        videoTags: 'g',
        videoPublished: 'h',
      },
      {
        videoId: 'i',
        videoViews: 'j',
        day: 'k',
        videoTitle: 'l',
        channelAverageViews: 'm',
        channelId: 'n',
        videoTags: 'o',
        videoPublished: 'p',
      },
    ]);
  });
});
