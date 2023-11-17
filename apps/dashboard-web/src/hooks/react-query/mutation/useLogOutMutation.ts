import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { USER_KEY } from '@/constants/querykey';
import { apiClient } from '@/utils/api/apiClient';

export const useLogOutMutation = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const mutationResult = apiClient(1).auth.logout.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(USER_KEY.all);
      router.replace('/');
    },
  });

  return { ...mutationResult };
};
