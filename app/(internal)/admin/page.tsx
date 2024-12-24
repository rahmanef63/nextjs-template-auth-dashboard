'use client';

import { useAuth } from 'shared/hooks/useAuth';

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Welcome, {user?.name}!</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-2">Users</h3>
            <p className="text-gray-600">Manage system users</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-2">Settings</h3>
            <p className="text-gray-600">System configuration</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-2">Analytics</h3>
            <p className="text-gray-600">View system analytics</p>
          </div>
        </div>
      </div>
    </div>
  );
}
