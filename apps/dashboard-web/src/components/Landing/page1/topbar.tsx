import Image from 'next/image';
import styled from 'styled-components';

const Bar = styled.div`
  position: absolute;
  top: 0;
  width: 100vw;
  padding-top: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  max-width: 1440px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 10px;

  button {
    width: 160px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radisu: 4px;

    font-size: 20px;
  }
`;

const SVG_SIZE = 32;

export default function Topbar() {
  const SVG = ({ src }: { src: string }) => {
    return <Image src={src} alt={''} width={32} height={32} />;
  };

  return (
    <Bar>
      <Image
        src={'/images/landing/logo_medium.png'}
        alt={'logo_medium'}
        width={204}
        height={48}
      />
      <ButtonsContainer>
        <button>
          <SVG src={'./content.svg'} />
          <p>콘텐츠 분석</p>
        </button>
        <button>
          <SVG src={'./magicpen.svg'} />
          <p>키워드 분석</p>
        </button>
        <button>
          <SVG src={'./user.svg'} />
          <p>내 채널 분석</p>
        </button>
        <button>
          <SVG src={'./contact.svg'} />
          <p>Contact</p>
        </button>
      </ButtonsContainer>
    </Bar>
  );
}
