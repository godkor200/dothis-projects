'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useRef } from 'react';

import Draggable from '@/components/common/Dnd/Draggable';
import DragHandle from '@/components/common/Dnd/DragHandle';

const SceneListHeader = () => {
  return (
    <div className="flex w-full items-center gap-[50px] px-[10px] pt-[20px] text-center font-bold text-black">
      <div className="bg-grey100 grow p-2">Content</div>
      <div className="bg-grey100 grow p-2">Vedio</div>
      <div className="bg-grey100 grow p-2">Audio</div>
    </div>
  );
};

interface SceneListProps {
  isEditing: boolean;
  checkedItems: { [key: string]: boolean };
  toggleChecked: (id: string) => void;
}

const SceneList = ({
  isEditing,
  checkedItems,
  toggleChecked,
}: SceneListProps) => {
  // react query data
  // Record<string, { description: string; video: string; audio: string }>;
  const data = {
    1: { description: '설명1', video: '비디오1', audio: '오디오1' },
    2: { description: '설명2', video: '비디오2', audio: '오디오2' },
    3: { description: '설명3', video: '비디오3', audio: '오디오3' },
    4: { description: '설명4', video: '비디오4', audio: '오디오4' },
    5: { description: '설명5', video: '비디오5', audio: '오디오5' },
  };

  return (
    <Draggable className="w-full px-[10px]" handle>
      {data &&
        Object.entries(data).map(([k, v], i) => (
          <SceneListItem
            sceneNumber={i + 1}
            sceneId={k}
            defaultValues={v}
            key={k}
            isEditing={isEditing}
            checkedItems={checkedItems}
            toggleChecked={toggleChecked}
          />
        ))}
    </Draggable>
  );
};

interface SceneListItemProps {
  sceneNumber: number;
  sceneId: string;
  defaultValues: StoryBoardSceneFieldValues;
  handleDragStart?: () => void;
  isEditing: boolean;
  checkedItems: { [key: string]: boolean };
  toggleChecked: (id: string) => void;
}

type StoryBoardSceneField = 'description' | 'video' | 'audio';
export type StoryBoardSceneFieldValues = Record<StoryBoardSceneField, string>;

const SceneListItem = ({
  sceneNumber,
  sceneId,
  defaultValues,
  isEditing,
  checkedItems,
  toggleChecked,
}: SceneListItemProps) => {
  const pathname = usePathname();
  const dragDivRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex w-full flex-col p-5" ref={dragDivRef}>
      <div className="flex h-12 w-[100px] flex-row items-center gap-[10px] object-cover ">
        <div className={`flex h-full ${!isEditing && 'hidden'}`}>
          <DragHandle index={sceneNumber - 1} dragDivRef={dragDivRef} />
          <input
            className="absoulte"
            type="checkbox"
            checked={checkedItems[sceneId]}
            onChange={() => toggleChecked(sceneId)}
          />
        </div>
        <p className="inline-text whitespace-nowrap text-black">
          # {sceneNumber}
        </p>
      </div>
      <div className="flex h-[12rem] w-full flex-row items-center gap-[80px] px-[10px] text-center text-sm font-bold text-black">
        <textarea
          className="h-full grow basis-1/3 resize-none border p-5"
          defaultValue={defaultValues.description}
          maxLength={5000}
          placeholder="씬에 대한 설명을 작성해 주세요."
        />
        <Link
          className="h-full grow basis-1/3 border"
          href={{
            pathname: `${pathname}/${sceneId}`,
          }}
        >
          <p>video image src: {defaultValues.video}</p>
          누르면 artboard 페이지로 이동
        </Link>
        <textarea
          className="h-full grow basis-1/3 resize-none border p-5"
          defaultValue={defaultValues.audio}
          maxLength={5000}
          placeholder="나레이션 및 자막을 작성해 주세요."
        />
      </div>
    </div>
  );
};

const SceneMainContents = {
  Header: SceneListHeader,
  List: SceneList,
};

export default SceneMainContents;
