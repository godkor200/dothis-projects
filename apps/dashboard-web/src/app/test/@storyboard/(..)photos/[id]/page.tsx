import Link from 'next/link';

const StoryboardDetail = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <div className="text-sky border-grey700 flex flex-col items-center gap-[50px]  border-2 font-bold">
      <p className="text-[30px] text-black">스토리보드 디테일 페이지(퍼렐로)</p>
      <Link href={`/photos`}>뒤로가기</Link>

      <p className="text-[24px]">스토리보드 디테일 페이지</p>

      <Link href={'?test=1'}> 서치파람 주입</Link>

      <Link href={`/photos/${id}/555`}>video artboard 페이지로 이동</Link>
    </div>
  );
};

export default StoryboardDetail;
