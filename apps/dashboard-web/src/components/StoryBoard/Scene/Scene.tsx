import { useState } from 'react';

import SceneControls from './SceneControls';
import SceneList from './SceneList';

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
    <div className="flex flex-col items-center gap-[50px]">
      <SceneControls
        toggleEdit={toggleEdit}
        getCheckedSceneIds={getCheckedSceneIds}
      />
      <SceneList
        isEditing={isEditing}
        checkedItems={checkedItems}
        toggleChecked={toggleChecked}
      />
    </div>
  );
};

export default Scene;
