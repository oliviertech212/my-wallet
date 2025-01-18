import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/utils/prisma';
import { middleware } from '@/utils/middleware/middleware';

export async function GET(req: NextRequest & { query: { id: string } }) {
    const  response = await middleware(req);
    if (response.status === 401) {
      return response;
    }
    const userId = response;
  const { id } = req.query;
  const account = await prisma.account.findUnique({ 
    where: { 
        id: Number(id),
        userId: userId

   } });
  if (!account) {
    return NextResponse.json({ error: 'Account not found' }, { status: 404 });
  }
  return NextResponse.json(account, { status: 200 });
}

export async function PUT(req: NextRequest & { query: { id: string } }) {
    const response = await middleware(req);
    if (response.status === 401) {
      return response;
    }
    const userId
        = response  ;
  const { id } = req.query;
  const { name, type, balance, currency } = await req.json();
  const account = await prisma.account.update({
    where: { id: Number(id) , userId: userId},
    data: { name, type, balance, currency },
  });
  return NextResponse.json(account, { status: 200 });
}

export async function DELETE(req: NextRequest & { query: { id: string } }) {
    const response = await middleware(req);
    if (response.status === 401) {
      return response;
    }
    const userId = response
  const { id } = req.query;
  await prisma.account.delete({ where: { id: Number(id) ,
    userId: userId
  } });
  return NextResponse.json({ message: 'Account deleted' }, { status: 200 });
}