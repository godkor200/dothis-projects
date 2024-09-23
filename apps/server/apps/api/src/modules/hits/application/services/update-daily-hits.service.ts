import { Injectable, Inject } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule'; // NestJS 스케줄 패키지
import {
  DAILY_HITS_SERVICE_DI_TOKEN,
  DAILY_VIEW_CACHE_DI_TOKEN,
  WEEKLY_VIEWS_REPOSITORY_V2_DI_TOKEN,
} from '@Apps/modules/hits/hits.di-token.contants';
import { WeeklyHitsV2OutboundPort } from '@Apps/modules/hits/domain/ports/weekly-hits.v2.outbound.port';
import { DailyHitsServiceInboundPort } from '@Apps/modules/hits/domain/ports/daily-hits-service.inbound.port';
import { DailyViewCachePort } from '@Apps/modules/hits/domain/ports/daily-view.cache.port';

import dayjs from 'dayjs'; // dayjs 라이브러리 불러오기
import timezone from 'dayjs/plugin/timezone'; // 타임존 플러그인
import utc from 'dayjs/plugin/utc'; // UTC 플러그인
dayjs.extend(utc); // dayjs 관련 설정
dayjs.extend(timezone);
@Injectable()
export class UpdateDailyHitsService {
  constructor(
    @Inject(WEEKLY_VIEWS_REPOSITORY_V2_DI_TOKEN)
    private readonly weeklyHitsRepository: WeeklyHitsV2OutboundPort,

    @Inject(DAILY_HITS_SERVICE_DI_TOKEN)
    private readonly dailyHitsService: DailyHitsServiceInboundPort,

    @Inject(DAILY_VIEW_CACHE_DI_TOKEN)
    private readonly dailyViewsCache: DailyViewCachePort,
  ) {}

  @Cron('0 0 8 * * *', { timeZone: 'Asia/Seoul' }) // 한국 시각(KST)대로 매일 오전 8시에 실행
  async handleCron(dateStr: string = '2024-09-05') {
    const date = dateStr
      ? dayjs.tz(dateStr, 'Asia/Seoul')
      : dayjs.tz('Asia/Seoul');
    const today = date.toDate();
    const yesterday = date.subtract(1, 'day').toDate();
    yesterday.setDate(yesterday.getDate() - 1);

    const from = yesterday.toISOString().split('T')[0]; // 어제의 시작 시간
    const to = today.toISOString().split('T')[0]; // 오늘의 시작 시간

    try {
      // 비동기 작업 목록 생성
      const tasks = await this.createTasks(to, to);

      // 모든 비동기 작업이 완료될 때까지 기다림
      await Promise.all(tasks);

      // 로그 출력
      console.log('Daily hits calculation completed successfully.');
    } catch (error) {
      console.error('Error during daily hits calculation:', error);
    }
  }

  private async createTasks(
    from: string,
    to: string,
  ): Promise<Promise<void>[]> {
    // 최근 100개의 데이터 조회 - 특정한 검색어 없이
    const top100Result = await this.weeklyHitsRepository.getTop100LatestData();

    if (top100Result.isErr()) {
      throw top100Result.unwrapErr();
    }

    const frequentWords = top100Result
      .unwrap()
      .map((element) => element.keyword);
    return frequentWords.map((keyword) =>
      this.processKeyword(keyword, from, to),
    );
  }

  private async processKeyword(
    keyword: string,
    from: string,
    to: string,
  ): Promise<void> {
    const dto = { search: keyword, from, to };
    const calculatedResult = await this.dailyHitsService.execute(dto);

    if (calculatedResult.isOk()) {
      const calculatedResultUnwrap = calculatedResult.unwrap();
      await this.dailyViewsCache.updateOrAddDataForDailyHits(
        keyword,
        calculatedResultUnwrap,
      );
    } else {
      throw calculatedResult.unwrapErr();
    }
  }
}
