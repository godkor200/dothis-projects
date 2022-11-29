import { Center } from '@chakra-ui/react';
import type { MentionInputProps } from '@dothis/share';
import MentionInput, { useMatch } from '@dothis/share';

import { trpc } from '@/utils/trpc';
import { SvgSearch } from '@dothis/share/components/ui';

export type SearchInputProps = Omit<MentionInputProps, 'match'>;
const SearchInput = (props: SearchInputProps) => {
  const creatorNames = trpc.creator.getAll.useQuery(undefined, {
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
