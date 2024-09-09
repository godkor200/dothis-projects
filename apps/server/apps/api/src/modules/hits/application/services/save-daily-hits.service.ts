import { Inject, Injectable } from '@nestjs/common';
import {
  DAILY_HITS_SERVICE_DI_TOKEN,
  DAILY_VIEW_CACHE_DI_TOKEN,
  WEEKLY_VIEWS_REPOSITORY_V2_DI_TOKEN,
} from '@Apps/modules/hits/hits.di-token.contants';
import { WeeklyHitsV2OutboundPort } from '@Apps/modules/hits/domain/ports/weekly-hits.v2.outbound.port';
import { Err, Ok, Result } from 'oxide.ts';
import { DailyHitsServiceInboundPort } from '@Apps/modules/hits/domain/ports/daily-hits-service.inbound.port';
import { FindDailyViewsDto } from '@Apps/modules/hits/application/dtos/find-daily-view.v1.dto';
import { DailyViewCachePort } from '@Apps/modules/hits/domain/ports/daily-view.cache.port';
import { SaveRangeDailyHitsDto } from '@Apps/modules/hits/application/dtos/save-range-daily-hits.dto';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IRes } from '@Libs/types';

export type TSaveResult = Result<IRes, any>;

@CommandHandler(SaveRangeDailyHitsDto)
export class SaveRangeDailyHitsService
  implements ICommandHandler<SaveRangeDailyHitsDto, TSaveResult>
{
  constructor(
    @Inject(WEEKLY_VIEWS_REPOSITORY_V2_DI_TOKEN)
    private readonly weeklyHitsRepository: WeeklyHitsV2OutboundPort,

    @Inject(DAILY_HITS_SERVICE_DI_TOKEN)
    private readonly dailyHitsService: DailyHitsServiceInboundPort,

    @Inject(DAILY_VIEW_CACHE_DI_TOKEN)
    private readonly dailyViewsCache: DailyViewCachePort,
  ) {}

  async execute(dto: SaveRangeDailyHitsDto): Promise<TSaveResult> {
    const { search, related, from, to } = dto;

    try {
      // 주어진 검색어 및 관련어에 따라 비동기 작업 목록 생성
      const tasks = await this.createTasks(search, related, from, to);

      // 생성된 모든 비동기 작업들이 완료될 때까지 기다림
      await Promise.all(tasks);

      // 모든 작업이 성공적으로 완료되었음을 반환
      return Ok({ success: true });
    } catch (error) {
      // 오류가 발생하면 오류 메시지를 반환
      return Err(error);
    }
  }

  private async createTasks(
    search: string | undefined,
    related: string | undefined,
    from: string,
    to: string,
  ): Promise<Promise<void>[]> {
    if (!search && !related) {
      // 검색어와 관련어가 없을 경우, 가장 최근의 상위 100개의 데이터 조회
      const top100Result =
        await this.weeklyHitsRepository.getTop100LatestData();
      if (top100Result.isErr()) {
        // 데이터 조회 실패 시 예외 발생
        throw top100Result.unwrapErr();
      }

      // 키워드를 포함하는 상위 100개의 데이터를 기반으로 비동기 작업 목록 생성
      const frequentWords = top100Result
        .unwrap()
        .map((element) => element.keyword);
      return frequentWords.map((keyword) =>
        this.processKeyword(keyword, from, to),
      );
    } else {
      // 검색어 또는 관련어가 제공된 경우 해당 검색어를 처리하는 작업 생성
      return [this.processKeyword(search!, from, to, related)];
    }
  }

  private async processKeyword(
    keyword: string,
    from: string,
    to: string,
    related?: string,
  ): Promise<void> {
    // 각 키워드를 기반으로 일별 조회수 계산 DTO 생성
    const dto = new FindDailyViewsDto({ search: keyword, related, from, to });
    const calculatedResult = await this.dailyHitsService.execute(dto);

    if (calculatedResult.isOk()) {
      // 계산된 결과가 성공적일 경우, 캐시에 데이터 저장
      const calculatedResultUnwrap = calculatedResult.unwrap();
      await this.dailyViewsCache.saveRangeDataForDailyHits(
        keyword,
        calculatedResultUnwrap,
        related,
      );
    } else {
      // 실패한 경우 예외 발생
      throw calculatedResult.unwrapErr();
    }
  }
}
