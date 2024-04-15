'use client';

import React, { useState } from 'react';

interface Props {
  label: string;
  onFileSelect: (files: File[]) => void;
}

const ICON_PLUS = '/icons/plus.svg';

const Dropzone = ({ label = '파일 추가', onFileSelect }: Props) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'copy';
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    const uploadedFiles = Array.from(event.dataTransfer.files);
    onFileSelect(uploadedFiles);
    console.log('handleDrop', uploadedFiles);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files as FileList);
    onFileSelect(uploadedFiles);
    console.log('handleFileSelect', uploadedFiles);
  };

  return (
    <div
      className={`bg-grey100 border-grey400 text-grey500 text-bold flex flex-row justify-center rounded border border-dashed text-[18px] ${
        isDragging ? 'bg-primary100' : ''
      }`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="fileInput"
        className="hidden"
        value=""
        multiple
        onChange={handleFileSelect}
      />
      <label
        htmlFor="fileInput"
        className="flex h-full w-full cursor-pointer justify-center py-20"
      >
        <img className="object-fill px-5 brightness-[.63]" src={ICON_PLUS} />
        {label}
      </label>
    </div>
  );
};

export default Dropzone;
