import { Suspense, type SuspenseProps } from 'react';

import { ClientOnly } from './ClientOnly';

export const SuspenseClientOnly = (props: SuspenseProps) => (
  <ClientOnly fallback={props.fallback}>
    <Suspense {...props} />
  </ClientOnly>
);

export const defineSuspense = ({ isClient }: { isClient?: boolean }) =>
  isClient ? SuspenseClientOnly : Suspense;

/**
 * Text Content does not match server-render HTML  or initial  UI does not match (Hydration 에러)
 * clientOnly prop을 사용하면 <Suspense/>는 서버에서는 fallback을 반환합니다.
 *
 * the server could not finish this suspense boundary likely due to an error during server rendering (Suspense 에러)
 * mount 후(클라이언트에서는) children을 반환합니다. mount는 클라이언트에서만 일어나기 때문에 서버사이드 렌더링을 피할 수 있습니다.
 *
 * build 에러로 인한 이슈는 아직 해결되지않음 => build 타임에서 강제적으로 해결해야함
 * https://github.com/vercel/next.js/issues/51581
 */
