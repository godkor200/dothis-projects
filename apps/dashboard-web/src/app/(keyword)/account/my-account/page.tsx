'use client';

import './styles.css';

import * as Switch from '@radix-ui/react-switch';

import useGetUserInfo from '@/hooks/react-query/query/useGetUserInfo';

const Page = () => {
  const { data: userData } = useGetUserInfo();

  return (
    <div className="flex justify-center">
      <div className="bg-grey200 rounded-10 flex w-[600px] flex-col gap-[20px] p-10">
        <div>
          <p className="mb-[10px] text-[16px] font-bold">이메일</p>
          <p className="text-[14px] font-[500]"> {userData?.userEmail}</p>
        </div>

        <div>
          <p className="mb-[10px] text-[16px] font-bold">채널 정보</p>

          {userData?.channel ? (
            <p className="text-[14px] font-[500]">
              {userData.channel.channelName}
            </p>
          ) : (
            <p className="text-[14px] font-[500]">
              등록된 채널정보가 없습니다.
            </p>
          )}
        </div>

        <div>
          <p className="mb-[10px] text-[16px] font-bold">알림</p>

          <div className="flex items-center justify-between">
            <label
              className="select-none text-[14px] font-[500]"
              htmlFor="notification-set"
            >
              공지사항 및 마케팅 정보 알림
            </label>
            <Switch.Root className="SwitchRoot" id="notification-set">
              <Switch.Thumb className="SwitchThumb" />
            </Switch.Root>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
