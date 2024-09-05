import './styles.css';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import type { Route } from 'next';
import Link from 'next/link';

import SvgComp from '@/components/common/SvgComp';
import { useLogOutMutation } from '@/hooks/react-query/mutation/useLogOutMutation';
import useGetUserInfo from '@/hooks/react-query/query/useGetUserInfo';
import usePathNameList from '@/hooks/usePathNameList';
import { useAuthActions } from '@/store/authStore';

import { accountTabList } from './keyword/[keyword]/[related_word]/tabList';

const TopAccountButton = () => {
  const { data } = useGetUserInfo();

  const [, accountTab] = usePathNameList();

  const { setIsSignedIn } = useAuthActions();

  const { mutate } = useLogOutMutation();

  const handleLogOut = () => {
    mutate(
      {},
      {
        onSuccess: () => {
          setIsSignedIn(false);
        },
      },
    );
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div className="rounded-8 flex cursor-pointer items-center gap-[10px] p-2 hover:shadow-md hover:transition-all">
          <div className="rounded-8 bg-grey200 cursor-pointer p-3">
            <SvgComp
              icon="HeaderUserProfile"
              size={24}
              className="[&_path]:stroke-grey400 [&_path]:fill-grey400"
            />
          </div>

          <div>
            <p className="text-grey900 text-[14px]">{data?.userEmail}</p>
            <p className="text-grey500 text-[12px]">{data?.plan}</p>
          </div>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
          {accountTabList.map((tab) => (
            <Link href={`/account/${tab.link}` as Route}>
              <DropdownMenu.CheckboxItem
                className="DropdownMenuCheckboxItem"
                checked={tab.link === accountTab}
              >
                <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                  <SvgComp icon="CheckIcon" size={12} />
                </DropdownMenu.ItemIndicator>
                {tab.title}
              </DropdownMenu.CheckboxItem>
            </Link>
          ))}

          {/* 아직 도움말에 대한 기능 X */}
          <DropdownMenu.Item className="DropdownMenuItem">
            <>도움말</>
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="DropdownMenuItem"
            onClick={handleLogOut}
          >
            <>로그아웃</>
          </DropdownMenu.Item>

          {/* <DropdownMenu.Separator className="DropdownMenuSeparator" /> */}

          {/* <DropdownMenu.Label className="DropdownMenuLabel">
            People
          </DropdownMenu.Label>
          <DropdownMenu.RadioGroup>
            <DropdownMenu.RadioItem
              className="DropdownMenuRadioItem"
              value="pedro"
            >
              <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator"></DropdownMenu.ItemIndicator>
              Pedro Duarte
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem
              className="DropdownMenuRadioItem"
              value="colm"
            >
              <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator"></DropdownMenu.ItemIndicator>
              Colm Tuite
            </DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>

          <DropdownMenu.Arrow className="DropdownMenuArrow" /> */}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default TopAccountButton;

{
  /* <DropdownMenu.Sub>
<DropdownMenu.SubTrigger className="DropdownMenuSubTrigger">
  More Tools
  <div className="RightSlot"><ChevronRightIcon /> </div>
</DropdownMenu.SubTrigger>
<DropdownMenu.Portal>
  <DropdownMenu.SubContent
    className="DropdownMenuSubContent"
    sideOffset={2}
    alignOffset={-5}
  >
    <DropdownMenu.Item className="DropdownMenuItem">
      Save Page As… <div className="RightSlot">⌘+S</div>
    </DropdownMenu.Item>
    <DropdownMenu.Item className="DropdownMenuItem">
      Create Shortcut…
    </DropdownMenu.Item>
    <DropdownMenu.Item className="DropdownMenuItem">
      Name Window…
    </DropdownMenu.Item>
    <DropdownMenu.Separator className="DropdownMenu.Separator" />
    <DropdownMenu.Item className="DropdownMenuItem">
      Developer Tools
    </DropdownMenu.Item>
  </DropdownMenu.SubContent>
</DropdownMenu.Portal>
</DropdownMenu.Sub>

<DropdownMenu.Separator className="DropdownMenuSeparator" /> */
}
