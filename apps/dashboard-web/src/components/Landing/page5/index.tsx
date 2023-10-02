import Image from 'next/image';
import { useEffect, useState } from 'react';

import { theme } from '../style';
import { Background, Description, Img, Main, Title } from './style';
const SVGPATH = '/images/landing/svg/';

export default function Page5() {
  const [svgPath, setSvgPath] = useState<string>(
    SVGPATH + 'Landing_Section5_Image.svg',
  ); // 기본 경로 설정

  useEffect(() => {
    // 화면 크기에 따라 SVG 파일 경로 조정
    const handleResize = () => {
      if (window.innerWidth < parseInt(theme.breakpoints.mobile)) {
        setSvgPath(SVGPATH + 'Landing_Section5_Image_mobile.svg'); // 작은 화면에 맞는 경로 설정
      } else {
        setSvgPath(SVGPATH + 'Landing_Section5_Image.svg'); // 큰 화면에 맞는 경로 설정

      }
    };

    handleResize(); // 초기 로딩 시 설정
    window.addEventListener('resize', handleResize); // 화면 크기 변경 시 설정 업데이트
    return () => {
      window.removeEventListener('resize', handleResize); // 컴포넌트 언마운트 시 이벤트 리스너 제거
    };
  }, []);

  return (
    <Background>
      <Main>
        <Title>1초 간편 회원가입으로 지금 바로 시작해보세요.</Title>
        <Img
          src={svgPath}
          alt={''}
          width={0}
          height={0}
          sizes="100vm"
          style={{ width: '80%', height: 'auto' }}
        />
      </Main>
    </Background>
  );
}
