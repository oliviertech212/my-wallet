import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/utils/prisma';
import { middleware } from '@/utils/middleware/middleware';

export async function GET(req: NextRequest) {
  const userId = await middleware(req);

  if (!userId || userId.status === 401) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const id = req.nextUrl.pathname.split('/').pop();

  if (!id) {
    return NextResponse.json({ error: 'Account ID is required' }, { status: 400 });
  }

  try {
    const account = await prisma.account.findUnique({
      where: { id: Number(id), userId: Number(userId) },
    });

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    return NextResponse.json(account, { status: 200 });
  } catch (error) {
    console.error('Error fetching account:', error);
    return NextResponse.json(
      { error: 'Error fetching account' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const userId = await middleware(req);

  if (!userId || userId.status === 401) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const id = req.nextUrl.pathname.split('/').pop();

  if (!id) {
    return NextResponse.json({ error: 'Account ID is required' }, { status: 400 });
  }

  try {
    const { name, type, balance, currency } = await req.json();
    const account = await prisma.account.update({
      where: { id: Number(id), userId: Number(userId) },
      data: { name, type, balance, currency },
    });

    return NextResponse.json(account, { status: 200 });
  } catch (error) {
    console.error('Error updating account:', error);
    return NextResponse.json(
      { error: 'Error updating account' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const userId = await middleware(req);

  if (!userId || userId.status === 401) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const id = req.nextUrl.pathname.split('/').pop();

  if (!id) {
    return NextResponse.json({ error: 'Account ID is required' }, { status: 400 });
  }

  try {
    await prisma.account.delete({
      where: { id: Number(id), userId: Number(userId) },
    });

    return NextResponse.json(
      { message: 'Account deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting account:', error);
    return NextResponse.json(
      { error: 'Error deleting account' },
      { status: 500 }
    );
  }
}
