import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { login } from '../api/authApi';
import { useAuth } from '../store/authStore';
import { getRedirectPath } from '../utils/roleRedirect';
import type { LoginPayload } from '../types/authTypes';
import { storage } from '../../../utils/storage';

export function useLogin() {
  const navigate = useNavigate();
  const { setLogin, setLoading } = useAuth();

  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (response) => {
      const { id, email, roles, token } = response.data;
      const refreshTokenValue = storage.getRefreshToken() ?? '';

      setLogin(
        {
          id,
          email,
          firstName: '',
          lastName: '',
          roles,
        },
        token,
        refreshTokenValue,
      );

      toast.success('Login successful');
      navigate(getRedirectPath(roles), { replace: true });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}
