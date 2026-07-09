import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { resetPassword } from '../api/authApi';
import type { ResetPasswordPayload } from '../types/authTypes';

export function useResetPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) => resetPassword(payload),
    onSuccess: () => {
      toast.success('Password changed successfully');
      navigate('/login', { replace: true });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
