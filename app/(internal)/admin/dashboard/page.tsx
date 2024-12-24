import { DashboardStats } from 'slices/dashboard/components/DashboardStats';
import { DashboardCharts } from 'slices/dashboard/components/DashboardCharts';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
      <DashboardStats />
      <DashboardCharts />
    </div>
  );
}