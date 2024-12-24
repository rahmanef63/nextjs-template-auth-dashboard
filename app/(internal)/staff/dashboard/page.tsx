import { DashboardStats } from 'slices/dashboard/components/DashboardStats';

export default function StaffDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Staff Dashboard</h2>
      <DashboardStats />
    </div>
  );
}