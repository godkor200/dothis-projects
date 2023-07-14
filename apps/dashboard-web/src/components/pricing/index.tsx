'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { SURVEY } from '@/constants/route';

import * as Style from './style';

const Price = () => {
  const router = useRouter();
  return (
    <Style.Background>
      <Style.Main>
        <h2>유튜브 콘텐츠 기획 시작하기</h2>
        <p>
          <Style.Pink>하루 330원</Style.Pink>으로 더 고도화된 분석, 강력한 AI,
          더 쾌적한 서비스 환경 등이 제공됩니다.
        </p>

        <Style.PriceCategory>
          <thead>
            <tr>
              <Style.Th_start>시작하기</Style.Th_start>
              <th>Trial</th>
              <Style.Best_top>
                <Style.Best_name>BEST</Style.Best_name>
                Basic
              </Style.Best_top>
              <th>Pro</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Style.Td_start>요금 / 기간</Style.Td_start>
              <td>무료 / 무제한</td>
              <Style.Best_mid>9,900 / 30일</Style.Best_mid>
              <td>49,500원 / 30일</td>
            </tr>
            <tr>
              <td></td>
              <td>
                <a href={SURVEY}>
                  <button>시작하기</button>
                </a>
              </td>
              <Style.Best_bottom>
                <a href={SURVEY}>
                  <button>14일 무료 체험</button>
                </a>
              </Style.Best_bottom>
              <td>
                <a href={SURVEY}>
                  <button>14일 무료 체험</button>
                </a>
              </td>
            </tr>
          </tbody>
        </Style.PriceCategory>

        <Style.ImageBox>
          <Image
            width={0}
            height={0}
            sizes={'100%'}
            fill
            src={'/images/pricing.png'}
            alt={''}
          />
        </Style.ImageBox>
      </Style.Main>
    </Style.Background>
  );
};

export default Price;
