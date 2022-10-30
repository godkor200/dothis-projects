import type { BoxProps } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { css } from '@emotion/react';
import type { RequestPost } from '@prisma/client';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import type { ComponentProps } from 'react';
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { mergeRefs } from 'react-merge-refs';
import { uid } from 'uid';

import RequestPostDomain from '@/domain/RequestPostDomain';
import type { ErrorMessage, Message } from '@/models/Message';
import { errorMessage, isErrorMessage, message } from '@/models/Message';
import type { FileLocations } from '@/pages/api/s3';
import { colors, fonts, typo } from '@/styles/chakraTheme/variable';

type Props = ComponentProps<typeof Editor> & {
  wrap?: BoxProps;
};

const { maxImageFileSize, maxThumbnailWidth, maxThumbnailHeight } =
  RequestPostDomain.constants;

async function getThumbnailImage(image: HTMLImageElement): Promise<File> {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) throw Error('context is null');

  canvas.width = maxThumbnailWidth;
  canvas.height = maxThumbnailHeight;

  let imageWidth = image.width;
  let imageHeight = image.height;
  let imagePosX = 0;
  let imagePosY = 0;

  //이미지 크기 조정
  if (imageWidth > imageHeight) {
    // 가로가 길 경우
    if (imageWidth > maxThumbnailWidth) {
      imageWidth *= maxThumbnailHeight / imageHeight;
      imageHeight = maxThumbnailHeight;
      imagePosX = canvas.width / 2 - imageWidth / 2;
    }
  } else {
    // 세로가 길 경우
    if (imageHeight > maxThumbnailHeight) {
      imageHeight *= maxThumbnailWidth / imageWidth;
      imageWidth = maxThumbnailWidth;
      imagePosY = canvas.height / 2 - imageHeight / 2;
    }
  }

  //이미지 크롭 및 중앙 정렬
  context.drawImage(image, imagePosX, imagePosY, imageWidth, imageHeight);
  const blob: any = await new Promise((resolve) => canvas.toBlob(resolve));

  return new File([blob], 'thumbnail');
}

// 파일 선택시
// function choiceFile(
//   callback: Function,
//   editorRef: Editor,
//   e: ChangeEvent<HTMLInputElement>,
// ) {
//   const file = e.target?.files?.[0];
//   if (!file) return;
//
//   if (file.size > maxImageFileSize) {
//     toast(
//       ToastBox.getMessageOptions({
//         status: 'error',
//         message: '이미지는 5mb보다 작아야합니다.',
//       }),
//     );
//     return;
//   }
//
//   const reader = new FileReader();
//   reader.addEventListener('load', (e) => {
//     const now = new Date();
//
//     const blobCache = editorRef.editor?.editorUpload.blobCache;
//     if (!blobCache) return;
//     // @ts-ignore
//     const base64 = reader.result?.split(',')[1];
//     const blobInfo = blobCache.create(file.name, file, base64);
//     blobCache.add(blobInfo);
//
//     const img = new Image();
//     img.src = blobInfo.blobUri();
//
//     // blob 이미지 에디터에 삽입 사이즈 처리
//     img.onload = (e) => {
//       if (!editorRef?.editor) return;
//
//       const editorBody = editorRef.editor.contentDocument.body;
//       if (!editorBody) return;
//       const editorWidth = editorBody.clientWidth;
//
//       // 이미지 삽입 디폴트 사이즈 현재 에디터 크기에 맞게 조정
//       const ratio =
//         img.naturalWidth > editorWidth ? editorWidth / img.naturalWidth : 1;
//       const width = Math.floor(img.naturalWidth * ratio);
//       const height = Math.floor(img.naturalHeight * ratio);
//
//       callback(blobInfo.blobUri(), {
//         title: file.name,
//         width: `${width}`,
//         height: `${height}`,
//       });
//     };
//   });
//   reader.readAsDataURL(file);
// }

type imageResponseData = {
  images: FileLocations;
  thumbnailLocation: string | undefined;
};

export type EditorRefObject =
  | (Editor & {
      imageUpload: (
        postId: RequestPost['id'],
      ) => Promise<Message | imageResponseData>;
    })
  | null;

const _Editor = forwardRef<EditorRefObject, Props>(
  ({ init, wrap = {}, ...props }, ref) => {
    const wrapRef = useRef<HTMLDivElement>(null);
    const [isInit, setIsInit] = useState(false);
    const editorRef = useRef<EditorRefObject | null>(null);
    // @ts-ignore
    useImperativeHandle(ref, () => editorRef.current);

    return (
      <Box css={style} ref={wrapRef} {...wrap}>
        <Editor
          ref={(editor) => {
            let data: EditorRefObject | null = (() => {
              // @ts-ignore
              globalThis.editor = editor;
              const e: any = editor;
              if (e) {
                const imageUpload: NonNullable<EditorRefObject>['imageUpload'] =
                  async (postId) => {
                    if (!editorRef)
                      return errorMessage({
                        message: '에디터를 찾을 수 없습니다.',
                      });
                    const images =
                      await editorRef.current?.editor?.editorUpload.scanForImages();

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
                        formData.append(
                          'thumbnail',
                          await thumbnailImg,
                          uid(7),
                        );
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
                    console.log(thumbnailLocation);

                    return {
                      images: result.data.images,
                      thumbnailLocation,
                    };
                  };
                e.imageUpload = imageUpload;
              }
              return e as EditorRefObject;
            })();

            editorRef.current = data;
            mergeRefs([ref, editorRef]);
          }}
          tinymceScriptSrc="/tinymce/tinymce.min.js"
          apiKey={process.env.NEXT_PUBLIC_TINYMCE_KEY}
          scriptLoading={{ async: true }}
          init={{
            width: '100%',
            height: '100%',
            icons: 'small',
            skin: 'naked',
            language: 'ko_KR',
            menubar: false,
            statusbar: false,
            plugins: [
              // 'advlist',
              'lists',
              'link',
              'autolink',
              'image',
              'editimage', // 프리미엄 기능임
              // 'quickimage',
              // 'preview',
              // 'media',
              // 'mediaembed', // 프리미엄 기능임
              'anchor',
              // 'searchreplace',
              // 'visualblocks',
              // 'fullscreen',
              // 'insertdatetime',
              // 'media',
              // 'code',
              // 'autosave',
              // 'help',
              'wordcount',
              'quickbars',
            ],
            link_default_target: '_blank',
            quickbars_selection_toolbar: 'bold italic underline forecolor link',
            quickbars_insert_toolbar: false,
            editimage_toolbar:
              'rotateleft rotateright | imageoptions | editimage',
            editimage_upload_timeout: 30000,
            toolbar: [
              {
                name: 'formatting',
                items: ['blocks', 'bold', 'forecolor'],
              },
              {
                name: 'external',
                items: ['quickimage', 'link'],
              },
              {
                name: 'align',
                items: ['alignleft', 'aligncenter', 'alignright'],
              },
              { name: 'history', items: ['undo', 'redo'] },
              {
                name: 'list',
                items: ['bullist', 'numlist'],
              },
            ],
            content_style: `body { font-family: ${fonts}; font-size: 16px; } img { max-width: 100%; }`,
            a11y_advanced_options: false,
            link_context_toolbar: true,
            // file_picker_types: 'image',
            // file_picker_callback: (callback, value, meta) => {
            //   const input = document.createElement('input');
            //   input.setAttribute('type', 'file');
            //   input.setAttribute('accept', 'image/*');
            //
            //   input.addEventListener('change', (e) => {
            //     if (!editorRef.current) return;
            //     choiceFile(
            //       callback,
            //       editorRef.current,
            //       e as unknown as ChangeEvent<HTMLInputElement>,
            //     );
            //   });
            //   input.click();
            // },

            images_file_types: 'jpg,jpeg,gif,png,svg,webp,apng,avif',

            resize: true,
            image_caption: false,
            image_uploadtab: true,
            images_reuse_filename: true,
            resize_img_proportional: false,

            // images_upload_url: '/api/s3',
            ...init,
          }}
          {...props}
        />
      </Box>
    );
  },
);

_Editor.displayName = 'Editor';

const style = css`
  min-height: 260px;
  width: 100%;
  border: 1px solid ${colors.border['2']};
  border-radius: 12px;
  overflow: hidden;

  > textarea {
    visibility: hidden;
  }

  .ck-toolbar {
    border-radius: 12px 12px 0 0 !important;
  }

  .ck-content {
    border-radius: 0 0 12px 12px !important;
    background-color: ${colors.bg.dark} !important;

    h2 {
      ${typo.t1};
    }

    h3 {
      ${typo.t2};
    }

    h4 {
      ${typo.t3};
    }
  }

  .tox .tox-tbtn--select {
    width: 110px;
  }
`;
const editorStyle = css`
  height: 100%;
`;

export default _Editor;
