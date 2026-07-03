import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import cosmicGradient from '../assets/cosmic-gradient.jpg';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reset password for:', email);
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
          {/* Email */}
          <div>
            <label htmlFor="reset-email" className="block text-xs font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="reset-email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="eg. john@mail.com"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-400 transition-all duration-200"
            />
          </div>

          {/* Send Link Button */}
          <div className="pt-1">
            <Link to="/verify-email">
              <button
                type="submit"
                id="send-link-btn"
                className="w-full py-3 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                Send Link
              </button>
            </Link>
          </div>
        </form>

        {/* Back to Sign In */}
        <div className="mt-5 text-center">
          <Link
            to="/login"
            className="text-violet-600 text-sm font-semibold hover:text-violet-700 transition-colors duration-200"
          >
            Back to Sign In
          </Link>
        </div>

        {/* Create Account */}
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
