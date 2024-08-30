import { VideoPerformanceDao } from '@Apps/modules/video/infrastructure/daos/video.performance.dao';
import { Result } from 'oxide.ts';
export type VideoPerformanceResult = {
  totalVideoCount: number;
  countAboveAverage: number;
};
export type VideoPerformanceOutboundPortResult = Result<
  VideoPerformanceResult,
  any
>;
export interface IVideoPerformanceOutboundPort {
  execute(
    dao: VideoPerformanceDao,
  ): Promise<VideoPerformanceOutboundPortResult>;
}
