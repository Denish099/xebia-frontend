import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { logout } from '../api/authApi';
import { useAuth } from '../store/authStore';

export function useLogout() {
  const navigate = useNavigate();
  const { setLogout, setLoading } = useAuth();

  return useMutation({
    mutationFn: () => logout(),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      setLogout();
      toast.success('Logged out successfully');
      navigate('/login', { replace: true });
    },
    onError: () => {
      setLogout();
      navigate('/login', { replace: true });
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}
