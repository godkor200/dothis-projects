import { useQueryClient } from '@tanstack/react-query';

import { USER_KEY } from '@/constants/querykey';
import { apiClient } from '@/utils/api/apiClient';

export const useSignUpTermsMutation = () => {
  const queryClient = useQueryClient();

  const mutationResult = apiClient(2).user.putAgreePromotion.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(USER_KEY.all);
    },
  });

  return { ...mutationResult };
};
