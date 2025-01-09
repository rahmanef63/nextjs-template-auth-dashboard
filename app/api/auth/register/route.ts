import { NextResponse } from 'next/server';
import { prisma } from 'shared/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();
    console.log('Registration attempt for:', email);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log('User already exists:', email);
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // First, get the default user role
    const userRole = await prisma.role.findFirst({
      where: { name: 'CLIENT' },
    });
    console.log('Found role:', userRole);

    if (!userRole) {
      console.log('Default CLIENT role not found');
      return NextResponse.json(
        { error: 'Default role not found' },
        { status: 500 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully');

    // Create the user with the role relationship
    console.log('Attempting to create user with role id:', userRole.id);
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
    console.log('User created successfully:', user.id);

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