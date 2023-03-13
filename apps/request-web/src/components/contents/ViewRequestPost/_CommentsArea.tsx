import { Divider, Text, VStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';

import Comment from '@/components/article/Comment';
import ViewPostRequestContainer from '@/components/contents/ViewRequestPost/ViewPostRequestContainer';
import InputCommentTextarea from '@/components/ui/Textarea/InputCommentTextarea';
import type { RequestPost, User } from '@/db';
import { trpc } from '@/utils/trpc';

import type { RequestCommentDomain } from '../../../domain';

type Props = {
  requestId: RequestPost['id'];
  fundingUserSet: Set<User['id'] | null>;
};
const _CommentsArea = ({ requestId, fundingUserSet }: Props) => {
  const { data: session } = useSession();
  const user = session?.user;

  const trpcUtils = trpc.useContext();
  const orderedCommentsDetail = trpc.requestComment.getOrdered.useQuery(
    {
      requestId,
    },
    {
      select(data) {
        if (!data) return data;
        const additionalData = {
          // 댓글 별 좋아요 맵핑
          commentHeartsUserMap: new Map(
            data.map(({ id, hearts }) => [
              id,
              new Set(hearts.map(({ userId }) => userId)),
            ]),
          ),
        };

        return Object.assign({ comments: data }, additionalData);
      },
    },
  );

  const heartCommentMutation = trpc.requestComment.toggleHeart.useMutation({
    onSuccess() {
      trpcUtils.requestComment.getOrdered.invalidate({ requestId });
    },
  });

  const addCommentMutation = trpc.requestComment.add.useMutation({
    onSuccess() {
      trpcUtils.requestComment.getOrdered.invalidate({ requestId });
    },
  });

  const handleReplyComment = useCallback(
    (data: Omit<RequestCommentDomain.CreateSchema, 'userId' | 'requestId'>) => {
      if (!user?.id) return;

      addCommentMutation.mutate({
        requestId,
        userId: user.id,
        ...data,
      });
    },
    [addCommentMutation, requestId, user?.id],
  );

  return (
    <ViewPostRequestContainer pb={24}>
      <>
        <Text as="strong" color="gray.80" fontSize={20} fontWeight="b">
          댓글
          <Text as="span" ml={12} color="primary.default">
            {orderedCommentsDetail.data?.comments.length ?? 0}개
          </Text>
        </Text>
        <VStack spacing={24} py={24} pl={2} alignItems="initial">
          {orderedCommentsDetail.data?.comments.map((comment) => (
            <Comment
              key={`${comment.id}`}
              comment={comment}
              heartCount={comment.hearts.length}
              isDonated={fundingUserSet.has(comment.userId)}
              isHearted={
                user?.id
                  ? orderedCommentsDetail.data?.commentHeartsUserMap
                      ?.get(comment.id)
                      ?.has(user.id)
                  : false
              }
              onHeart={() => {
                if (!user?.id) return;
                heartCommentMutation.mutate({
                  requestCommentId: comment.id,
                  userId: user?.id,
                });
              }}
              onReply={handleReplyComment}
              currentUser={user}
            />
          ))}
        </VStack>
      </>
      {user && (
        <>
          <Divider mb={24} />
          <InputCommentTextarea
            onSubmit={handleReplyComment}
            user={user}
            p={0}
          />
        </>
      )}
    </ViewPostRequestContainer>
  );
};
export default _CommentsArea;
