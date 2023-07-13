'use client';

import { styled } from 'styled-components';

import SvgComp from '../share/SvgComp';
import * as Style from './style';
function GoogleBtn() {
  return (
    <Style.GoogleLink href="https://api.dothis.kr/v1/auth/google-login">
      <Style.Container>
        <Style.Button>
          <SvgComp icon="GoogleSvg" size={26} />
          <Style.Text>Google 로그인</Style.Text>
        </Style.Button>
      </Style.Container>
    </Style.GoogleLink>
  );
}

export default GoogleBtn;
