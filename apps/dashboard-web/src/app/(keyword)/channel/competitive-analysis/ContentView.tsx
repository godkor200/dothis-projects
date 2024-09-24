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
        <div>안녕</div>
      ) : (
        <ContentComparison />
      )}
    </>
  );
};

export default ContentView;
