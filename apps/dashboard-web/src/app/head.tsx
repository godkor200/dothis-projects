export default function RootHeader() {
  return (
    <>
      <title>두디스</title>
      <meta
        name="description"
        content=" 데이터로 기획하는 영상 기획 보조 도구, 두디스"
      />
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:title" content="두디스(Dothis)" />
      <meta
        property="og:description"
        content="데이터로 기획하는 영상 기획 보조 도구, 두디스."
      />

      <meta
        property="og:image"
        content="https://dothis-lending.s3.ap-northeast-2.amazonaws.com/dothisLogo.png"
      />
      {/* 해당 size는 배포 후 확인해보고 수정해보겠습니다.*/}

      <meta
        name="google-site-verification"
        content="mTY9n8vpWvhgrwD6mm80iaAIT6-GscpvxkEq7hOCmas"
      />
      {/* 구글 서치 콘솔  */}

      <meta
        name="naver-site-verification"
        content="61cf01795f8a825e98136f98401fd7f3aa1bfa20"
      />
      {/* 네이버 서치어드바이저  */}
    </>
  );
}
