import type { NextRouter } from 'next/router';
import type { UrlObject } from 'url';

import ToastBox from '../../components/ui/ToastBox';
import { joinQueryParams } from './stringUtils';

type ShareProps = {
  title: string;
  url: string;
};

export const isDevelopment = process.env.NODE_ENV === 'development';

export const share = (props: ShareProps) => {
  if (navigator.share) {
    navigator.share(props);
  } else {
    navigator.clipboard.writeText(props.url).then(
      () => {
        ToastBox.toast({
          message: 'URL이 복사되었습니다.',
          status: 'success',
        });
      },
      () => {
        ToastBox.toast({
          message: '클립보드 복사 권한을 허용해주세요.',
          status: 'error',
        });
      },
    );
  }
};

export function isLinkActive(router: NextRouter, href: string | UrlObject) {
  return typeof href === 'string'
    ? router.asPath.includes(href)
    : href.pathname
    ? router.asPath.includes(href.pathname)
    : false;
}

export const shareUrlObject = ({
  title,
  urlObject,
}: {
  title: string;
  urlObject: UrlObject;
}) => {
  const queryString = (() => {
    if (!urlObject.query) return '';
    if (urlObject.query && typeof urlObject.query === 'object') {
      return `?${joinQueryParams(urlObject.query)}`;
    }
    return urlObject.query;
  })();
  const url = `${window.location.origin}${urlObject.pathname}${queryString}`;

  share({
    title,
    url,
  });
};

export const youtubeRegexp =
  /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/;
export const youtubeUrlToId = (url: string) => {
  const postfixUrl = url.match(youtubeRegexp);

  if (!postfixUrl?.[3]) return null;

  return postfixUrl?.[3];
};
