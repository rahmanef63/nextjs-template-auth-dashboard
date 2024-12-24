import { NextResponse } from 'next/server';
import prisma from 'shared/lib/prisma';

export async function GET() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: 'admin@example.com' },
      include: { role: true }
    });

    return NextResponse.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Test error:', error);
    return NextResponse.json(
      { success: false, message: 'Database connection error', error: String(error) },
      { status: 500 }
    );
  }
}
