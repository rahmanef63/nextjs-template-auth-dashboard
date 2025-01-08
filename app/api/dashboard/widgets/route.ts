import { NextResponse } from 'next/server';
import { prisma } from 'shared/lib/prisma';

export async function GET() {
  try {
    // Example widget data - customize based on your needs
    const data = [
      {
        id: '1',
        title: 'User Growth',
        type: 'chart',
        data: {
          // Sample data - replace with actual data from your database
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          values: [30, 40, 45, 50, 49, 60],
        },
      },
      {
        id: '2',
        title: 'Activity Overview',
        type: 'chart',
        data: {
          // Sample data - replace with actual data from your database
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          values: [65, 59, 80, 81, 56, 55, 40],
        },
      },
    ];

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard widgets' },
      { status: 500 }
    );
  }
}
