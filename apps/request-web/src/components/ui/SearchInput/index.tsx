import { Center } from '@chakra-ui/react';
import SvgSearch from '@dothis/share/components/ui/Icons/SvgSearch';
import type { MentionInputProps } from '@dothis/share/components/ui/Input/MentionInput';
import MentionInput from '@dothis/share/components/ui/Input/MentionInput';
import { useMatch } from '@dothis/share/lib/hooks';

import { t } from '@/utils/trpc';

export type SearchInputProps = Omit<MentionInputProps, 'match'>;
const SearchInput = (props: SearchInputProps) => {
  const creatorNames = t.useQuery(['creator - get all'], {
    select: (data) => {
      let creatorNameArr: string[] = [];
      for (const creator of data) {
        if (creator.user.name) creatorNameArr.push(creator.user.name);
      }
      return creatorNameArr;
    },
  });

  const match = useMatch({
    getList(name) {
      return creatorNames.data ?? [];
    },
  });

  return (
    <MentionInput
      match={match}
      Right={
        <Center>
          <SvgSearch />
        </Center>
      }
      {...props}
    />
  );
};

export default SearchInput;
