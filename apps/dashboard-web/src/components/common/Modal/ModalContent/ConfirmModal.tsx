'use client';

import { Button } from 'dashboard-storybook/src/components/Button/Button';
import { useRouter } from 'next/navigation';

import { useModalActions } from '@/store/modalStore';

interface ConfirmModalProps {
  message: string;
  callback?: () => void;
}
const ConfirmModal = ({ message, callback }: ConfirmModalProps) => {
  const router = useRouter();
  const { initializeModal } = useModalActions();

  return (
    <div className=" rounded-8 bg-grey00 w-[500px]  p-10">
      <p className="text-t3 text-grey700 mb-5 whitespace-pre-wrap text-center font-bold">
        {message}
      </p>

      <div className="flex justify-center gap-[1.25rem]">
        <Button theme="outlined" size="L" onClick={initializeModal}>
          취소
        </Button>
        <Button
          theme="contained"
          size="L"
          onClick={() => {
            callback?.();
            initializeModal();
          }}
        >
          확인
        </Button>
      </div>
    </div>
  );
};

export default ConfirmModal;
