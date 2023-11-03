import type { BoxProps } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { Editor as TinymceEditor } from '@tinymce/tinymce-react';
import type { ComponentProps } from 'react';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

import { colors, fonts, typo } from '@/styles/dothisTheme';

export type EditorT = TinymceEditor;
type Props = ComponentProps<typeof TinymceEditor> & {
  wrap?: BoxProps;
};

export type FileLocations = Array<[fileName: string, location: string]>;

export const Editor = forwardRef<TinymceEditor | null, Props>(
  ({ init, wrap = {}, ...props }, ref) => {
    const wrapRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<TinymceEditor | null>(null);
    // @ts-ignore
    useImperativeHandle(ref, () => editorRef.current);

    return (
      <Box css={style} ref={wrapRef} {...wrap}>
        <TinymceEditor
          ref={editorRef}
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

            images_file_types: 'jpg,jpeg,gif,png,svg,webp,apng,avif',

            resize: true,
            image_caption: false,
            image_uploadtab: true,
            images_reuse_filename: true,
            resize_img_proportional: false,

            ...init,
          }}
          {...props}
        />
      </Box>
    );
  },
);

Editor.displayName = 'Editor';

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
