import { Button } from 'dashboard-storybook/src/components/Button/Button';

import { useDraggableContext } from '@/components/common/Dnd/DraggableContext';
import ConfirmModal from '@/components/common/Modal/ModalContent/ConfirmModal';
import { useModalActions } from '@/store/modalStore';

interface SceneControlsProps {
  isEditing: boolean;
  toggleEdit: () => void;
  getCheckedSceneIds: () => void;
}
// TODO: 씬 추가, 삭제 버튼 design
const SceneControls = ({
  isEditing,
  toggleEdit,
  getCheckedSceneIds,
}: SceneControlsProps) => {
  const { setIsModalOpen, setModalContent } = useModalActions();

  // 씬 순서 변경
  const addScene = () => {
    const pageRef = document.querySelector('#storyboard-detail-page');
    pageRef && pageRef.scrollTo({ top: 10000, behavior: 'smooth' });
  };
  const createScene = () => {
    // TODO: mutate
    addScene();
  };

  const deleteScene = () => {
    const checkedKeys = getCheckedSceneIds();

    // TODO: mutate
    setModalContent(
      <ConfirmModal
        message={`선택한 씬 스토리보드를 삭제하시겠습니까?\u000A삭제된 씬 스토리보드는 복구되지 않습니다.`}
        callback={() => {
          toggleEdit();
        }}
      />,
    );
    setIsModalOpen(true);
  };

  const { draggableItems } = useDraggableContext('SceneControls');
  const applyEdit = () => {
    // API에 따라서 수정되어야 함 (id리스트가 필요한지 등)

    // TODO: mutate
    setModalContent(
      <ConfirmModal
        message={`편집을 완료하시겠습니까?`}
        callback={() => {
          toggleEdit();
        }}
      />,
    );
    setIsModalOpen(true);
  };

  return (
    <div className="flex w-full gap-[24px] px-[10px] py-[30px] text-base">
      <div className="inline-flex grow gap-[20px]">
        <Button size="L" theme="outlined" onClick={toggleEdit}>
          씬 전체 편집
        </Button>
        <Button
          className=" text-primary500 bg-primary50 border-primary500 rounded-8 border-[1px] border-solid px-4 py-2 focus:outline-none"
          size="L"
          theme="outlined"
          onClick={createScene}
        >
          + New Scene
        </Button>
        <p></p>
      </div>
      {isEditing && (
        <div className="inline-flex grow-0 gap-[10px]">
          <Button
            className=" bg-grey700 border-grey500 rounded-8 border-[1px] border-solid px-6 py-2 text-white focus:outline-none"
            size="L"
            theme="outlined"
            onClick={deleteScene}
          >
            씬 삭제
          </Button>
          <Button size="L" theme="contained" onClick={applyEdit}>
            완료
          </Button>
        </div>
      )}
    </div>
  );
};

export default SceneControls;
