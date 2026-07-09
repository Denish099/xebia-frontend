import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import cosmicGradient from '../../../assets/cosmic-gradient.jpg';
import { useResetPassword } from '../hooks/useResetPassword';
import { resetPasswordSchema } from '../schemas/validation';

const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const resetMutation = useResetPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = resetPasswordSchema.safeParse({ password, confirmPassword });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    if (!token) {
      setErrors({ token: 'Invalid or missing reset token' });
      return;
    }

    resetMutation.mutate({ token, newPassword: password });
  };

  const inputClasses =
    'w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-400 transition-all duration-200';

  return (
    <AuthLayout image={cosmicGradient}>
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1 tracking-tight">
          Reset Password
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="reset-password" className="block text-xs font-semibold text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              id="reset-password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter New Password"
              className={inputClasses}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="reset-confirm-password" className="block text-xs font-semibold text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="reset-confirm-password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              className={inputClasses}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
            )}
            {errors.token && (
              <p className="text-red-500 text-xs mt-1">{errors.token}</p>
            )}
          </div>

          <div className="pt-1">
            <button
              type="submit"
              id="reset-password-btn"
              disabled={resetMutation.isPending}
              className="w-full py-3 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              {resetMutation.isPending ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
