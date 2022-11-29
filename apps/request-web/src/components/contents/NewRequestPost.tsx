import { Box, Text } from '@chakra-ui/react';
import type { EditorT } from '@dothis/share';
import Button from '@dothis/share';
import Editor from '@dothis/share';
import FormErrorMessages from '@dothis/share';
import FormValidMessage from '@dothis/share';
import Input from '@dothis/share';
import FormatInput from '@dothis/share';
import SubmitModalTemplate from '@dothis/share';
import SelectMenu from '@dothis/share';
import SelectMenuButton from '@dothis/share';
import SelectMenuList from '@dothis/share';
import ToastBox from '@dothis/share';
import {
  errorMessage,
  isErrorMessage,
  isMessage,
  useModalOptStore,
  useModalStore,
} from '@dothis/share';
import { isNilStr, removeSeparators } from '@dothis/share';
import { css } from '@emotion/react';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Creator, RequestPost } from '@prisma/client';
import clsx from 'clsx';
import { isString } from 'fp-ts/lib/string';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import type { ReactNode } from 'react';
import React, { useCallback, useMemo, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import type { z } from 'zod';

import ViewRequestPost from '@/components/contents/ViewRequestPost';
import { PAGE_KEYS, pagePath } from '@/constants';
import { toast } from '@/pages/_app';
import { requestPostImageUpload } from '@/utils/requestPostImageUpload';
import { trpc } from '@/utils/trpc';

import {
  RequestFundingDomain,
  RequestPostDomain,
  UserDomain,
} from '../../domain';
import SearchInput from '../ui/SearchInput';

const formValid = RequestPostDomain.schema
  .pick({
    title: true,
    category: true,
    content: true,
  })
  .extend({
    creatorName: UserDomain.schema.shape.name,
    quantity: RequestFundingDomain.schema.shape.quantity
      .refine(
        (v) => {
          return v >= 1000;
        },
        {
          message: '후원금은 1,000원 부터 등록가능합니다.',
        },
      )
      .optional(),
  });

const defaultValues = {
  content: '',
  title: '',
  creatorName: undefined,
  quantity: undefined,
  category: undefined,
};
type Props = {
  editRequestPostId?: RequestPost['id'];
  creatorId?: Creator['id'];
  onSubmit?: () => void;
};
export default function NewRequestPost({
  editRequestPostId,
  creatorId,
  onSubmit,
}: Props) {
  const trpcUtils = trpc.useContext();
  const modalStore = useModalStore();
  const { data: session } = useSession();

  const isEditMode = useMemo(() => !!editRequestPostId, [editRequestPostId]);

  const editorRef = useRef<EditorT>(null);
  const { isInnerModal } = useModalOptStore();

  const [contentsLength, setContentsLength] = React.useState(0);

  const [createMutation, updateMutation, deleteMutation] = [
    trpc.requestPost.create.useMutation(),
    trpc.requestPost.update.useMutation({
      onSuccess() {
        trpcUtils.requestPost.getUserForCreator.invalidate();
        trpcUtils.creator.getRequests.invalidate();
        trpcUtils.user.getSearchRequests.invalidate();
        if (session?.user.id)
          trpcUtils.user.get.invalidate({ id: session?.user.id });
        if (editRequestPostId)
          trpcUtils.requestPost.getDetail.invalidate({
            id: editRequestPostId,
          });
      },
    }),
    trpc.requestPost.delete.useMutation(),
  ];

  const {
    register,
    control,
    formState: { errors },
    watch,
    setValue,
    setError,
    handleSubmit,
    reset,
  } = useForm<z.infer<typeof formValid>>({
    defaultValues,
    resolver: zodResolver(formValid),
  });

  const [watchTitle] = watch(['title']);

  const [editRequestPost, setEditRequestPost] = React.useState<RequestPost>();
  // 수정 요청
  const submitEditRequestPost = handleSubmit(async ({ title, category }) => {
    if (!editRequestPostId) return;
    try {
      if (!editRequestPost) throw Error('요청을 찾을 수 없습니다.');
      if (!editorRef.current?.editor) {
        throw Error('에디터를 찾을 수 없습니다.');
      }
      // 해당 postId를 넘겨 폴더 구분하여 이미지 업로드, 이미지 업로드 후 필드 업데이트
      const resData = await requestPostImageUpload(
        editorRef.current,
        editRequestPostId,
      );

      if (isErrorMessage(resData)) {
        ToastBox.toast(resData);
        throw Error('이미지 업로드에 실패했습니다.');
      }

      // 바뀐 이미지 url의 컨텐츠로 요청 업데이트
      updateMutation.mutate(
        {
          id: editRequestPostId,
          title,
          category,
          content: editorRef.current.editor.getContent({ format: 'raw' }),
          thumbnailUrl: isMessage(resData)
            ? editRequestPost?.thumbnailUrl
            : resData.thumbnailLocation ?? editRequestPost?.thumbnailUrl,
        },
        {
          onSuccess(data) {
            ToastBox.successToast('요청을 수정하였습니다.');
            modalStore.close(PAGE_KEYS.newPostRequest);
            modalStore.close('요청수정');
            reset();
            onSubmit?.();
            trpcUtils.requestPost.get.invalidate({
              id: editRequestPostId,
            });
            trpcUtils.requestPost.getRecommends.invalidate();

            if (session?.user.id) {
              trpcUtils.creator.getRequests.invalidate({
                userId: session?.user.id,
              });
              trpcUtils.user.getSearchRequests.invalidate({
                userId: session?.user.id,
              });
            }
          },
        },
      );
    } catch (e) {
      console.error(e);
      toast(
        ToastBox.getMessageOptions(
          errorMessage({
            message: isString(e) ? e : '요청 중 에러가 발생했습니다.',
          }),
        ),
      );
    }
  });
  // 생성 요청
  const submitCreateRequestPost = handleSubmit(
    async ({ creatorName, ...form }) => {
      // 크리에이터 매칭
      const matchedCreator = await (() => {
        if (!creatorName) return;
        return trpcUtils.creator.getMatched.fetch({
          name: creatorName,
        });
      })();

      // 크리에이터 네임은 있는데 매칭되는 크리에이터가 없으면 에러
      if (creatorName && !matchedCreator) {
        setError(
          'creatorName',
          { message: '매칭되는 크리에이터가 없습니다.' },
          { shouldFocus: true },
        );
      }
      if (!session?.user.id) throw Error('사용자 정보를 찾을 수 없습니다.');

      const user = await trpcUtils.user.get.fetch({
        id: session.user.id,
      });
      if (!user) throw Error('사용자 정보를 찾을 수 없습니다.');

      if (form.quantity && user.totalPoint < form.quantity) {
        return setError('quantity', { message: '보유 포인트가 부족합니다.' });
      }

      // 요청을 생성해서 생성된 Post의 id를 얻음
      const data = await createMutation.mutateAsync({
        ...form,
        creatorId:
          creatorId ?? (matchedCreator ? matchedCreator.id : undefined),
        content: '',
        requestUserId: user.id,
      });
      const newRequestId = data.id;

      // 이미지 업로드, 이미지 적용된 컨텐츠 업데이트
      try {
        if (!editorRef.current?.editor) {
          throw Error('에디터를 찾을 수 없습니다.');
        }
        // 해당 postId를 넘겨 폴더 구분하여 이미지 업로드, 이미지 업로드 후 필드 업데이트
        const resData = await requestPostImageUpload(
          editorRef.current,
          newRequestId,
        );

        if (isErrorMessage(resData)) {
          ToastBox.toast(resData);
          throw Error('이미지 업로드에 실패했습니다.');
        }

        // 바뀐 이미지 url의 컨텐츠로 요청 업데이트
        updateMutation.mutate(
          {
            id: newRequestId,
            content: editorRef.current.editor.getContent({ format: 'raw' }),
            thumbnailUrl: isMessage(resData) ? null : resData.thumbnailLocation,
          },
          {
            onSuccess(data) {
              ToastBox.successToast('요청을 보냈습니다!');
              modalStore.close(PAGE_KEYS.newPostRequest);
              reset();
              onSubmit?.();

              modalStore.open('view modal submit', {
                title: '요청 내역 확인',
                Component: () => (
                  <SubmitModalTemplate
                    submitText="보기"
                    onSubmit={() => {
                      modalStore.close('view modal submit');
                      ViewRequestPost.modalOpen({
                        requestPost: data,
                      });
                    }}
                    onCancel={() => modalStore.close('view modal submit')}
                  >
                    요청한 내용을 확인하시겠습니까?
                  </SubmitModalTemplate>
                ),
              });
            },
          },
        );
      } catch (e) {
        console.error(e);
        // 에러시 컨텐츠 없이 생성했던 요청 삭제
        deleteMutation.mutate({ id: newRequestId });
        toast(
          ToastBox.getMessageOptions(
            errorMessage({
              message: isString(e) ? e : '요청 중 에러가 발생했습니다.',
            }),
          ),
        );
      }
    },
  );

  return (
    <>
      <form css={style} className={clsx(isInnerModal && 'in-modal')}>
        {/* 제목 */}
        <div className="form-cell">
          <div>
            <Input
              isInvalid={!!errors.title}
              placeholder="제목 *"
              {...register('title')}
            />

            <FormValidMessage mt={4} errorMessage={!!errors.title}>
              {watchTitle.length}/100
            </FormValidMessage>
          </div>
        </div>

        {/* 내용 */}
        <Box className="form-cell" mt={14}>
          <Editor
            init={{ placeholder: '내용 *' }}
            // initialValue={editRequestPost?.data?.content}
            wrap={{ h: 280 }}
            ref={editorRef}
            onEditorChange={(_, editor) => {
              const length = editor.getContent({ format: 'text' }).length;
              setContentsLength(length);
            }}
            onBeforeAddUndo={(evt, editor) => {
              const length = editor.getContent({ format: 'text' }).length;
              if (length > RequestPostDomain.constants.maxContentsLength) {
                evt.preventDefault();
              }
            }}
            onInit={() => {
              if (!editRequestPostId) return;
              if (editRequestPost) return;
              trpcUtils.requestPost.get
                .fetch({
                  id: editRequestPostId,
                })
                .then((data) => {
                  if (!data) return;
                  setValue('title', data.title);
                  setValue('category', data.category);
                  setEditRequestPost(data);
                  editorRef.current?.editor?.setContent(data.content);
                });
            }}
          />

          <FormValidMessage mt={4}>
            {contentsLength}/{RequestPostDomain.constants.maxContentsLength}
          </FormValidMessage>
        </Box>
        {/* 크리에이터 */}
        {!isEditMode && !creatorId && (
          <Box className="form-cell" mt={4}>
            <Controller
              control={control}
              name="creatorName"
              render={({ field }) => (
                <SearchInput
                  isInvalid={!!errors.creatorName}
                  placeholder="크리에이터 지정(선택사항)"
                  onItemSelect={(v) => {
                    field.onChange(v);
                  }}
                  {...field}
                />
              )}
            />
          </Box>
        )}
        {/* 후원금 */}
        {!isEditMode && (
          <Box className="form-cell" mt={14}>
            <FormatInput
              placeholder="후원금 (1,000P부터)"
              format="thousandsSeparators"
              isInvalid={!!errors.quantity}
              Right={
                <Text as="span" ml={4} display="flex" alignItems="center">
                  Point
                </Text>
              }
              {...register('quantity', {
                setValueAs(v) {
                  if (isNilStr(v)) return undefined;
                  return typeof v === 'number'
                    ? v
                    : parseInt(removeSeparators(v));
                },
              })}
            />

            <FormValidMessage>
              후원금은 100P 단위로 입력가능합니다.
            </FormValidMessage>
          </Box>
        )}
        {/* 카테고리 */}
        <Box className="form-cell" mt={4}>
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <SelectMenu theme="graybox">
                <SelectMenuButton ref={field.ref} isInvalid={!!errors.category}>
                  {field.value ? (
                    RequestPostDomain.constants.categoryKor.get(field.value)
                  ) : (
                    <Text color="gray.60">카테고리 선택 *</Text>
                  )}
                </SelectMenuButton>
                <SelectMenuList
                  selectedItemValue={field.value ? field.value : undefined}
                  listMap={RequestPostDomain.constants.categoryKor}
                  onItemSelect={(item) => {
                    field.onChange(item);
                  }}
                />
              </SelectMenu>
            )}
          />
        </Box>
      </form>
      {/* CTA */}
      <footer css={footerStyle}>
        <div>
          <FormErrorMessages errors={errors} />
        </div>
        <Button
          theme="primary"
          onClick={isEditMode ? submitEditRequestPost : submitCreateRequestPost}
          w={120}
          h={50}
          fontSize={15}
        >
          {isEditMode ? '수정' : '등록'}
        </Button>
      </footer>
    </>
  );
}

const style = css`
  &.in-modal {
    padding: 16px 16px 0 16px;
  }

  .request-post-form-row1 {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .form-cell {
    display: flex;
    flex-direction: column;
    justify-content: center;

    label {
      margin-bottom: 14px;
    }
  }
`;
const footerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 22px;
  margin-top: 14px;
`;

NewRequestPost.title = () => '새로운 요청 등록';
NewRequestPost.ModalLink = function NewRequestPostModalLink({
  children,
  ...props
}: Props & { children: ReactNode }) {
  const modalStore = useModalStore();
  const handleModalOpen = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      modalStore.open(PAGE_KEYS.newPostRequest, {
        Component: () => (
          <Box w={640}>
            <NewRequestPost {...props} />
          </Box>
        ),
        title: NewRequestPost.title(),
        modalOpt: {
          closeOnOverlayClick: false,
          trapFocus: false,
        },
      });
    },
    [],
  );

  return (
    <Link href={pagePath.newPostRequest()} onClick={handleModalOpen}>
      {children}
    </Link>
  );
};
