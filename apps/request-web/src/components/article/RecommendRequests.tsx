import HorizonPostRequestItemWrap from '@dothis/share/components/layout/HorizonPostRequestItemWrap';

import HorizonPostRequestItem from '@/components/article/HorizonPostRequestItem';
import type { inferQueryOutput } from '@/utils/trpc';

type Props = {
  recommendRequests: inferQueryOutput['requestPost']['getRecommends'];
};
export default function RecommendRequests({ recommendRequests }: Props) {
  return (
    <section className="recommend-request-post">
      <div className="section-title">
        <h2>🎯 추천 요청</h2>
      </div>
      <div className="section-contents">
        <HorizonPostRequestItemWrap>
          {recommendRequests.map((request) => (
            <HorizonPostRequestItem
              key={`${request.id}`}
              requestPost={request}
            />
          ))}
        </HorizonPostRequestItemWrap>
      </div>
    </section>
  );
}
