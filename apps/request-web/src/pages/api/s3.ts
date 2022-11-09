import { S3Client } from '@aws-sdk/client-s3';
import { errorMessage } from '@dothis/share/lib/models';
import multer from 'multer';
import multerS3 from 'multer-s3';
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import superjson from 'superjson';
import { uid } from 'uid';

import { RequestPostDomain } from '../../domain';

const s3Client = new S3Client({ region: 'ap-northeast-2' });

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: 'dothis-contents',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req: NextApiRequest & Express.Request, file, cb) {
      const id = req?.query?.['post-id'];
      if (id) {
        if (file.fieldname == 'thumbnail') {
          cb(
            null,
            `request-post/${id}/thumbnail/` + `img_${Date.now()}_${uid(3)}`,
          );
        } else if (file.fieldname == 'images') {
          cb(null, `request-post/${id}/` + `img_${Date.now()}_${uid(3)}`);
        }
      }
    },
  }),
  limits: { fileSize: RequestPostDomain.constants.maxImageFileSize }, // 5mb
});

// type Files = { files: Express.MulterS3.File[]; file?: Express.MulterS3.File };
export type FileLocations = Array<[fileName: string, location: string]>;

const app = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    console.log(`${error.message}`);
    res
      .status(500)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

app.post(
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 5 },
  ]),
  function (req: NextApiRequest, res: NextApiResponse) {
    const files = (req as any).files;
    const images = files.images;
    const thumbnail = files.thumbnail;

    if (!files)
      return res.send(
        superjson.stringify(
          errorMessage({ message: '파일 업로드 중 에러가 발생했습니다.' }),
        ),
      );

    // 썸네일 정보 획득
    const thumbnailInfo: FileLocations = thumbnail.map(
      (file: Express.MulterS3.File) => [file.originalname, file.location],
    );

    // 콘텐츠 정보 획득
    const imagesInfo: FileLocations = images.map(
      (file: Express.MulterS3.File) => [file.originalname, file.location],
    );

    const uploadInfos = {
      thumbnail: thumbnailInfo,
      images: imagesInfo,
    };

    return res.send(superjson.stringify(uploadInfos));
  },
);

export default app;

export const config = {
  api: {
    bodyParser: false,
  },
};
