import { DashboardStats } from 'slices/dashboard/components/DashboardStats';
import { DashboardCharts } from 'slices/dashboard/components/DashboardCharts';
import { UserList } from 'slices/users/components/UserList';

export default function ManagerDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Manager Dashboard</h2>
      <DashboardStats />
      <DashboardCharts />
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">User Management</h3>
        <UserList />
      </div>
    </div>
  );
}