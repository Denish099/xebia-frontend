import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import cosmicGradient from '../assets/cosmic-gradient.jpg';
import { useForgotPassword } from '../features/auth/hooks/useForgotPassword';
import { forgotPasswordSchema } from '../utils/validation';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const forgotMutation = useForgotPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = forgotPasswordSchema.safeParse({ email });
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

    forgotMutation.mutate({ email });
  };

  return (
    <AuthLayout image={cosmicGradient}>
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1 tracking-tight">
          Enter your email.
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          We'll send you a secure reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="reset-email" className="block text-xs font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="reset-email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({});
              }}
              placeholder="eg. john@mail.com"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-400 transition-all duration-200"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="pt-1">
            <button
              type="submit"
              id="send-link-btn"
              disabled={forgotMutation.isPending}
              className="w-full py-3 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              {forgotMutation.isPending ? 'Sending...' : 'Send Link'}
            </button>
          </div>
        </form>

        <div className="mt-5 text-center">
          <Link
            to="/login"
            className="text-violet-600 text-sm font-semibold hover:text-violet-700 transition-colors duration-200"
          >
            Back to Sign In
          </Link>
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-400 text-sm">
            New to University?
          </p>
          <Link
            to="/signup"
            className="text-violet-600 text-sm font-semibold hover:text-violet-700 transition-colors duration-200"
          >
            Create your free Account
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
