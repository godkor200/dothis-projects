import { Center, useBoolean } from '@chakra-ui/react';

import type { MentionInputProps } from '@/components/ui/Input/MentionInput';
import MentionInput from '@/components/ui/Input/MentionInput';
import { useMatch } from '@/hooks/useMatch';
import trpcHooks from '@/utils/trpcHooks';

import SvgSearch from '../../Icons/SvgSearch';

export type SearchInputProps = Omit<MentionInputProps, 'match'>;
const SearchInput = (props: SearchInputProps) => {
  const creatorNames = trpcHooks.useQuery(['creator - get all'], {
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
