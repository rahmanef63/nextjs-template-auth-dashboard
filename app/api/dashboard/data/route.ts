import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from 'shared/lib/prisma';
import { addDays, format, subDays } from 'date-fns';

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Generate sample data for the last 30 days
    const today = new Date();
    const userGrowth = [];
    const activityOverview = [];

    for (let i = 29; i >= 0; i--) {
      const date = subDays(today, i);
      const formattedDate = format(date, 'MMM dd');

      // Sample user growth data
      userGrowth.push({
        date: formattedDate,
        value: Math.floor(Math.random() * 50) + 10,
      });

      // Sample activity data
      activityOverview.push({
        date: formattedDate,
        value: Math.floor(Math.random() * 100) + 20,
      });
    }

    return NextResponse.json({
      userGrowth,
      activityOverview,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}