import type { ErrorMessage } from '@dothis/share';
import { errorMessage, isErrorMessage, message } from '@dothis/share';
import axios from 'axios';
import { uid } from 'uid';

import type { EditorT, FileLocations } from '@/components/article/Editor';
import type { RequestPost } from '@/prisma/gen';

import { RequestPostDomain } from '../domain';

export type imageResponseData = {
  images: FileLocations;
  thumbnailLocation: string | undefined;
};

interface BlobInfo {
  id: () => string;
  name: () => string;
  filename: () => string;
  blob: () => Blob;
  base64: () => string;
  blobUri: () => string;
  uri: () => string | undefined;
}

type FileInfo = {
  readonly file: File;
  readonly blobInfo: BlobInfo;
  readonly image: HTMLImageElement;
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
      const thumbnailImg = await getThumbnailImage(img);
      formData.append('thumbnail', thumbnailImg, uid(7));
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

  console.log('result', result);
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

async function getThumbnailImage({
  blobInfo,
  image,
}: Pick<FileInfo, 'blobInfo' | 'image'>): Promise<File> {
  const canvas = document.createElement('canvas');
  const imageFileType = blobInfo.blob().type;

  const context = canvas.getContext('2d');
  if (!context) throw Error('context is null');

  const img = document.createElement('img');

  img.src = blobInfo.blobUri();
  canvas.width = RequestPostDomain.constants.maxThumbnailWidth;
  canvas.height = RequestPostDomain.constants.maxThumbnailHeight;

  const file = await new Promise<File>((resolve) => {
    img.onload = () => {
      // canvas에 마치 objectFit: cover 한 것 처럼 넣기 위해 이미지 자르기
      const { width, height, x, y } = coverCrop(
        {
          width: img.naturalWidth,
          height: img.naturalHeight,
        },
        {
          width: canvas.width,
          height: canvas.height,
        },
      );

      context.drawImage(img, x, y, width, height);
      canvas.toBlob((blob) => {
        if (!blob) throw Error('blob is null');
        resolve(
          new File([blob], 'thumbnail', {
            type: imageFileType,
          }),
        );
      }, imageFileType);
    };
  });

  img.remove();

  return file;
}

type ImgSize = {
  width: number;
  height: number;
};
type CanvasOptions = {
  width: number;
  height: number;
  align?: [number, number];
};

// cover 형태로 이미지 자르기
export default function coverCrop(
  imgSize: ImgSize,
  { align = [0.5, 0.5], ...canvasSize }: CanvasOptions,
) {
  const ratio = imgSize.width / imgSize.height;

  const isHorizontal = ratio > canvasSize.width / canvasSize.height;

  const size = {
    width: isHorizontal
      ? imgSize.width * (canvasSize.height / imgSize.height)
      : canvasSize.width,
    height: isHorizontal
      ? canvasSize.height
      : imgSize.height * (canvasSize.width / imgSize.width),
  };
  const position = {
    x: isHorizontal ? (canvasSize.width - size.width) * align[0] : 0,
    y: isHorizontal ? 0 : (canvasSize.height - size.height) * align[1],
  };

  return {
    ...size,
    ...position,
  };
}
