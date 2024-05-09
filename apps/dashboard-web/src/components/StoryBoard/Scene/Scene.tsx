import { useState } from 'react';

import DraggableContextProvider from '@/components/common/Dnd/DraggableContext';

import SceneControls from './SceneControls';
import SceneMainContents from './SceneMainContents';

const Scene = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const toggleEdit = () => {
    setIsEditing((prevState) => !prevState);
  };

  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {},
  );
  const toggleChecked = (id: string) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [id]: !prevCheckedItems[id],
    }));
  };
  const getCheckedSceneIds = () => {
    return Object.keys(checkedItems).filter((key) => checkedItems[key]);
  };
  return (
    <DraggableContextProvider>
      <div className="flex flex-col items-center gap-[50px]">
        <SceneControls
          isEditing={isEditing}
          toggleEdit={toggleEdit}
          getCheckedSceneIds={getCheckedSceneIds}
          // scene data
        />
        <SceneMainContents.Header />
        <SceneMainContents.List
          isEditing={isEditing}
          checkedItems={checkedItems}
          toggleChecked={toggleChecked}
        />
      </div>
    </DraggableContextProvider>
  );
};

export default Scene;
