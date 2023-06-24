'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { SURVEY } from '@/constants/route';

import {
  Background,
  Best_bottom,
  Best_mid,
  Best_name,
  Best_top,
  ImageBox,
  Main,
  Pink,
  PriceCategory,
  Td_start,
  Th_start,
} from './style';

export default function Price() {
  const router = useRouter();
  return (
    <Background>
      <Main>
        <h2>유튜브 콘텐츠 기획 시작하기</h2>
        <p>
          <Pink>하루 330원</Pink>으로 더 고도화된 분석, 강력한 AI, 더 쾌적한
          서비스 환경 등이 제공됩니다.
        </p>

        <PriceCategory>
          <thead>
            <tr>
              <Th_start>시작하기</Th_start>
              <th>Trial</th>
              <Best_top>
                <Best_name>BEST</Best_name>
                Basic
              </Best_top>
              <th>Pro</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td_start>요금 / 기간</Td_start>
              <td>무료 / 무제한</td>
              <Best_mid>9,900 / 30일</Best_mid>
              <td>49,500원 / 30일</td>
            </tr>
            <tr>
              <td></td>
              <td>
                <a href={SURVEY}>
                  <button>시작하기</button>
                </a>
              </td>
              <Best_bottom>
                <a href={SURVEY}>
                  <button>14일 무료 체험</button>
                </a>
              </Best_bottom>
              <td>
                <a href={SURVEY}>
                  <button>14일 무료 체험</button>
                </a>
              </td>
            </tr>
          </tbody>
        </PriceCategory>

        <ImageBox>
          <Image
            width={0}
            height={0}
            sizes={'100%'}
            fill
            src={'/images/pricing.png'}
            alt={''}
          />
        </ImageBox>
      </Main>
    </Background>
  );
}
