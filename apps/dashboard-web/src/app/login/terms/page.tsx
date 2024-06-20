'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'dashboard-storybook/src/components/Button/Button';
import { Input } from 'dashboard-storybook/src/components/Input/Input';
import type { Route } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type PropsWithChildren, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import TermsModal from '@/components/common/Modal/ModalContent/TermsModal';
import SvgComp from '@/components/common/SvgComp';
import type { TermsKey } from '@/constants/schema/loginTerms';
import { LOGIN_TERMS_SCHEMA } from '@/constants/schema/loginTerms';
import { useSignUpTermsMutation } from '@/hooks/react-query/mutation/useSignUpTermsMutation';
import useGetUserInfo from '@/hooks/react-query/query/useGetUserInfo';
import { useModalActions } from '@/store/modalStore';
import { convertKeywordsToArray, isHashKeyword } from '@/utils/keyword';

import { CheckBox } from './style';

const TERMS_OPTIONS: {
  title: string;
  key: TermsKey;
  required: boolean;
  route?: Route;
}[] = [
  {
    title: '서비스 이용 약관 동의',
    key: 'service',
    required: true,
    route: '/policy',
  },
  {
    title: '개인정보 처리방침 동의',
    key: 'privacy',
    required: true,
    route: '/privacy',
  },
  {
    title: '마케팅 정보 제공 동의',
    key: 'marketing',
    required: true,
  },
];

const Page = () => {
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

  const { setIsModalOpen, setModalContent } = useModalActions();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = methods;

  const marketingState = watch('marketing');
  const privacyState = watch('privacy');
  const serviceState = watch('service');

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

          router.replace('/');
        },
      },
    );
  };

  useEffect(() => {
    if (errors.privacy || errors.service) {
      setModalContent(
        <TermsModal
          errorMessage={errors.service?.message || errors.privacy?.message}
        />,
      );
      setIsModalOpen(true);
      return;
    }
  }, [errors]);

  return (
    <div className="border-grey400 relative mx-auto flex w-[600px] min-w-[600px] flex-col  items-center rounded-[30px] border bg-white px-[100px] ">
      {/* {hasDismissButton && (
        <SvgComp
          icon="Close"
          size={24}
          className="absolute right-[24px] top-[24px] cursor-pointer"
        />
      )} */}
      <div className="mb-[84px] mt-[100px] flex items-center gap-[12px]">
        <SvgComp icon="SideLogo" size={50} />
        <SvgComp icon="LogoTitle" width={170} height={70} />
      </div>

      <div className="mb-[58px] flex  w-full flex-1 justify-center">
        <div className="w-full flex-grow">
          <Input placeholder={userData?.userEmail!} disabled />
        </div>
      </div>

      <div className="flex self-start px-[20px]">
        <CheckBox
          $size="md"
          type="checkbox"
          className="mr-[16px]"
          checked={[marketingState, serviceState, privacyState].every(
            (item) => item === true,
          )}
          onClick={() => {
            if (
              [marketingState, serviceState, privacyState].every(
                (item) => item === true,
              )
            ) {
              setValue('marketing', false);
              setValue('privacy', false);
              setValue('service', false);
              return;
            }

            setValue('marketing', true);
            setValue('privacy', true);
            setValue('service', true);
          }}
        />
        <p className="text-grey900 font-bold">약관 전체동의</p>
      </div>

      <div className="bg-grey300 my-[24px] h-[1px] w-full" />

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="mb-[75px] flex flex-1 flex-col items-center gap-[12px]">
          {TERMS_OPTIONS.map(({ title, key, required, route }) => (
            <div
              className="text-grey700 flex w-full flex-1 self-start px-[20px] text-[14px] font-[500]"
              key={key}
            >
              <CheckBox
                $size="md"
                type="checkbox"
                {...register(key)}
                className="mr-[16px]"
              />
              <span>
                {'('}
                {required ? '필수' : '선택'}
                {')'} {title}
              </span>

              {route && (
                <Link href={route} className="ml-auto">
                  <p className="text-grey500 text-[12px] underline underline-offset-4">
                    보기
                  </p>
                </Link>
              )}
            </div>
          ))}
        </div>

        <button className="bg-primary500 rounded-10 mb-[127px] w-full py-[16px] font-bold text-white">
          동의하고 시작하기
        </button>
      </form>
    </div>
  );
};

export default Page;

const TermsBox = ({ children }: PropsWithChildren) => {
  return (
    <div className="text-grey00 bg-grey700 w-[160px] rounded-[50px] py-1 text-center text-[12px]">
      {children}
    </div>
  );
};
