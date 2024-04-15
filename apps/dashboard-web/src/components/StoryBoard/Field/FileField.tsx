'use client';
import { useState } from 'react';

import AudioPreview from '../FileDropzonePreview/AudioPreview';
import Dropzone from '../FileDropzonePreview/Dropzone';
import ImagePreview from '../FileDropzonePreview/ImagePreview';

const FileField = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [audioUrls, setAudioUrls] = useState<string[]>([]);

  const handleFileAdd = (files: File[]) => {
    // s3 upload, mutate post
    files.forEach((file) => {
      const fileUrl = URL.createObjectURL(file);
      const fileType = file.type;

      if (fileType.startsWith('image/')) {
        setImageUrls((prevImageUrls) => [...prevImageUrls, fileUrl]);
      } else if (fileType.startsWith('audio/')) {
        setAudioUrls((prevAudioUrls) => [...prevAudioUrls, fileUrl]);
      }
    });
  };

  const handleDeleteImage = (index: number) => {
    // mutate Delete
    const deletedImageUrl = imageUrls[index];
    setImageUrls(imageUrls.filter((_, _index) => _index !== index));
    URL.revokeObjectURL(deletedImageUrl);
  };

  const handleDeleteAudio = (index: number) => {
    // mutate Delete
    const deletedAudioUrl = audioUrls[index];
    setAudioUrls(audioUrls.filter((_, _index) => _index !== index));
    URL.revokeObjectURL(deletedAudioUrl);
  };

  return (
    <div className="grid px-[30px]" style={{ gridTemplateColumns: '8% 92%' }}>
      <label
        htmlFor="input"
        className="text-grey700 inline-block auto-cols-max text-[14px]"
      >
        참고자료
      </label>
      <div className="flex w-full flex-col gap-[20px]">
        <Dropzone label="파일 추가" onFileSelect={handleFileAdd}></Dropzone>
        <ImagePreview imageUrls={imageUrls} handleDelete={handleDeleteImage} />
        <AudioPreview audioUrls={audioUrls} handleDelete={handleDeleteAudio} />
      </div>
    </div>
  );
};

export default FileField;
