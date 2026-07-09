import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import signupGradient from '../../../assets/signup-gradient.jpg';
import { useLogin } from '../hooks/useLogin';
import { loginSchema } from '../schemas/validation';
import { storage } from '../utils/storage';
import type { LoginFormData } from '../schemas/validation';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(storage.getRememberMe());
  const [errors, setErrors] = useState<Record<string, string>>({});

  const loginMutation = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = loginSchema.safeParse(formData);
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

    storage.setRememberMe(rememberMe);
    loginMutation.mutate(formData as LoginFormData);
  };

  const inputClasses =
    'w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-400 transition-all duration-200';

  return (
    <AuthLayout image={signupGradient}>
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1 tracking-tight">
          Welcome back
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          Login to continue to your workspace!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="login-email" className="block text-xs font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="login-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="eg. john@mail.com"
              className={inputClasses}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="login-password" className="block text-xs font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="login-password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Your Password"
              className={inputClasses}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
            <div className="mt-1.5 flex items-center justify-between">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                />
                <span className="text-xs text-gray-500">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-xs text-violet-600 font-medium hover:text-violet-700 transition-colors duration-200"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <div className="pt-1">
            <button
              type="submit"
              id="login-btn"
              disabled={loginMutation.isPending}
              className="w-full py-3 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              {loginMutation.isPending ? 'Logging in...' : 'Log in'}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-violet-600 font-semibold hover:text-violet-700 transition-colors duration-200"
          >
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
