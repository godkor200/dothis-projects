'use client';

import { styled } from 'styled-components';

import SvgComp from '../share/SvgComp';

function GoogleBtn() {
  return (
    <Container>
      <Button>
        <SvgComp icon="GoogleSvg" size={26} />
        <Text>
          <a href="https://api.dothis.kr/v1/auth/google-login">Google 로그인</a>
        </Text>
      </Button>
    </Container>
  );
}

export default GoogleBtn;

const Container = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 3.75rem;

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
