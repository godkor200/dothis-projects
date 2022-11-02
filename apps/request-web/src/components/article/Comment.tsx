import { Box, Flex, HStack, Text, useBoolean } from '@chakra-ui/react';
import Button from '@dothis/share/components/ui/Button';
import SvgDonate from '@dothis/share/components/ui/Icons/SvgDonate';
import SvgHeart from '@dothis/share/components/ui/Icons/SvgHeart';
import type { InputCommentTextareaProps } from '@dothis/share/components/ui/Textarea/InputCommentTextarea';
import InputCommentTextarea from '@dothis/share/components/ui/Textarea/InputCommentTextarea';
import UserAvatar from '@dothis/share/components/ui/UserAvatar';
import { UserDomain } from '@dothis/share/domain';
import type { User } from '@dothis/share/generated/prisma-client';
import useGlobalStore from '@dothis/share/lib/models/globalStore';
import { colors, fontWeights } from '@dothis/share/lib/styles/chakraTheme';
import { thousandsSeparators, toKoAboutDateAgo } from '@dothis/share/lib/utils';
import { css } from '@emotion/react';
import clsx from 'clsx';
import type { Session } from 'next-auth';
import React, { useMemo } from 'react';

import UserLink from '../ui/Links/UserLink';


export type CommentProps = {
  comment: {
    id: bigint;
    user?: User | null;
    content: string;
    parentId?: bigint | null;
    parentComment?: CommentProps['comment'] | null;
    rootId?: bigint | null;
    createdAt: Date;
    updatedAt: Date;
  };

  heartCount: number;
  isHearted?: boolean;
  isDonated?: boolean;
  isReply?: boolean;
  onHeart(comment: CommentProps['comment']): void;
  onReply: InputCommentTextareaProps['onSubmit'];

  currentUser?: InputCommentTextareaProps['user'] & {
    id?: Session['user']['id'];
  };
  // TODO: 수정 삭제 기능 추가
  // onDelete(): void;
  // onEdit(): void;
};
const Comment = ({
                   comment,
                   isHearted,
                   isDonated,
                   onReply,
                   onHeart,
                   heartCount,
                   currentUser,
                 }: CommentProps) => {
  const { user } = comment;
  const isActiveUser = useMemo(() => !!user, [user]);
  const [isWriteReply, isWriteReplyFlag] = useBoolean(false);
  const { now } = useGlobalStore();
  const isReply = useMemo(() => !!comment.rootId, [comment.rootId]);
  return (
    <Flex css={style} className={clsx(isReply && '--reply')}>
      {isActiveUser ? (
        <UserLink userId={user!.id}>
          <UserAvatar size={40} user={user!} />
        </UserLink>
      ) : (
        <Box>
          <UserAvatar
            size={40}
            user={{
              name: UserDomain.constants.resignedUserName,
            }}
          />
        </Box>
      )}
      <Box className='comment-contents'>
        <Text as='b' fontWeight='b'>
          {isActiveUser ? (
            <UserLink userId={user!.id}>{user!.name}</UserLink>
          ) : (
            UserDomain.constants.resignedUserName
          )}
        </Text>
        <Text as='p' mt={2}>
          {comment.parentComment && comment.parentComment?.user?.name && (
            <Text as='mark' fontWeight='sb' mr={6}>
              @{comment.parentComment.user.name}
            </Text>
          )}
          {comment.content}
        </Text>
        <HStack className='comment-etc-info' spacing={8} pt={4}>
          <Text as='span' fontWeight={fontWeights.m}>
            {toKoAboutDateAgo(now, comment.createdAt)}
          </Text>
          {isActiveUser && isDonated && (
            <Box className='comment-donate'>
              <SvgDonate fill={colors.primary.default} />
              <span>후원중</span>
            </Box>
          )}
          {
            <Button
              className={clsx(
                'comment-heart',
                isActiveUser && isHearted && 'comment-heart-on',
              )}
              disabled={!currentUser}
              onClick={() => onHeart(comment)}
            >
              <SvgHeart width={14} height={14} fill={colors.gray['60']} />
              <span>{thousandsSeparators(heartCount)}</span>
            </Button>
          }
          {currentUser && !isWriteReply && (
            <Button className='comment-reply' onClick={isWriteReplyFlag.on}>
              답글
            </Button>
          )}
          {currentUser && isWriteReply && (
            <Button className='comment-reply' onClick={isWriteReplyFlag.off}>
              취소
            </Button>
          )}
        </HStack>
        {isWriteReply && (
          <InputCommentTextarea
            onSubmit={(data) => {
              onReply(data);
              isWriteReplyFlag.off();
            }}
            py={8}
            px={0}
            rootId={comment.rootId ?? comment.id}
            parentId={comment.id}
            textarea={{
              minH: 80,
            }}
            user={currentUser}
          />
        )}
      </Box>
    </Flex>
  );
};

const style = css`
  &.--reply {
    margin-left: 36px;
  }

  .comment-contents {
    flex: auto;
    margin-left: 12px;
  }

  .comment-etc-info {
    > * {
      color: ${colors.gray['60']};
      font-size: 14px;
    }

    .comment-donate,
    .comment-heart,
    .comment-reply {
      font-weight: ${fontWeights.b};
    }

    .comment-donate,
    .comment-heart {
      display: flex;
      align-items: center;

      * + * {
        margin-left: 2px;
      }
    }

    .comment-reply {
      padding: 8px;
      text-decoration: underline;
      text-underline-offset: 2px;
    }

    .comment-heart.comment-heart-on,
    .comment-donate {
      color: ${colors.primary.default};

      svg {
        fill: ${colors.primary.default};
      }
    }
  }
`;
export default Comment;
