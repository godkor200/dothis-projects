import { cn } from '@/utils/cn';

const BoxFrame = ({
  children,
  isPositionProperty,
  isPaddingX,
}: {
  children: React.ReactNode;
  isPaddingX?: boolean;
  isPositionProperty?: Boolean;
}) => {
  return (
    <div
      className={cn(
        'border-grey400 rounded-10  border px-[30px] py-[20px] flex flex-col',
        {
          relative: isPositionProperty,
          'px-0': isPaddingX,
        },
      )}
    >
      {children}
    </div>
  );
};

export default BoxFrame;
