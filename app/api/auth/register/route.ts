import { NextResponse } from 'next/server';
import { prisma } from 'shared/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // First, get the default user role
    const userRole = await prisma.role.findFirst({
      where: { name: 'USER' },
    });

    if (!userRole) {
      return NextResponse.json(
        { error: 'Default role not found' },
        { status: 500 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user with the role relationship
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: {
          connect: {
            id: userRole.id,
          },
        },
      },
      include: {
        role: true,
      },
    });

    // Don't send the password back in the response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({ user: userWithoutPassword }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}