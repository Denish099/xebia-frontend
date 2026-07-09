import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { register } from '../api/authApi';
import { useAuth } from '../store/authStore';
import type { RegisterPayload } from '../types/authTypes';

export function useRegister() {
  const navigate = useNavigate();
  const { setLogin, setLoading } = useAuth();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (response) => {
      if (!response.data) {
        throw new Error((response as { message?: string }).message || 'Signup failed. Please try again.');
      }
      const { id, email, firstName, lastName, roles } = response.data;

      setLogin(
        { id, email, firstName, lastName, roles },
        '',
        '',
      );

      toast.success('Signup successful');
      navigate('/complete-profile', { replace: true });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}

