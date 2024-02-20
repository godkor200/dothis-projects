import { VideosResultTransformer } from '@Apps/modules/video/infrastructure/utils/videos.result-transformer';

describe('mapResultToObjects', () => {
  it('', async () => {
    const query = `SELECT vh.DAY, COUNT(DISTINCT vh.VIDEO_ID) AS unique_video_count
       FROM`;
    const res = VideosResultTransformer.mapResultToObjects(
      [
        ['a', 'b'],
        ['c', 'd'],
      ],
      query,
    );
    expect(res).toStrictEqual([
      { day: 'a', uniqueVideoCount: 'b' },
      { day: 'c', uniqueVideoCount: 'd' },
    ]);
  });
});
