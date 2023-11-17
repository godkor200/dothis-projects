import { useQueryClient } from '@tanstack/react-query';

import { USER_KEY } from '@/constants/querykey';
import { apiClient } from '@/utils/api/apiClient';

export const useLogOutMutation = () => {
  const queryClient = useQueryClient();

  const mutationResult = apiClient(1).auth.logout.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(USER_KEY.all);
    },
  });

  return { ...mutationResult };
};
