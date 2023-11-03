'use client';

import Image from 'next/image';

import { SURVEY } from '@/constants/route';

import * as Style from './style';

const ICON_CHECK = '/icons/pricing_check.svg';
const ICON_X = '/icons/pricing_x.svg';

const Price = () => {
  return (
    <>
      <Style.Main>
        <h2>유튜브 콘텐츠 기획 시작하기</h2>
        <p>
          <Style.Pink>하루 330원</Style.Pink>으로 더 고도화된 분석, 강력한 AI,
          더 쾌적한 서비스 환경 등이 제공됩니다.
        </p>

        <Style.PriceButton>
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
        </Style.PriceButton>

        <Style.PriceDetail>
          <thead>
            <tr>
              <td></td>
              <td>Trial</td>
              <td>Basic</td>
              <td>Pro</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Style.Th_subtitle>소재 탐색</Style.Th_subtitle>
              <Style.Th_subtitle />
              <Style.Th_subtitle />
              <Style.Th_subtitle />
            </tr>
            <tr>
              <th>검색 횟수 제한</th>
              <td>무제한</td>
              <td>무제한</td>
              <td>무제한</td>
            </tr>
            <tr>
              <th>동시 검색 키워드</th>
              <td>무제한</td>
              <td>무제한</td>
              <td>무제한</td>
            </tr>
            <tr>
              <th>연관어 개수</th>
              <td>10</td>
              <td>50</td>
              <td>150</td>
            </tr>
            <tr>
              <th>최대 분석 기간</th>
              <td>7일</td>
              <td>30일</td>
              <td>365일</td>
            </tr>
            <tr>
              <th>연관 콘텐츠</th>
              <td>최대 5개</td>
              <td>최대 20개</td>
              <td>최대 50개</td>
            </tr>
            <tr>
              <th>콘텐츠 요약</th>
              <td>
                <Style.IconContainer>
                  <Style.Icon src={ICON_X} />
                </Style.IconContainer>
              </td>
              <td>
                <Style.IconContainer>
                  <Style.Icon src={ICON_CHECK} />
                </Style.IconContainer>
              </td>
              <td>
                <Style.IconContainer>
                  <Style.Icon src={ICON_CHECK} />
                </Style.IconContainer>
              </td>
            </tr>
            <tr>
              <th>AI 카테고리 분석</th>
              <td>
                <Style.IconContainer>
                  <Style.Icon src={ICON_X} />
                </Style.IconContainer>
              </td>
              <td>
                <Style.IconContainer>
                  <Style.Icon src={ICON_CHECK} />
                </Style.IconContainer>
              </td>
              <td>
                <Style.IconContainer>
                  <Style.Icon src={ICON_CHECK} />
                </Style.IconContainer>
              </td>
            </tr>
            <tr>
              <th>상위 노출 확률 분석</th>
              <td>
                <Style.IconContainer>
                  <Style.Icon src={ICON_X} />
                </Style.IconContainer>
              </td>
              <td>
                <Style.IconContainer>
                  <Style.Icon src={ICON_CHECK} />
                </Style.IconContainer>
              </td>
              <td>
                <Style.IconContainer>
                  <Style.Icon src={ICON_CHECK} />
                </Style.IconContainer>
              </td>
            </tr>
            <tr>
              <th>조회수 예측</th>
              <td>
                <Style.IconContainer>
                  <Style.Icon src={ICON_X} />
                </Style.IconContainer>
              </td>
              <td>
                <Style.IconContainer>
                  <Style.Icon src={ICON_X} />
                </Style.IconContainer>
              </td>
              <td>
                <Style.IconContainer>
                  <Style.Icon src={ICON_CHECK} />
                </Style.IconContainer>
              </td>
            </tr>
          </tbody>
        </Style.PriceDetail>
      </Style.Main>
    </>
  );
};

export default Price;
