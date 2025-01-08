import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(
      JSON.stringify({ error: 'Authentication required' }),
      { status: 401 }
    );
  }

  // Mock data for demonstration
  const teams = [
    { id: 1, name: 'Engineering', members: 12 },
    { id: 2, name: 'Design', members: 8 },
    { id: 3, name: 'Product', members: 5 },
  ];

  return NextResponse.json(teams);
}
