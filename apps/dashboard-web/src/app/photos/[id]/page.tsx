import Link from 'next/link';

const IdPage = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <div className="text-grey700 p-10 text-[25px] font-bold">
      스토리보드 아이디 페이지 {id}
    </div>
  );
};

export default IdPage;
