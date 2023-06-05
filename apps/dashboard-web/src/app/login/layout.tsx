'use client';

import styled from 'styled-components';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OuterContainer>
      <LoginLayoutConatiner>{children}</LoginLayoutConatiner>
    </OuterContainer>
  );
}

const OuterContainer = styled.div`
  padding: 10rem 0;

  background-color: #f4f4f5;

  @media (min-width: 768px) {
    padding: 15rem 0;
  }

  @media (min-width: 1280px) {
    padding: 25rem 0;
  }
`;

const LoginLayoutConatiner = styled.section`
  width: 100%;
  max-width: 32rem;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  background-color: white;
  border-radius: 1rem;

  @media (min-width: 768px) {
    padding: 2.5rem;
  }
`;
