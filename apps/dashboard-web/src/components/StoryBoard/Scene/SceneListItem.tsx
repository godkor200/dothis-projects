'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';

import DragHandle from '@/components/common/Dnd/DragHandle';

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
        {isEditing && (
          <DragHandle index={sceneNumber - 1} dragDivRef={dragDivRef} />
        )}
        <input
          className="absoulte"
          type="checkbox"
          checked={checkedItems[sceneId]}
          onChange={() => toggleChecked(sceneId)}
        />
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

export default SceneListItem;
