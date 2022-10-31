import { Box, Center, Flex, VStack } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { zodResolver } from '@hookform/resolvers/zod';
import type { User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '@/components/ui/Button';
import FormValidMessage from '@/components/ui/FormValidMessage';
import FormatInput from '@/components/ui/Input/FormatInput';
import UserLink from '@/components/ui/Links/UserLink';
import ToastBox from '@/components/ui/ToastBox';
import UserAvatar from '@/components/ui/UserAvatar';
import RequestFundingDomain from '@/domain/RequestFundingDomain';
import type RequestPostDomain from '@/domain/RequestPostDomain';
import UserDomain from '@/domain/UserDomain';
import useMustLoginFirst from '@/hooks/useMustLoginFirst';
import {
  colors,
  fontWeights,
  mediaQueries,
} from '@/styles/chakraTheme/variable';
import domUtils from '@/utils/domUtils';
import numberUtils from '@/utils/numberUtils';
import stringUtils from '@/utils/stringUtils';
import trpcHooks from '@/utils/trpcHooks';

type Props = {
  user?: User;
  requestPost: Pick<
    NonNullable<RequestPostDomain.GetItemT>,
    'id' | 'requestFundings'
  >;
};

const formSchema = z.object({
  quantity: RequestFundingDomain.schema.shape.quantity.min(200, {
    message: '최소 200원 이상 입력해주세요.',
  }),
});
type Form = z.infer<typeof formSchema>;

const 후원금펀딩 = ({ requestPost }: Props) => {
  const { data: session, status } = useSession();
  const mustLoginFirst = useMustLoginFirst();

  const {
    register,
    handleSubmit,
    setError,
    resetField,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      quantity: undefined,
    },
    resolver: zodResolver(formSchema),
  });

  const fundingDetail = trpcHooks.useQuery(
    ['request post - detail item', { id: requestPost.id }],
    {
      initialData: requestPost,
    },
  );

  const isFundingDisabled = useMemo(
    () =>
      fundingDetail.data?.status === 'REFUSE' ||
      fundingDetail.data?.status === 'EXPIRATION' ||
      fundingDetail.data?.status === 'COMPLETION',
    [fundingDetail.data?.status],
  );

  const trpcUtils = trpcHooks.useContext();
  const result = trpcHooks.useMutation(['request funding - funding'], {
    onSuccess(_, request) {
      resetField('quantity');

      trpcUtils.invalidateQueries([
        'request post - detail item',
        { id: requestPost.id },
      ]);
      trpcUtils.invalidateQueries([
        'request post - user items requested by the creator',
      ]);
      if (session?.user.id)
        trpcUtils.invalidateQueries(['user - get', { id: session?.user?.id }]);
      ToastBox.toast({
        message: `${request.quantity}원을 펀딩했습니다.`,
        status: 'success',
      });
    },
    onError(error) {
      ToastBox.errorToast('후원금 펀딩에 실패했습니다.');
    },
  });

  const onSubmit: SubmitHandler<Form> = async (data) => {
    if (result.isLoading) return;
    if (!session?.user.id) throw Error('사용자 정보를 찾을 수 없습니다.');
    const user = await trpcUtils.fetchQuery([
      'user - get',
      { id: session.user.id },
    ]);

    if (!user) throw Error('사용자 정보를 찾을 수 없습니다.');
    if (user.totalPoint < data.quantity) {
      return setError('quantity', { message: '보유 포인트가 부족합니다.' });
    }

    result.mutate({
      quantity: data.quantity,
      userId: user.id,
      requestId: requestPost.id,
    });
  };

  return (
    <Box css={style}>
      {fundingDetail.data &&
        (fundingDetail.data.requestFundings.length === 0 ? (
          <Center py={24}>펀딩 내역이 없습니다.</Center>
        ) : (
          <Box className="funding-list" as="ul">
            {fundingDetail.data.requestFundings.map(({ user, quantity }) => (
              <Flex
                key={`${user ? user.id : null}`}
                as="li"
                justifyContent="space-between"
                alignItems="center"
              >
                {user ? (
                  <UserLink userId={user.id}>
                    <UserAvatar
                      size={32}
                      user={user}
                      Text={<b className="avatar-name">{user.name}</b>}
                    />
                  </UserLink>
                ) : (
                  <UserAvatar
                    size={32}
                    user={{ name: UserDomain.constants.resignedUserName }}
                    Text={
                      <b className="avatar-name">
                        {UserDomain.constants.resignedUserName}
                      </b>
                    }
                  />
                )}
                <b className="price">
                  {numberUtils.thousandsSeparators(quantity)}&nbsp;원
                </b>
              </Flex>
            ))}
          </Box>
        ))}
      <Box className="funding-form">
        <VStack flex="auto" spacing={4} alignItems="start">
          <FormatInput
            format="thousandsSeparators"
            Right={<Center>원</Center>}
            onKeyDown={domUtils.onEnter(handleSubmit(onSubmit))}
            placeholder="200원부터 입력가능합니다."
            {...register('quantity', {
              setValueAs(v) {
                if (stringUtils.isNilStr(v)) return undefined;
                return typeof v === 'number'
                  ? v
                  : parseInt(numberUtils.removeSeparators(v));
              },
            })}
            isDisabled={isFundingDisabled}
          />
          <FormValidMessage errorMessage={errors.quantity?.message} pl={2} />
        </VStack>
        <Button
          theme="primary"
          h={50}
          minW={100}
          fontSize={15}
          onClick={() => mustLoginFirst(handleSubmit(onSubmit))}
          disabled={isFundingDisabled || result.isLoading}
        >
          후원하기
        </Button>
      </Box>
    </Box>
  );
};

const style = css`
  .funding-list {
    padding: 24px 16px;
    overflow-y: auto;
    max-height: 210px;

    ${mediaQueries.tablet} {
      padding: 24px;
    }

    > li {
      height: 32px;
    }

    > li + li {
      margin-top: 26px;
    }

    .avatar-name {
      margin-left: 12px;
      font-size: 15px;
    }

    .price {
      font-weight: ${fontWeights.b};
      font-size: 16px;
    }
  }

  .funding-form {
    display: flex;
    flex-direction: column;
    border-top: 1px solid ${colors.border['2']};
    gap: 16px;

    padding: 24px 16px;

    ${mediaQueries.tablet} {
      padding: 24px;
      flex-direction: row;

      button {
        margin-top: 0;
      }
    }
  }
`;
export default 후원금펀딩;
