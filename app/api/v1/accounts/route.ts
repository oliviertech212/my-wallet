import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/utils/prisma';
import { middleware } from '@/utils/middleware/middleware';

export async function GET(req: NextRequest) {
 
  const userId = await middleware(req);
   console.log("userId",userId);
   


  try{
    const accounts = await prisma.account.findMany({
      where: {
        userId: userId,
      },
    });
  
    return NextResponse.json(
      { accounts },
      { status: 200 }
    );
  }
  catch (error) {
    return NextResponse.json(
      { error: 'Error fetching accounts' },
      { status: 500 }
    );
  }

 
}


export async function POST(req: NextRequest) {

  const response = await middleware(req);

  if (response.status === 401) {
    return response;
  }
  let userId = response;

  const { name, type, balance, currency } = await req.json();
  const account = await prisma.account.create({
    data: { name, type, balance, currency, userId },
  });
  return NextResponse.json(account, { status: 201 });
}