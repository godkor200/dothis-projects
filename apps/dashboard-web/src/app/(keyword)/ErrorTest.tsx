'use client';

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import Test from './TestNews';
import WeeklyKeyword from './WeeklyKeyword';

const App: React.FC = () => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ resetErrorBoundary }) => (
          <div>
            There was an error!
            <button onClick={() => resetErrorBoundary()}>Try again</button>
          </div>
        )}
      >
        <Test />
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
);

export default App;
