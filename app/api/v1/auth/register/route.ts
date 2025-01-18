
import { NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

 import { registerSchema , generateToken , hashPassword,comparePasswords  } from '../../../../../utils/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate input
    const validatedData = registerSchema.parse(body);
    
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(validatedData.password);
    
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        name: validatedData.name,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    // Generate token
    const token = generateToken(user.id);

    return NextResponse.json({
      message: 'Registration successful',
      user,
      token,
    }, { status: 201 });
    
  } catch (error: any) {
    console.log(
      'Error registering user',
      error
    );
    
    if (error.name === 'ZodError' ) {
      return NextResponse.json(
        { error: error.errors.map((err: any) => err.message)[0] },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}