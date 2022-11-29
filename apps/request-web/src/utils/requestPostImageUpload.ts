import type {
  EditorT,
 ErrorMessage,  FileLocations } from '@dothis/share';
import {
  errorMessage,
  isErrorMessage,
  message,
} from '@dothis/share';
import type { RequestPost } from '@prisma/client';
import axios from 'axios';
import { uid } from 'uid';

import { RequestPostDomain } from '../domain';

export type imageResponseData = {
  images: FileLocations;
  thumbnailLocation: string | undefined;
};

export async function requestPostImageUpload(
  editorRef: EditorT,
  postId: RequestPost['id'],
) {
  if (!editorRef)
    return errorMessage({
      message: '에디터를 찾을 수 없습니다.',
    });
  const images = await editorRef?.editor?.editorUpload.scanForImages();

  if (!images || (await images).length === 0)
    return message({
      status: 'info',
      message: '업로드할 이미지가 없습니다.',
    });

  // if (images.length > 10) {
  //   return errorMessage({
  //     message: '이미지는 최대 10개까지 첨부 가능합니다.',
  //   });
  // }

  const blobs = images.map(({ image, blobInfo }) => {
    const id = uid(7);
    return [
      id,
      {
        file: new File([blobInfo.blob()], id),
        image,
        blobInfo,
      },
    ] as const;
  });
  const imageMap = new Map(blobs);

  const formData = new FormData();
  for (const [key, img] of imageMap) {
    // 최초 Form에 리사이징된 썸네일 이미지 추가
    if (!formData.has('images')) {
      const thumbnailImg = getThumbnailImage(img.image);
      formData.append('thumbnail', await thumbnailImg, uid(7));
    }
    formData.append('images', img.file, key);
  }

  const result = await axios.post<
    | ErrorMessage
    | {
        images: FileLocations;
        thumbnail: FileLocations;
      }
  >(`/api/s3?post-id=${postId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  if (isErrorMessage(result.data)) return result.data;

  // 콘텐츠 이미지 정보 획득 + 이미지 URL 업데이트
  for (const [fileName, location] of result.data.images) {
    const img = imageMap.get(fileName);
    if (img) img.image.src = location;
  }

  // 썸네일 정보 획득
  const thumbnailLocation = result.data.thumbnail[0]?.[1];

  return {
    images: result.data.images,
    thumbnailLocation,
  } as imageResponseData;
}

async function getThumbnailImage(image: HTMLImageElement): Promise<File> {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) throw Error('context is null');

  canvas.width = RequestPostDomain.constants.maxThumbnailWidth;
  canvas.height = RequestPostDomain.constants.maxThumbnailHeight;

  let imageWidth = image.width;
  let imageHeight = image.height;
  let imagePosX = 0;
  let imagePosY = 0;

  //이미지 크기 조정
  if (imageWidth > imageHeight) {
    // 가로가 길 경우
    if (imageWidth > canvas.width) {
      imageWidth *= canvas.height / imageHeight;
      imageHeight = canvas.height;
      imagePosX = canvas.width / 2 - imageWidth / 2;
    }
  } else {
    // 세로가 길 경우
    if (imageHeight > canvas.height) {
      imageHeight *= canvas.width / imageWidth;
      imageWidth = canvas.width;
      imagePosY = canvas.height / 2 - imageHeight / 2;
    }
  }

  //이미지 크롭 및 중앙 정렬
  context.drawImage(image, imagePosX, imagePosY, imageWidth, imageHeight);
  const blob: any = await new Promise((resolve) => canvas.toBlob(resolve));

  return new File([blob], 'thumbnail');
}
