import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import { middleware } from '@/utils/middleware/middleware';

// GET all subcategories for a specific category
export async function GET(req: NextRequest) {
  const userId = await middleware(req);
  const { searchParams } = new URL(req.url);
  const categoryId = parseInt(searchParams.get('categoryId') || '0');

  try {
    const subcategories = await prisma.subcategory.findMany({
      where: { categoryId, userId },
    });
    return NextResponse.json({subcategories:subcategories}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching subcategories' }, { status: 500 });
  }
}

// POST create a new subcategory
export async function POST(req: NextRequest) {
  const userId = await middleware(req);
  const { name, description, categoryId } = await req.json();

  try {
    // Validate category relationship
    const categoryExists = await prisma.category.findFirst({
      where: { id: categoryId, userId },
    });
    if (!categoryExists) {
      return NextResponse.json({ error: 'Category does not exist or is not associated with the user' }, { status: 400 });
    }

    const subcategory = await prisma.subcategory.create({
      data: {
        name,
        description,
        categoryId,
        userId,
      },
    });

    return NextResponse.json({subcategory: subcategory}, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating subcategory' }, { status: 500 });
  }
}

// DELETE a subcategory
export async function DELETE(req: NextRequest) {
  const userId = await middleware(req);
  const { subcategoryId } = await req.json();

  try {
    // Validate subcategory
    const subcategory = await prisma.subcategory.findFirst({
      where: { id: subcategoryId, userId },
    });
    if (!subcategory) {
      return NextResponse.json({ error: 'Subcategory not found' }, { status: 404 });
    }

    // Delete the subcategory
    await prisma.subcategory.delete({
      where: { id: subcategoryId },
    });

    return NextResponse.json({ message: 'Subcategory deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting subcategory' }, { status: 500 });
  }
}
