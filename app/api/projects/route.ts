import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/auth-options';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(
      JSON.stringify({ error: 'Authentication required' }),
      { status: 401 }
    );
  }

  // Mock data for demonstration
  const projects = [
    { id: 1, name: 'Project A', status: 'active' },
    { id: 2, name: 'Project B', status: 'archived' },
    { id: 3, name: 'Project C', status: 'active' },
  ];

  return NextResponse.json(projects);
}
