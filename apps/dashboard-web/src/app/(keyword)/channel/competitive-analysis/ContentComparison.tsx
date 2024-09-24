import SelectedMediaCard from '@/components/MainContents/MediaArticles/SelectedMediaCard';

const ContentComparison = () => {
  return (
    <>
      {['정민', '정민소'].map((item) => (
        <div className="rounded-10 border-grey400 mb-5 flex gap-[10px] overflow-hidden border p-5">
          <div className="flex flex-col justify-evenly">
            <div className="mb-10 flex items-center gap-[16px] ">
              <div className="bg-primary400 h-[100px] w-[100px] rounded-full"></div>

              <p className="text-grey900 font-bold">{item}</p>
            </div>
            <div className="flex text-center">
              <div className="w-[100px]">
                <p className="text-grey400 mb-[10px] text-[14px] font-[400]">
                  구독자 수
                </p>
                <p className="text-grey900 font-bold">1.05만명</p>
              </div>

              <div className="w-[100px]">
                <p className="text-grey400 mb-[10px] text-[14px] font-[400]">
                  평균 조회수
                </p>
                <p className="text-grey900 font-bold">987,321</p>
              </div>
              <div className="w-[100px]">
                <p className="text-grey400 mb-[10px] text-[14px] font-[400]">
                  영상 수
                </p>
                <p className="text-grey900 font-bold">3,456</p>
              </div>
            </div>
          </div>

          {[
            {
              element: '조회수 1185만',
              image: 'https://img.youtube.com/vi/lzm-7YfBJBU/0.jpg',
              link: 'lzm-7YfBJBU',
              provider: 'FIFTY FIFTY Official',
              title: 'FIFTY FIFTY (피프티피프티) ‘Starry Night’ Official MV',
              uploadDate: '2024-08-28T15:00:00.000Z',
            },
            {
              element: '조회수 1185만',
              image: 'https://img.youtube.com/vi/lzm-7YfBJBU/0.jpg',
              link: 'lzm-7YfBJBU',
              provider: 'FIFTY FIFTY Official',
              title: 'FIFTY FIFTY (피프티피프티) ‘Starry Night’ Official MV',
              uploadDate: '2024-08-28T15:00:00.000Z',
            },
            {
              element: '조회수 1185만',
              image: 'https://img.youtube.com/vi/lzm-7YfBJBU/0.jpg',
              link: 'lzm-7YfBJBU',
              provider: 'FIFTY FIFTY Official',
              title: 'FIFTY FIFTY (피프티피프티) ‘Starry Night’ Official MV',
              uploadDate: '2024-08-28T15:00:00.000Z',
            },
          ].map((mediaData, index) => (
            <SelectedMediaCard
              key={mediaData.title + index}
              mediaType={'youtube'}
              title={mediaData.title}
              provider={mediaData.provider}
              element={mediaData.element}
              uploadDate={mediaData.uploadDate}
              image={mediaData.image}
              link={mediaData.link}
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default ContentComparison;
