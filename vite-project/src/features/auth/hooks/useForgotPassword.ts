import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { forgotPassword } from '../api/authApi';
import type { ForgotPasswordPayload } from '../types/authTypes';

export function useForgotPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: ForgotPasswordPayload) => forgotPassword(payload),
    onSuccess: (response) => {
      toast.success(response.message || 'Password reset link sent to your email');
      navigate('/verify-email');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
