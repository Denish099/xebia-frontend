import React from 'react';
import { Link } from 'react-router-dom';

const SessionExpiredPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Session Expired</h1>
        <p className="text-gray-500 text-sm mb-8">
          Your session has expired. Please log in again to continue.
        </p>
        <Link
          to="/login"
          className="inline-block w-full py-3 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-all duration-200 text-center"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default SessionExpiredPage;
