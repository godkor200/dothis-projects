import { PartialApProps } from '@dothis/share';

import { RequestPostDomain } from '@/domain';

import type { TagTheme } from './';
import Tag from './';

type StatusKeys = keyof typeof RequestPostDomain.constants.requestStatusType;
const requestStatusToColor: Record<StatusKeys, TagTheme> = {
  REQUEST: 'red',
  COMPLETION: 'purple',
  REGISTRATION: 'green',
  ACCEPT: 'green',
  EXPIRATION: 'gray',
  REFUSE: 'gray',
};

const StatusTag = PartialApProps(Tag)(
  ({ requestStatus }: { requestStatus: StatusKeys }) => ({
    theme: requestStatusToColor[requestStatus],
    children: RequestPostDomain.constants.showStatusTypeKor.get(requestStatus),
  }),
);

export default StatusTag;
