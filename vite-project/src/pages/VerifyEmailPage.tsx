import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import cosmicGradient from '../assets/cosmic-gradient.jpg';

const VerifyEmailPage: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '']);
  const [timer, setTimer] = useState(45);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOtpChange = useCallback((index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  }, [otp]);

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }, [otp]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 5);
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }
    setOtp(newOtp);
    const nextEmpty = newOtp.findIndex((v) => !v);
    const focusIndex = nextEmpty === -1 ? 4 : nextEmpty;
    inputRefs.current[focusIndex]?.focus();
  }, [otp]);

  const handleResend = () => {
    setTimer(45);
    setOtp(['', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <AuthLayout image={cosmicGradient}>
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
          Verify Email
        </h1>

        {/* Check Inbox Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">📬</span>
            <h2 className="text-sm font-bold text-gray-900">Check your inbox</h2>
          </div>
          <p className="text-sm text-gray-500">
            We've sent a verification code to
          </p>
          <p className="text-sm font-bold text-violet-600">
            shaad@college.edu
          </p>
        </div>

        {/* OTP Input */}
        <div className="flex gap-3 justify-center mb-6" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              id={`otp-input-${index}`}
              className="w-12 h-14 text-center text-lg font-bold bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-400 transition-all duration-200"
              aria-label={`OTP digit ${index + 1}`}
            />
          ))}
        </div>

        {/* Resend Timer */}
        <div className="text-center mb-8">
          {timer > 0 ? (
            <p className="text-sm text-gray-400">
              Resend in {formatTime(timer)}
            </p>
          ) : (
            <button
              onClick={handleResend}
              id="resend-otp-btn"
              className="text-sm text-violet-600 font-semibold hover:text-violet-700 transition-colors duration-200 cursor-pointer"
            >
              Resend Code
            </button>
          )}
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

export default VerifyEmailPage;
