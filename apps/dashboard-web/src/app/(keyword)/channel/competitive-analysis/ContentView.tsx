import { useSearchParams } from 'next/navigation';

import ContentComparison from './ContentComparison';
import ContentTimeline from './ContentTimeline';

const ContentView = () => {
  const searchParams = useSearchParams();

  const contentView = searchParams?.get('content-view');

  return (
    <>
      {contentView === 'timeline' ? (
        <ContentTimeline />
      ) : contentView === 'performance' ? (
        <div className="mx-auto mt-40 text-center font-bold">
          서비스 준비 중입니다
        </div>
      ) : (
        <ContentComparison />
      )}
    </>
  );
};

export default ContentView;
