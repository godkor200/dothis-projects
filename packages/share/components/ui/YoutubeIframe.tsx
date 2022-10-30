import { AspectRatio } from '@chakra-ui/react';
import { css } from '@emotion/react';

import { youtubeUrlToId } from '@/utils/appUtils';

type Props = {
  url: string;
};
const iEmbedURL = 'https://www.youtube.com/embed/';
const regexp = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/;

export default function YoutubeIframe({ url }: Props) {
  const id = youtubeUrlToId(url);
  const isShorts = url.includes('shorts');

  return (
    <AspectRatio ratio={isShorts ? 10 / 9 : 16 / 9}>
      <iframe css={style} src={`${iEmbedURL}${id}`} />
    </AspectRatio>
  );
}

const style = css`
  width: 100%;
  height: 100%;
`;
