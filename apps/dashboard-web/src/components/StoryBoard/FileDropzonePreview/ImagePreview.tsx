interface ImagePreviewProps {
  imageUrls: string[];
  handleDelete: (index: number) => void; // API에 따라 수정 필요
}

const ICON_X = '/icons/pricing_x.svg';

const ImagePreview = ({ imageUrls, handleDelete }: ImagePreviewProps) => {
  return (
    <div className="flex flex-row gap-[20px]">
      {imageUrls.map((image, index) => (
        <div
          className="group relative flex h-[126px] w-[126px] items-center justify-center"
          key={index}
          onClick={() => handleDelete(index)}
        >
          <img
            className="absolute h-full w-full rounded object-fill brightness-100 group-hover:brightness-75"
            src={image}
            alt={`${image}-${index}`}
          />
          <img
            className="invisible absolute h-full w-full object-fill p-8 brightness-[3] group-hover:visible"
            src={ICON_X}
          />
        </div>
      ))}
    </div>
  );
};

export default ImagePreview;
