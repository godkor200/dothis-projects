import { Button } from 'dashboard-storybook/src/components/Button/Button';
import { useRouter } from 'next/navigation';
import Back from 'public/icons/back.svg';

interface Props {
  title?: string;
  button?: 'export' | 'close';
}

const StoryBoardHeader = ({ title = '', button }: Props) => {
  const router = useRouter();
  return (
    <div className="inline-flex gap-[24px] p-[30px]">
      <Back
        onClick={router.back}
        width={30}
        height={30}
        className="grow-0 cursor-pointer"
      />
      <p className=" grow items-start text-[26px] font-semibold leading-8">
        {title}
      </p>
      <div className="grow-0">
        {button &&
          (button === 'close' ? (
            <p onClick={() => window.history.go(2)}>닫기</p>
          ) : (
            <Button size="S" theme="outlined-grey">
              내보내기
            </Button>
          ))}
      </div>
    </div>
  );
};

export default StoryBoardHeader;
