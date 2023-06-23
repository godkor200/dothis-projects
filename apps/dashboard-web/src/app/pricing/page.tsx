'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { SURVEY } from '@/constants/route';

import Footer from '../../components/Footer';
import Right from './right.svg';
import {
  Background,
  Best_bottom,
  Best_mid,
  Best_name,
  Best_top,
  Gradient,
  ImageBox,
  Main,
  Pink,
  PriceCategory,
  RightButton,
  Tag,
  Tag_select,
  TagContainer,
  Td_start,
  Th_start,
} from './style';

const TEXT = [
  '부동산',
  '수도권 아파트 분양',
  '아파트',
  '전세',
  '부동산시세',
  '부동산시세',
  '부동산시세',
  '부동산시세',
  '부동산시세',
  '부동산시세',
  '부동산시세',
];

export default function Price() {
  const router = useRouter();
  return (
    <Background>
      <Main>
        <TagContainer>
          <Gradient />
          <div>
            {TEXT.map((value, key) => {
              return key === 1 || key === 0 ? (
                <Tag_select key={`header_TagContainer _${key}`}>
                  {value}
                </Tag_select>
              ) : (
                <Tag key={`header_TagContainer _${key}`}> {value}</Tag>
              );
            })}
          </div>
          <RightButton>
            <Right width={5} height={10} />
          </RightButton>
        </TagContainer>

        <h2>유튜브 콘텐츠 기획 시작하기</h2>
        <p>
          <Pink>하루 330원</Pink>으로 더 고도화된 분석, 강력한 AI, 더 쾌적한
          서비스 환경 등이 제공됩니다.
        </p>

        <PriceCategory>
          <tr>
            <Th_start>시작하기</Th_start>
            <th>Trial</th>
            <Best_top>
              <Best_name>BEST</Best_name>
              Basic
            </Best_top>
            <th>Pro</th>
          </tr>
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
      <Footer />
    </Background>
  );
}
