'use client';

import Image from 'next/image';

import { SURVEY } from '@/constants/route';

import {
  Best_bottom,
  Best_mid,
  Best_name,
  Best_top,
  Icon,
  IconContainer,
  Main,
  Pink,
  PriceButton,
  PriceDetail,
  Td_start,
  Th_start,
  Th_subtitle,
} from './style';

const ICON_CHECK = '/icons/pricing_check.svg';
const ICON_X = '/icons/pricing_x.svg';

const Price = () => {
  return (
    <>
      <Main>
        <h2>유튜브 콘텐츠 기획 시작하기</h2>
        <p>
          <Pink>하루 330원</Pink>으로 더 고도화된 분석, 강력한 AI, 서비스 환경
          등이 제공됩니다.
        </p>

        <PriceButton>
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
        </PriceButton>

        {/* 소재 탐색 */}
        <PriceDetail>
          <thead>
            {/* <tr>
              <td></td>
              <td>Trial</td>
              <td>Basic</td>
              <td>Pro</td>
            </tr> */}
            <tr>
              <Th_subtitle>소재 탐색</Th_subtitle>
              <Th_subtitle />
              <Th_subtitle />
              <Th_subtitle />
            </tr>
          </thead>
          <tbody>
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
                <IconContainer>
                  <Icon src={ICON_X} />
                </IconContainer>
              </td>
              <td>
                <IconContainer>
                  <Icon src={ICON_CHECK} />
                </IconContainer>
              </td>
              <td>
                <IconContainer>
                  <Icon src={ICON_CHECK} />
                </IconContainer>
              </td>
            </tr>
            <tr>
              <th>AI 카테고리 분석</th>
              <td>
                <IconContainer>
                  <Icon src={ICON_X} />
                </IconContainer>
              </td>
              <td>
                <IconContainer>
                  <Icon src={ICON_CHECK} />
                </IconContainer>
              </td>
              <td>
                <IconContainer>
                  <Icon src={ICON_CHECK} />
                </IconContainer>
              </td>
            </tr>
            <tr>
              <th>상위 노출 확률 분석</th>
              <td>
                <IconContainer>
                  <Icon src={ICON_X} />
                </IconContainer>
              </td>
              <td>
                <IconContainer>
                  <Icon src={ICON_CHECK} />
                </IconContainer>
              </td>
              <td>
                <IconContainer>
                  <Icon src={ICON_CHECK} />
                </IconContainer>
              </td>
            </tr>
            <tr>
              <th>조회수 예측</th>
              <td>
                <IconContainer>
                  <Icon src={ICON_X} />
                </IconContainer>
              </td>
              <td>
                <IconContainer>
                  <Icon src={ICON_X} />
                </IconContainer>
              </td>
              <td>
                <IconContainer>
                  <Icon src={ICON_CHECK} />
                </IconContainer>
              </td>
            </tr>
          </tbody>
        </PriceDetail>

        {/* 채널 분석 */}
        <PriceDetail>
          <thead>
            <tr>
              <Th_subtitle>내 채널 분석</Th_subtitle>
              <Th_subtitle />
              <Th_subtitle />
              <Th_subtitle />
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>관심사 분석</th>
              <td>
                <IconContainer>
                  <Icon src={ICON_CHECK} />
                </IconContainer>
              </td>
              <td>
                <IconContainer>
                  <Icon src={ICON_CHECK} />
                </IconContainer>
              </td>
              <td>
                <IconContainer>
                  <Icon src={ICON_CHECK} />
                </IconContainer>
              </td>
            </tr>
            <tr>
              <th>키워드 성과 분석</th>
              <td>
                <IconContainer>
                  <Icon src={ICON_CHECK} />
                </IconContainer>
              </td>
              <td>
                <IconContainer>
                  <Icon src={ICON_CHECK} />
                </IconContainer>
              </td>
              <td>
                <IconContainer>
                  <Icon src={ICON_CHECK} />
                </IconContainer>
              </td>
            </tr>
            <tr>
              <th>유사 채널 분석</th>
              <td>
                <IconContainer>
                  <Icon src={ICON_X} />
                </IconContainer>
              </td>
              <td>
                <IconContainer>
                  <Icon src={ICON_CHECK} />
                </IconContainer>
              </td>
              <td>
                <IconContainer>
                  <Icon src={ICON_CHECK} />
                </IconContainer>
              </td>
            </tr>
            <tr>
              <th>시청자 댓글 분석</th>
              <td>
                <IconContainer>
                  <Icon src={ICON_X} />
                </IconContainer>
              </td>
              <td>
                <IconContainer>
                  <Icon src={ICON_CHECK} />
                </IconContainer>
              </td>
              <td>
                <IconContainer>
                  <Icon src={ICON_CHECK} />
                </IconContainer>
              </td>
            </tr>
            <tr>
              <th>소셜미디어 언급 분석</th>
              <td>
                <IconContainer>
                  <Icon src={ICON_X} />
                </IconContainer>
              </td>
              <td>
                <IconContainer>
                  <Icon src={ICON_X} />
                </IconContainer>
              </td>
              <td>
                <IconContainer>
                  <Icon src={ICON_CHECK} />
                </IconContainer>
              </td>
            </tr>
          </tbody>
        </PriceDetail>

        {/* 스토리보드 */}
        <PriceDetail>
          <thead>
            <tr>
              <Th_subtitle>스토리보드</Th_subtitle>
              <Th_subtitle />
              <Th_subtitle />
              <Th_subtitle />
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>저장 페이지</th>
              <td>최대 5개</td>
              <td>최대 100개</td>
              <td>무제한</td>
            </tr>
            <tr>
              <th>보관 기간</th>
              <td>30일</td>
              <td>365일</td>
              <td>무제한</td>
            </tr>
            <tr>
              <th>내보내기</th>
              <td>10</td>
              <td>50</td>
              <td>150</td>
            </tr>
            <tr>
              <th>팀원 초대</th>
              <td>
                <IconContainer>
                  <Icon src={ICON_X} />
                </IconContainer>
              </td>
              <td>
                <IconContainer>
                  <Icon src={ICON_CHECK} />
                </IconContainer>
              </td>
              <td>
                <IconContainer>
                  <Icon src={ICON_CHECK} />
                </IconContainer>
              </td>
            </tr>
            <tr>
              <th>제목 / 태그 추천</th>
              <td>
                <IconContainer>
                  <Icon src={ICON_X} />
                </IconContainer>
              </td>
              <td>
                <IconContainer>
                  <Icon src={ICON_CHECK} />
                </IconContainer>
              </td>
              <td>
                <IconContainer>
                  <Icon src={ICON_CHECK} />
                </IconContainer>
              </td>
            </tr>
            <tr>
              <th>스크립트 생성</th>
              <td>
                <IconContainer>
                  <Icon src={ICON_X} />
                </IconContainer>
              </td>
              <td>
                <IconContainer>
                  <Icon src={ICON_CHECK} />
                </IconContainer>
              </td>
              <td>
                <IconContainer>
                  <Icon src={ICON_CHECK} />
                </IconContainer>
              </td>
            </tr>
            <tr>
              <th>콘티 자동 생성</th>
              <td>
                <IconContainer>
                  <Icon src={ICON_X} />
                </IconContainer>
              </td>
              <td>
                <IconContainer>
                  <Icon src={ICON_X} />
                </IconContainer>
              </td>
              <td>
                <IconContainer>
                  <Icon src={ICON_CHECK} />
                </IconContainer>
              </td>
            </tr>
          </tbody>
        </PriceDetail>
      </Main>
    </>
  );
};

export default Price;
