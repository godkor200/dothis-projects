import { VideoCacheReturnType } from '@Apps/modules/video/domain/ports/video.cache.outbound.ports';
type RecordType = Record<string, string[]>;

export class RedisResultMapper {
  private static isValidDate(date: string): boolean {
    // 날짜 형식을 검증 (YYYYMMDD)
    return /^\d{8}$/.test(date);
  }

  private static isValidChannelId(channelId: string): boolean {
    // 채널 ID 형식을 검증 (UC로 시작하는 문자열)
    return /^UC[a-zA-Z0-9_-]{22}$/.test(channelId);
  }

  private static isValidVideoId(videoId: string): boolean {
    // 비디오 ID 형식을 검증 (영숫자, 대시 및 밑줄로 구성된 11자)
    return /^[a-zA-Z0-9_-]{11}$/.test(videoId);
  }

  private static isValidCluster(cluster: string): boolean {
    // 클러스터 형식을 검증 (숫자)
    return /^\d+$/.test(cluster);
  }
  static toObjects(data: string[]): VideoCacheReturnType[] {
    return data.map((e) => {
      const parts = e.split(':');
      // data 형식이 올바른지 확인
      if (parts.length < 3 || parts.length > 4) {
        console.error('Invalid data format:', e);
        return null;
      }

      const [publishedDate, channelId, videoId, cluster] = parts;
      // 각 필드에 대해 벨리데이션 체크
      if (!this.isValidDate(publishedDate)) {
        console.error('Invalid date format:', publishedDate);
        return null;
      }

      return {
        publishedDate,
        videoId: !cluster ? channelId : videoId,
        cluster: !cluster ? videoId : cluster,
        channelId: !cluster ? undefined : channelId,
      };
    });
  }

  // 추가된 메소드: 객체 배열을 클러스터별로 그룹화
  static groupByCluster(
    data: VideoCacheReturnType[],
  ): Record<string, VideoCacheReturnType[]> {
    return data.reduce((acc, item) => {
      // 클러스터 값을 키로 사용하여 객체를 그룹화
      if (!acc[item.cluster]) {
        acc[item.cluster] = [];
      }
      acc[item.cluster].push(item);
      return acc;
    }, {} as Record<string, VideoCacheReturnType[]>);
  }

  static createVideoIds(
    videoData: Record<string, VideoCacheReturnType[]>,
  ): Record<string, string[]> {
    const result: Record<string, string[]> = {};
    Object.keys(videoData).forEach((cluster) => {
      // VideoCacheReturnType 배열에서 videoId만 추출하여 string 배열로 변환
      result[cluster] = videoData[cluster].map((video) => video.videoId);
    });
    return result;
  }

  static createChannelIds(
    videoData: Record<string, VideoCacheReturnType[]>,
  ): string[] {
    return Object.keys(videoData).flatMap((cluster) =>
      videoData[cluster].map((video) => video.channelId),
    );
  }
}
