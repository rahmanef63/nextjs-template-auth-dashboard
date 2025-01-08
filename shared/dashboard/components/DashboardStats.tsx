import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "shared/components/ui/card";
import { 
  Users,
  Activity,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Clock
} from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

const StatsCard = ({ title, value, description, icon, trend }: StatsCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">
        {title}
      </CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <div className="flex items-center text-sm text-muted-foreground">
        {description}
        {trend && (
          <span className={`ml-2 flex items-center ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {trend.isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
            {trend.value}
          </span>
        )}
      </div>
    </CardContent>
  </Card>
);

export function DashboardStats() {
  // In a real application, these would be fetched from an API
  const stats = [
    {
      title: "Active Users",
      value: "2,350",
      description: "Daily active users",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      trend: {
        value: "+12.5%",
        isPositive: true
      }
    },
    {
      title: "Activity Rate",
      value: "85%",
      description: "Average engagement",
      icon: <Activity className="h-4 w-4 text-muted-foreground" />,
      trend: {
        value: "+5.2%",
        isPositive: true
      }
    },
    {
      title: "Response Time",
      value: "1.2s",
      description: "Average response time",
      icon: <Clock className="h-4 w-4 text-muted-foreground" />,
      trend: {
        value: "-0.1s",
        isPositive: true
      }
    },
    {
      title: "Conversion Rate",
      value: "24.5%",
      description: "User conversion rate",
      icon: <BarChart3 className="h-4 w-4 text-muted-foreground" />,
      trend: {
        value: "-2.1%",
        isPositive: false
      }
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}
