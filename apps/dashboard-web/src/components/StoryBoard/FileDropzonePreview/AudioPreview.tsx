interface AudioPreviewProps {
  audioUrls: string[];
  handleDelete: (index: number) => void; // API에 따라 수정 필요
}

const ICON_NOTE = '/icons/beam-note.svg';
const ICON_X = '/icons/pricing_x.svg';

const AudioPreview = ({ audioUrls, handleDelete }: AudioPreviewProps) => {
  return (
    <div className="flex flex-col gap-[12px]">
      {audioUrls.map((audio, index) => (
        <div className="border-grey400 gap-30 flex flex-row items-center rounded border px-5 py-2">
          <img
            src={ICON_NOTE}
            className="border-grey700 h-[60px] w-[60px] rounded border p-3.5"
          />
          <div className="flex grow flex-col gap-[10px] py-2" key={index}>
            <label className="font-gery700 font-[16px]">
              {audio.split('/').at(-1)}
            </label>
            <span className="text-grey500 font-[14px]">파일용량</span>
          </div>
          <img
            className="h-full object-fill py-4 brightness-[2] grayscale"
            src={ICON_X}
            onClick={() => handleDelete(index)}
          />
        </div>
      ))}
    </div>
  );
};

export default AudioPreview;
