'use client';

import MembershipModalFrame from '@/components/Membership/MembershipModalFrame';
import Price from '@/components/Pricing';
import useGetUserInfo from '@/hooks/react-query/query/useGetUserInfo';

const Page = () => {
  const { data: userData } = useGetUserInfo();

  return (
    <div className="flex flex-col items-center">
      <div className="bg-grey200 rounded-10 mb-[20px] flex w-[600px] flex-col gap-[20px] p-10">
        <p className="mb-[10px] text-[16px] font-bold">내 멤버십</p>
        <p className="text-[14px] font-[500]">{userData?.plan}</p>
      </div>
      <MembershipModalFrame />
    </div>
  );
};

export default Page;
