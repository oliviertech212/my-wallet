

import { NextResponse } from 'next/server';
import { registerSchema , generateToken , hashPassword  , comparePasswords} from '../../../../../utils/auth';
import { loginSchema } from '../../../../../utils/auth';
import prisma from '@/utils/prisma';
export async function POST(req: Request) {
  try {
    const body = await req.json();
    
   
    const validatedData = loginSchema.parse(body);
    

    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await comparePasswords(
      validatedData.password,
      user.password
    );

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken(user.id);

    // Return user data without password
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: 'Login successful',
      user: userWithoutPassword,
      token,
    });
    
  } catch (error : any) {
   
    
    if (error.name === 'ZodError' ) {
      return NextResponse.json(
        { error: error.errors.map((err: any) => err.message)[0] },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}