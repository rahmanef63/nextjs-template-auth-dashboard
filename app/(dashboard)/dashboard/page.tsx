import { Card, CardContent, CardHeader, CardTitle } from 'shared/components/ui/card';

export default function DashboardPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is your dashboard overview.</p>
        </CardContent>
      </Card>
    </div>
  );
}