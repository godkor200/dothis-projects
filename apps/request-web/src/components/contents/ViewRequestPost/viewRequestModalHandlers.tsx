import { Text } from '@chakra-ui/react';
import FormValidMessage from '@dothis/share';
import Input from '@dothis/share';
import SubmitModalTemplate from '@dothis/share';
import { useModalStore } from '@dothis/share';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { RequestPostDomain } from '../../../domain';
import Textarea from '../../ui/Textarea';

const 요청포기 = (onSubmit: (refusalReason: string) => void) => {
  const modalStore = useModalStore.getState();

  modalStore.open('요청포기', {
    title: '요청 포기',
    Component: () => {
      const textareaRef = useRef<HTMLTextAreaElement | null>(null);

      return (
        <SubmitModalTemplate
          onSubmit={() => onSubmit(textareaRef.current?.value ?? '')}
          onCancel={() => modalStore.close('요청포기')}
          w={456}
        >
          <Text as="p" fontWeight="m">
            수락한 요청을 포기하는 사유를 적어주세요.
            <br />
            입력하신 내용은 요청자에게 전달됩니다.
          </Text>
          <Textarea ref={textareaRef} theme="gray" h={88} w="100%" mt={14} />
        </SubmitModalTemplate>
      );
    },
  });
};

const 요청삭제 = (onSubmit: () => void) => {
  const modalStore = useModalStore.getState();

  modalStore.open('요청삭제', {
    title: '요청 삭제',
    Component: () => {
      return (
        <SubmitModalTemplate
          onSubmit={onSubmit}
          onCancel={() => modalStore.close('요청삭제')}
          w={456}
        >
          <p>요청을 삭제하겠습니까?</p>
        </SubmitModalTemplate>
      );
    },
  });
};

const 요청수락 = (onSubmit: () => void) => {
  const modalStore = useModalStore.getState();

  modalStore.open('요청수락', {
    title: '요청 수락',
    Component: () => {
      return (
        <SubmitModalTemplate
          onSubmit={onSubmit}
          onCancel={() => modalStore.close('요청수락')}
          w={456}
        >
          {/*<p>*/}
          {/*  요청 수락 이후 <b>14일 이내</b> 콘텐츠 업로드가 완료되어야 합니다.*/}
          {/*</p>*/}
          <p>요청을 수락하시겠습니까?</p>
        </SubmitModalTemplate>
      );
    },
  });
};
const 요청거절 = (onSubmit: () => void) => {
  const modalStore = useModalStore.getState();

  modalStore.open('요청거절', {
    title: '요청 거절',
    Component: () => {
      return (
        <SubmitModalTemplate
          onSubmit={onSubmit}
          onCancel={() => modalStore.close('요청거절')}
          w={456}
        >
          <p>요청을 거절하시겠습니까?</p>
        </SubmitModalTemplate>
      );
    },
  });
};

const 등록Schema = z
  .object({
    solvedUrl: RequestPostDomain.schema.shape.solvedUrl.unwrap(),
  })
  .required();

export const 등록콘텐츠URL = (onSubmit: (solvedUrl: string) => void) => {
  const modalStore = useModalStore.getState();

  modalStore.open('등록콘텐츠URL', {
    title: '등록 콘텐츠 URL',
    Component: () => {
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<z.infer<typeof 등록Schema>>({
        resolver: zodResolver(
          RequestPostDomain.schema.pick({ solvedUrl: true }),
        ),
      });

      const submit = handleSubmit(({ solvedUrl }) => {
        onSubmit(solvedUrl);
      });

      return (
        <SubmitModalTemplate
          submitText="등록"
          onSubmit={submit}
          onCancel={() => modalStore.close('등록콘텐츠URL')}
          w={456}
        >
          <Text mb={8} fontWeight="m">
            유튜브 콘텐츠의 주소를 입력해주세요.
          </Text>
          <Input placeholder="https://" {...register('solvedUrl')} />
          {errors.solvedUrl && (
            <FormValidMessage errorMessage={errors.solvedUrl.message} mt={4} />
          )}
        </SubmitModalTemplate>
      );
    },
  });
};

export const 등록콘텐츠리뷰 = (onSubmit: () => void) => {
  const modalStore = useModalStore.getState();

  modalStore.open('등록콘텐츠리뷰', {
    title: '등록 확인',
    Component: () => {
      return (
        <SubmitModalTemplate
          submitText="등록 확인"
          onSubmit={onSubmit}
          onCancel={() => modalStore.close('등록콘텐츠리뷰')}
          w={456}
        >
          <p>크리에이터가 업로드한 콘텐츠를 확인하셨습니까?</p>
        </SubmitModalTemplate>
      );
    },
  });
};

const 요청가져오기 = (onSubmit: () => void) => {
  const modalStore = useModalStore.getState();

  modalStore.open('요청가져오기', {
    title: '요청 수락',
    Component: () => {
      return (
        <SubmitModalTemplate
          onSubmit={onSubmit}
          onCancel={() => modalStore.close('요청가져오기')}
          w={456}
        >
          {/*<p>*/}
          {/*  요청 수락 이후 <b>14일 이내</b> 콘텐츠 업로드가 완료되어야 합니다.*/}
          {/*</p>*/}
          <p>요청을 수락하시겠습니까?</p>
        </SubmitModalTemplate>
      );
    },
  });
};

const viewRequestModalHandlers = {
  요청포기,
  요청삭제,
  요청수락,
  요청거절,
  요청가져오기,
  등록콘텐츠리뷰,
  등록콘텐츠URL,
};

export default viewRequestModalHandlers;
