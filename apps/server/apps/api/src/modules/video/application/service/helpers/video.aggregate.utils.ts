import { GetRelatedVideoHistory } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { DateData } from '@Apps/modules/video/infrastructure/daos/video.res';

import {
  IIncreaseHits,
  IIncreaseHitsData,
} from '@Apps/modules/video/application/service/helpers/video.aggregate.type';

export class VideoAggregateUtils {
  /**
   * 그룹키값으로 그룹화
   * @param array
   * @param key
   */
  static groupBy<T, K extends keyof any>(
    array: T[],
    key: (item: T) => K,
  ): Record<K, T[]> {
    return array.reduce((result, currentValue) => {
      const groupKey = key(currentValue);
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(currentValue);
      return result;
    }, {} as Record<K, T[]>);
  }
  /**
   * 클러스터 별로 구룹화 되지 않은 배열을 그룹회
   * @param data
   */
  static groupDataByDate<T extends DateData>(
    data: T[],
  ): { [key: string]: T[] } {
    return data.reduce((acc, cur) => {
      const date = `${cur.year}-${String(cur.month).padStart(2, '0')}-${String(
        cur.day,
      ).padStart(2, '0')}`;
      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push(cur);
      return acc;
    }, {});
  }
  /**
   * 날짜 별로 정렬
   * @param histories
   */
  static sortByDate(
    histories: GetRelatedVideoHistory[],
  ): GetRelatedVideoHistory[] {
    return histories.sort(
      (a, b) =>
        new Date(a.year, a.month - 1, a.day).getTime() -
        new Date(b.year, b.month - 1, b.day).getTime(),
    );
  }
  /**
   * 평균값 구하는 함수, 소수점 내림
   * @param sum
   * @param index
   * @private
   */
  static calculateAverage(sum: number, count: number): number {
    return Math.floor(sum / count);
  }
  /**
   * 3개월이내 인지 판별하는 함수
   * @param date
   * @private
   */
  static isWithinThreeMonths(date: Date): boolean {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    return date >= threeMonthsAgo;
  }

  static isPreviousDay<T extends { year: number; month: number; day: number }>(
    prev: T,
    current: T,
  ): boolean {
    const prevDate = new Date(prev.year, prev.month - 1, prev.day);
    const currentDate = new Date(current.year, current.month - 1, current.day);
    return currentDate.getTime() - prevDate.getTime() === 24 * 60 * 60 * 1000;
  }

  static calculateIncreases<
    T extends {
      videoViews: number;
      videoLikes?: number;
      videoComments?: number;
    },
  >(
    prev: T,
    current: T,
    sumViews: number,
    sumLikes: number = 0,
    sumComments: number = 0,
    i: number,
  ) {
    const averageIncreaseViews = sumViews / (i + 1);
    const increaseViews =
      current.videoViews !== 0
        ? current.videoViews - prev.videoViews
        : averageIncreaseViews;

    let increaseLikes = 0;
    if (prev.videoLikes !== undefined && current.videoLikes !== undefined) {
      const averageIncreaseLikes = sumLikes / (i + 1);
      increaseLikes =
        current.videoLikes !== 0
          ? current.videoLikes - prev.videoLikes
          : averageIncreaseLikes;
    }

    let increaseComments = 0;
    if (
      prev.videoComments !== undefined &&
      current.videoComments !== undefined
    ) {
      const averageIncreaseComments = sumComments / (i + 1);
      increaseComments =
        current.videoComments !== 0
          ? current.videoComments - prev.videoComments
          : averageIncreaseComments;
    }

    return { increaseViews, increaseLikes, increaseComments };
  }

  /**
   * getRandomInRange는 [min, max] 범위의 실수를 반환합니다.
   * @param min
   * @param max
   */
  static getRandomInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  /**
   * getRandomIntInRange는 [min, max] 범위의 정수를 반환합니다.
   * @param min
   * @param max
   */
  static getRandomIntInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  /**
   * 주어진 시작 날짜와 끝 날짜 사이의 모든 날짜를 문자열 배열로 생성합니다.
   * @param startDate - 시작 날짜 (YYYY-MM-DD 형식의 문자열)
   * @param endDate - 끝 날짜 (YYYY-MM-DD 형식의 문자열)
   * @returns 날짜 문자열 배열
   */
  static generateDateRange(startDate: string, endDate: string): string[] {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates = [];
    for (
      let date = new Date(start);
      date <= end;
      date.setDate(date.getDate() + 1)
    ) {
      dates.push(new Date(date).toISOString().split('T')[0]);
    }
    return dates;
  }
  /**
   * 주어진 날짜에 대한 가짜 데이터를 생성합니다.
   * @param date - 날짜 (YYYY-MM-DD 형식의 문자열)
   * @param calculatedData - 기존 계산된 데이터 배열
   * @param dataKeys - 생성할 데이터의 키 배열
   * @returns 생성된 가짜 데이터 객체
   */
  static generateFakeDataForDate(
    date: string,
    calculatedData: IIncreaseHits[],
    dataKeys: (keyof IIncreaseHits)[],
  ): IIncreaseHits {
    const getRandomInRange = VideoAggregateUtils.getRandomInRange;
    const getRandomIntInRange = VideoAggregateUtils.getRandomIntInRange;

    const minMaxValues = dataKeys.reduce((acc, key) => {
      const values = calculatedData.map((data) => data[key] as number);
      const min = Math.min(...values);
      const max = Math.max(...values);
      acc[key] = { min, max };
      return acc;
    }, {} as Record<keyof IIncreaseHits, { min: number; max: number }>);

    const fakeData: IIncreaseHits = {
      date,
      expectedHits: getRandomIntInRange(
        minMaxValues.expectedHits.min,
        minMaxValues.expectedHits.max,
      ),
      maxPerformance: getRandomInRange(
        minMaxValues.maxPerformance.min,
        minMaxValues.maxPerformance.max,
      ),
      minPerformance: getRandomInRange(
        minMaxValues.minPerformance.min,
        minMaxValues.minPerformance.max,
      ),
      uniqueVideoCount: getRandomIntInRange(
        minMaxValues.uniqueVideoCount.min,
        minMaxValues.uniqueVideoCount.max,
      ),
      increaseViews: getRandomIntInRange(
        minMaxValues.increaseViews.min,
        minMaxValues.increaseViews.max,
      ),
    };

    return fakeData;
  }
  /**
   * 주어진 날짜에 대한 일일조회수 가짜 데이터를 생성합니다.
   * @param date - 날짜 (YYYY-MM-DD 형식의 문자열)
   * @param calculatedData - 기존 계산된 데이터 배열
   * @param dataKeys - 생성할 데이터의 키 배열
   * @returns 생성된 일일 가짜 데이터 객체
   */
  static generateFakeDataForDateDaily(
    date: string,
    calculatedData: IIncreaseHitsData[],
    dataKeys: (keyof IIncreaseHitsData)[],
  ): IIncreaseHitsData {
    const getRandomIntInRange = VideoAggregateUtils.getRandomIntInRange;

    const minMaxValues = dataKeys.reduce((acc, key) => {
      const values = calculatedData.map((data) => data[key] as number);
      const min = Math.min(...values);
      const max = Math.max(...values);
      acc[key] = { min, max };
      return acc;
    }, {} as Record<keyof IIncreaseHitsData, { min: number; max: number }>);

    const fakeData: IIncreaseHitsData = {
      date,
      increaseLikes: getRandomIntInRange(
        minMaxValues.increaseLikes.min,
        minMaxValues.increaseLikes.max,
      ),
      increaseComments: getRandomIntInRange(
        minMaxValues.increaseComments.min,
        minMaxValues.increaseComments.max,
      ),
      uniqueVideoCount: getRandomIntInRange(
        minMaxValues.uniqueVideoCount.min,
        minMaxValues.uniqueVideoCount.max,
      ),
      increaseViews: getRandomIntInRange(
        minMaxValues.increaseViews.min,
        minMaxValues.increaseViews.max,
      ),
    };

    return fakeData;
  }
  /**
   * 주어진 기간 동안 증가 일일조회수 + 기대조회수 데이터의 가짜 데이터를 생성합니다.
   * @param startDate - 시작 날짜 (YYYY-MM-DD 형식의 문자열)
   * @param endDate - 끝 날짜 (YYYY-MM-DD 형식의 문자열)
   * @param calculatedData - 기존 계산된 데이터 배열
   * @returns 생성된 증가 히트 데이터 배열
   */
  static generateDailyFakeViewsAndExpectedViews(
    startDate: string,
    endDate: string,
    calculatedData: IIncreaseHits[],
  ): IIncreaseHits[] {
    const dates = VideoAggregateUtils.generateDateRange(startDate, endDate);
    const result = [];

    dates.forEach((date) => {
      const existingData = calculatedData.find((data) => data.date === date);
      if (existingData) {
        result.push(existingData);
      } else {
        const fakeData = VideoAggregateUtils.generateFakeDataForDate(
          date,
          calculatedData,
          [
            'increaseViews',
            'maxPerformance',
            'minPerformance',
            'uniqueVideoCount',
            'expectedHits',
          ],
        );
        result.push(fakeData);
      }
    });

    return result;
  }
  /**
   * 주어진 기간 동안 증가 일일조회수 데이터의 가짜 데이터를 생성합니다.
   * @param startDate - 시작 날짜 (YYYY-MM-DD 형식의 문자열)
   * @param endDate - 끝 날짜 (YYYY-MM-DD 형식의 문자열)
   * @param calculatedData - 기존 계산된 데이터 배열
   * @returns 생성된 증가 히트 데이터의 일일 배열
   */
  static generateDailyFakeViews(
    startDate: string,
    endDate: string,
    calculatedData: IIncreaseHitsData[],
  ): IIncreaseHitsData[] {
    const dates = VideoAggregateUtils.generateDateRange(startDate, endDate);
    const result = [];

    dates.forEach((date) => {
      const existingData = calculatedData.find((data) => data.date === date);
      if (existingData) {
        result.push(existingData);
      } else {
        const fakeData = VideoAggregateUtils.generateFakeDataForDateDaily(
          date,
          calculatedData,
          [
            'increaseViews',
            'increaseLikes',
            'increaseComments',
            'uniqueVideoCount',
          ],
        );
        result.push(fakeData);
      }
    });

    return result;
  }
}
