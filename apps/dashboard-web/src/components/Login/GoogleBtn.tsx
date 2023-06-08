'use client';

import { styled } from 'styled-components';

import SvgComp from '../share/SvgComp';

function GoogleBtn() {
  return (
    <GoogleLink href="https://api.dothis.kr/v1/auth/google-login">
      <Container>
        <Button>
          <SvgComp icon="GoogleSvg" size={26} />
          <Text>Google 로그인</Text>
        </Button>
      </Container>
    </GoogleLink>
  );
}

export default GoogleBtn;

const GoogleLink = styled.a`
  display: block;
  width: 100%;
  margin-top: 3.75rem;
`;

const Container = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1rem 0;

  border: 1px solid #f4f4f5;
  border-radius: 0.5rem;

  text-align: center;
`;

const Button = styled.button`
  display: inline-flex;

  gap: 0.7rem;
`;

const Text = styled.p`
  font-weight: 700;
`;
