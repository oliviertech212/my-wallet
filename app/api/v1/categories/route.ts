
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import { middleware } from '@/utils/middleware/middleware';

// GET all categories for the authenticated user
export async function GET(req: NextRequest) {
  const userId = await middleware(req);

  try {
    const categories = await prisma.category.findMany({
      where: { userId },
      include: { subcategories: true },
    });
    return NextResponse.json(      { categories: categories,}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching categories' }, { status: 500 });
  }
}

// POST create a new category
export async function POST(req: NextRequest) {
  const userId = await middleware(req);
  const { name, description } = await req.json();

  try {
    const category = await prisma.category.create({
      data: {
        name,
        description,
        userId,
      },
    });
    return NextResponse.json(
      {  category: category,}
        , { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating category' }, { status: 500 });
  }
}

// DELETE a category (and associated subcategories and budgets)
export async function DELETE(req: NextRequest) {
  const userId = await middleware(req);
  const { categoryId } = await req.json();

  try {
    // Validate category
    const category = await prisma.category.findFirst({
      where: { id: categoryId, userId },
    });
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    // Delete the category and cascade delete related data
    await prisma.category.delete({
      where: { id: categoryId },
    });

    return NextResponse.json({ message: 'Category deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting category' }, { status: 500 });
  }
}
