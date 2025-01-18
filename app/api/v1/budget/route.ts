import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import { middleware } from '@/utils/middleware/middleware';

// GET all budgets for the authenticated user
export async function GET(req: NextRequest) {
  const userId = await middleware(req);

  try {
    const budgets = await prisma.budget.findMany({
      where: { userId },
      include: { category: true },
    });
    return NextResponse.json(budgets, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching budgets' }, { status: 500 });
  }
}

// POST create a new budget
export async function POST(req: NextRequest) {
  const userId = await middleware(req);
  const { amount, startDate, endDate, categoryId } = await req.json();

  try {
    // Validate category relationship
    const categoryExists = await prisma.category.findFirst({
      where: { id: categoryId, userId },
    });
    if (!categoryExists) {
      return NextResponse.json({ error: 'Category does not exist or is not associated with the user' }, { status: 400 });
    }

    const budget = await prisma.budget.create({
      data: {
        amount,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        categoryId,
        userId,
      },
    });

    return NextResponse.json(budget, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating budget' }, { status: 500 });
  }
}

// PUT update a budget
export async function PUT(req: NextRequest) {
  const userId = await middleware(req);
  const { budgetId, amount, startDate, endDate, categoryId } = await req.json();

  try {
    // Validate budget
    const budget = await prisma.budget.findFirst({
      where: { id: budgetId, userId },
    });
    if (!budget) {
      return NextResponse.json({ error: 'Budget not found' }, { status: 404 });
    }

    // Validate category relationship
    const categoryExists = await prisma.category.findFirst({
      where: { id: categoryId, userId },
    });
    if (!categoryExists) {
      return NextResponse.json({ error: 'Category does not exist or is not associated with the user' }, { status: 400 });
    }

    // Update the budget
    const updatedBudget = await prisma.budget.update({
      where: { id: budgetId },
      data: {
        amount,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        categoryId,
      },
    });

    return NextResponse.json(updatedBudget, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error updating budget' }, { status: 500 });
  }
}

// DELETE a budget
export async function DELETE(req: NextRequest) {
  const userId = await middleware(req);
  const { budgetId } = await req.json();

  try {
    // Validate budget
    const budget = await prisma.budget.findFirst({
      where: { id: budgetId, userId },
    });
    if (!budget) {
      return NextResponse.json({ error: 'Budget not found' }, { status: 404 });
    }

    // Delete the budget
    await prisma.budget.delete({
      where: { id: budgetId },
    });

    return NextResponse.json({ message: 'Budget deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting budget' }, { status: 500 });
  }
}
