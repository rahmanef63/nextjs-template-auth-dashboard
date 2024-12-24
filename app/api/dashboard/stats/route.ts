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

    return NextResponse.json({
      totalUsers,
      activeUsers,
      newUsers,
      systemStatus: 'active'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}