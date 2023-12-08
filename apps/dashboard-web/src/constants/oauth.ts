import type { colors } from '@dothis/theme/dashboard/colors';
import type * as Icons from 'public/aseets/svg';
import type { HTMLProps } from 'react';

export type SVGIconType = keyof typeof Icons;

export interface OauthInterface {
  iconName: SVGIconType;
  title: string;
  colorSchemeName: keyof typeof colors;
  // tailwind className을 타입추론하고 싶은데, 어떻게 추출하는지 모르겠네요 ㅠㅠ
  // linkData: string; 나중에 Link도 다양해지면 여기서 주입시켜줄 것 같습니다
}

export const OAUTH_DATA: OauthInterface[] = [
  {
    iconName: 'GoogleSvg',
    title: 'Google 로그인',
    colorSchemeName: 'grey900',
  },
  {
    iconName: 'YoutubeSvg',
    title: 'YouTube 로그인',
    colorSchemeName: 'primary500',
  },
];
