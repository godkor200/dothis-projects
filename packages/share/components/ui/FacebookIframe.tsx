import { css } from '@emotion/react';

const FACEBOOK_VIDEO_ID_LENGTH = 15;
const FACEBOOK_POST_ID_LENGTH = 16;
export default function FacebookIframe({ post }: any) {
  if (post === undefined) return;

  let postURL = ``;
  let postHeight = '300px';

  if (post.url.indexOf('plugins/video') !== -1) {
    const userName = post.url.slice(
      post.url.indexOf('href=https%3A%2F%2Fwww.facebook.com%2F') + 38,
      post.url.indexOf('%2Fvideos%2F'),
    );
    const postId = post.url.slice(
      post.url.indexOf('%2Fvideos%2F') + 12,
      post.url.indexOf('%2Fvideos%2F') + 12 + FACEBOOK_VIDEO_ID_LENGTH,
    );
    const sliceURL = post.url.slice(
      post.url.indexOf('src="') + 5,
      post.url.indexOf('" width='),
    );

    postHeight = post.url.slice(
      post.url.indexOf('height="') + 8,
      post.url.indexOf('" style='),
    );
    // postURL = `https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2F${userName}%2Fvideos%2F${postId}%2F&show_text=true&height=200&width=360&adapt_container_width=true&t=0&appId=238108308477155`;

    postURL = sliceURL + '&appId=238108308477155';
  } else if (post.url.indexOf('plugins/post') !== -1) {
    post.url.substr();
    const userName = post.url.slice(
      post.url.indexOf('href=https%3A%2F%2Fwww.facebook.com%2F') + 38,
      post.url.indexOf('%2Fposts%2F'),
    );
    const postId = post.url.substr(
      post.url.indexOf('%2Fposts%2F') + 11,
      FACEBOOK_POST_ID_LENGTH,
    );
    postHeight = post.url.slice(
      post.url.indexOf('height="') + 8,
      post.url.indexOf('" style='),
    );
    postURL = `https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2F${userName}%2Fposts%2F${postId}&show_text=true&adapt_container_width=true&width=360&height=${postHeight}&appId=238108308477155`;
  } else return;

  return (
    <div>
      <iframe
        css={FacebookPostStlye}
        key={post.id}
        src={postURL}
        height={postHeight}
        scrolling="no"
        frameBorder={0}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen={false}
      ></iframe>
    </div>
  );
}

const FacebookPostStlye = css`
  width: 360px;
  border: none;
  @media (max-width: 360px) {
    width: 360px;
  }
`;
