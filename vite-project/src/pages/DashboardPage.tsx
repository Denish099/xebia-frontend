import React from 'react';
import { useAuth } from '../features/auth/store/authStore';
import { useLogout } from '../features/auth/hooks/useLogout';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const logoutMutation = useLogout();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">University Portal</h1>
          <button
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
            className="px-4 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-all duration-200 cursor-pointer"
          >
            {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome, {user?.email || 'User'}
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            You are logged in as{' '}
            <span className="font-semibold text-violet-600">
              {user?.roles?.[0] || 'unknown'}
            </span>
          </p>

          <div className="border-t border-gray-100 pt-6 space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium text-gray-900 w-24">User ID:</span>
              <span className="text-gray-500">{user?.id}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium text-gray-900 w-24">Email:</span>
              <span className="text-gray-500">{user?.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium text-gray-900 w-24">Name:</span>
              <span className="text-gray-500">
                {user?.firstName} {user?.lastName}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium text-gray-900 w-24">Role:</span>
              <span className="text-gray-500">{user?.roles?.[0]}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
