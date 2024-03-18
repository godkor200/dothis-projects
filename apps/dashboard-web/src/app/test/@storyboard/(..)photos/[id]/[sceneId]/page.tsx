import Link from 'next/link';

const ScenePage = () => {
  return (
    <div className="text-sky border-grey700 flex flex-col items-center gap-[50px]  border-2 font-bold">
      <p className="text-[30px] text-black">영상 아트보드 페이지(퍼렐로)</p>
      <Link href={`/photos`}>뒤로가기</Link>

      <p className="text-[24px]">영상 아트보드 페이지</p>

      <Link href={'?test=1'}> 서치파람 주입</Link>
    </div>
  );
};

export default ScenePage;
