'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'dashboard-storybook/src/components/Button/Button';
import { Input } from 'dashboard-storybook/src/components/Input/Input';
import { useRouter } from 'next/navigation';
import { type PropsWithChildren, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { LOGIN_TERMS_SCHEMA } from '@/constants/schema/loginTerms';
import { useSignUpTermsMutation } from '@/hooks/react-query/mutation/useSignUpTermsMutation';
import useGetUserInfo from '@/hooks/react-query/query/useGetUserInfo';
import { convertKeywordsToArray, isHashKeyword } from '@/utils/keyword';

import { CheckBox } from '../common/Checkbox/style';
import Modal from '../common/Modal/Modal';
import TermsContents from './TermsContents';

const LoginTerms = () => {
  const [onError, setOnError] = useState(false);

  const { data: userData } = useGetUserInfo();

  const { mutate } = useSignUpTermsMutation();

  const router = useRouter();
  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(LOGIN_TERMS_SCHEMA),
    defaultValues: {
      service: false,
      privacy: false,
      marketing: false,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: any) => {
    mutate(
      { body: { isAgree: true } },
      {
        onSuccess: () => {
          if (
            !isHashKeyword(convertKeywordsToArray(userData?.personalizationTag))
          ) {
            router.replace('/auth/choose-keyword');
            return;
          }

          router.replace('/contents');
        },
      },
    );
  };

  useEffect(() => {
    (errors.privacy || errors.service) && setOnError(true);
  }, [errors]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-10 flex flex-col items-center gap-[10px]">
          <div className="flex items-center gap-[6px]">
            <CheckBox $size="md" type="checkbox" {...register('service')} />
            <span className="text-grey900 text-[12px] font-bold">
              {'('}필수{')'}
            </span>
            <TermsBox>서비스 이용 약관 동의 </TermsBox>
          </div>

          <div className="flex items-center gap-[6px]">
            <CheckBox $size="md" type="checkbox" {...register('privacy')} />
            <span className="text-grey900 text-[12px] font-bold">
              {'('}필수{')'}
            </span>
            <TermsBox>개인정보 처리방침 동의</TermsBox>
          </div>
          <div className="flex items-center gap-[6px]">
            <CheckBox $size="md" type="checkbox" {...register('marketing')} />
            <span className="text-grey900 text-[12px] font-bold">
              {'('}선택{')'}
            </span>
            <TermsBox>마케팅 정보 제공 동의</TermsBox>
          </div>
        </div>

        <div className="mb-5 flex  justify-center">
          <div className="w-[322px]">
            <Input placeholder={userData?.userEmail!} disabled />
          </div>
        </div>

        <div className="flex justify-center">
          <Button size="L" theme="contained" type="submit">
            가입하기
          </Button>
        </div>
      </form>
      {onError && (
        <Modal dismissCallback={() => setOnError(false)}>
          <TermsContents
            errorMessage={errors.service?.message || errors.privacy?.message}
            setOnError={setOnError}
          />
        </Modal>
      )}
    </>
  );
};

export default LoginTerms;

const TermsBox = ({ children }: PropsWithChildren) => {
  return (
    <div className="text-grey00 bg-grey700 w-[160px] rounded-[50px] py-1 text-center text-[12px]">
      {children}
    </div>
  );
};