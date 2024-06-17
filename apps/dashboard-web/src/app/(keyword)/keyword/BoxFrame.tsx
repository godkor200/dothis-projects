import { cn } from '@/utils/cn';

const BoxFrame = ({
  children,
  isPositionProperty,
}: {
  children: React.ReactNode;
  isPositionProperty?: Boolean;
}) => {
  return (
    <div
      className={cn('border-grey400 rounded-10  border px-[30px] py-[20px]', {
        relative: isPositionProperty,
      })}
    >
      {children}
    </div>
  );
};

export default BoxFrame;
