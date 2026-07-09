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

export function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(' ');
  const firstName = parts[0] || '';
  const lastName = parts.slice(1).join(' ') || '';
  return { firstName, lastName };
}
