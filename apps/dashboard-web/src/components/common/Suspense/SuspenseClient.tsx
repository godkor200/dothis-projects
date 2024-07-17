import { Suspense, type SuspenseProps } from 'react';

import { ClientOnly } from './ClientOnly';

export const SuspenseClientOnly = (props: SuspenseProps) => (
  <ClientOnly fallback={props.fallback}>
    <Suspense {...props} />
  </ClientOnly>
);

export const defineSuspense = ({ isClient }: { isClient?: boolean }) =>
  isClient ? SuspenseClientOnly : Suspense;
