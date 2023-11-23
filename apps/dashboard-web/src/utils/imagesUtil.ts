import type { ChangeEvent } from 'react';

export const handleImageError = (event: ChangeEvent<HTMLImageElement>) => {
  event.target.src = '/RelatedContentMain.png';
};

export const externaImageLoader = (src: string | null) =>
  `https://www.bigkinds.or.kr/resources/images${src}`;

export const getMainImage = (image: string) => {
  const lines = image.split('\n').filter((line) => line.trim() !== '');
  const result = lines.map((line) => line.trim());

  return result[0];
};

export const externalYouTubeImageLoader = (videoId: string | undefined) => {
  return `https://img.youtube.com/vi/${videoId}/0.jpg`;
};
