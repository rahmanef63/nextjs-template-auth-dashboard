import { NextResponse } from 'next/server';
import { prisma } from 'shared/lib/prisma';

export async function GET() {
  try {
    const [totalUsers, activeUsers, newUsers] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({
        where: {
          // Add your active user criteria
        }
      }),
      prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0))
          }
        }
      })
    ]);

    // Generate sample data for charts
    const userGrowth = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return {
        date: date.toISOString().split('T')[0],
        value: Math.floor(Math.random() * 100) + totalUsers - (6 - i) * 10,
      };
    });

    const activityOverview = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return {
        date: date.toISOString().split('T')[0],
        value: Math.floor(Math.random() * 1000),
      };
    });

    const data = {
      totalUsers,
      activeUsers,
      newUsers,
      systemStatus: 'active' as const,
      userGrowth,
      activityOverview,
    };

    return NextResponse.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}