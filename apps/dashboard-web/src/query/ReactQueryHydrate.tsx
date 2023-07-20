'use client';

import type { HydrateProps } from '@tanstack/react-query';
import { Hydrate as RQHydrate } from '@tanstack/react-query';

const ReactQueryHydrate = (props: HydrateProps) => {
  return <RQHydrate {...props} />;
};
export default ReactQueryHydrate;
