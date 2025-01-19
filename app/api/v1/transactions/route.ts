import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import { middleware } from '@/utils/middleware/middleware';
import { sendEmail } from '@/utils/Notification/email';
import { use } from 'react';

// GET all transactions for the authenticated user
export async function GET(req: NextRequest) {
  const userId = await middleware(req);

  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      include: {
        account: true,
        category: true,
        subcategory: true,
      },
    });
    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching transactions' }, { status: 500 });
  }
}

// GET a single transaction by ID / balance/ 

// POST create a new transaction
export async function POST(req: NextRequest) {
  const userId = await middleware(req);
  const { amount, type, description, accountId, categoryId, subcategoryId, } = await req.json();

  try {
    // Validate relationships
    const accountExists = await prisma.account.findFirst({
      where: { id: accountId, userId },
    });
    if (!accountExists) {
      return NextResponse.json({ error: 'Account does not exist or is not associated with the user' }, { status: 400 });
    }

    if (categoryId) {
      const categoryExists = await prisma.category.findFirst({
        where: { id: categoryId, userId },
      });
      if (!categoryExists) {
        return NextResponse.json({ error: 'Category does not exist or is not associated with the user' }, { status: 400 });
      }
    }

    if (subcategoryId) {
      const subcategoryExists = await prisma.subcategory.findFirst({
        where: { id: subcategoryId, userId },
      });
      if (!subcategoryExists) {
        return NextResponse.json({ error: 'Subcategory does not exist or is not associated with the user' }, { status: 400 });
      }
    }


    // check account balance  and notify user if balance is low  compared to the transaction amount
    const account = await prisma.account.findFirst({
      where: { id: accountId },
    });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (account && account.balance < amount && type === 'EXPENSE' && user?.email) {
    
     await  sendEmail ({
        to:  user?.email ,
        subject: 'Low account balance',
        text: `Your account balance is low. You have made a transaction of ${amount} and your current balance is ${account.balance}`,
      
      });
      return NextResponse.json({ error: 'Account balance is low' }, { status: 400 });
    }



    // Create the transaction
    const transaction = await prisma.transaction.create({
      data: {
        amount,
        type,
        description,
        accountId,
        categoryId: categoryId || null,
        subcategoryId: subcategoryId || null,
      
        userId,
      },
    });
    



    // Update account balance (if transaction type is EXPENSE or INCOME)
    if (type === 'EXPENSE') {
      await prisma.account.update({
        where: { id: accountId },
        data: { balance: { decrement: amount } },
      });

      // update budget balance  
      const budget = await prisma.budget.findFirst({
        where: { categoryId: categoryId },
      });
      
      if (budget) {
        await prisma.budget.update({
          where: { id: budget.id },
          data: { amount: { decrement: amount } },
        });
      }




    } else if (type === 'INCOME') {

      // update budget balance
      const budget = await prisma.budget.findFirst({
        where: { categoryId: categoryId },
      });



      await prisma.account.update({
        where: { id: accountId },
        data: { balance: { increment: amount } },
      });
    }

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating transaction' }, { status: 500 });
  }
}

// DELETE a transaction and adjust the account balance
export async function DELETE(req: NextRequest) {
  const userId = await middleware(req);
  const { transactionId } = await req.json();

  try {
    // Fetch transaction to adjust the account balance
    const transaction = await prisma.transaction.findFirst({
      where: { id: transactionId, userId },
    });

    if (!transaction) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    // Update account balance
    if (transaction.type === 'EXPENSE') {

      await prisma.account.update({
        where: { id: transaction.accountId },
        data: { balance: { increment: transaction.amount } },
      });
    } else if (transaction.type === 'INCOME') {
      await prisma.account.update({
        where: { id: transaction.accountId },
        data: { balance: { decrement: transaction.amount } },
      });
    }

    // Delete the transaction
    await prisma.transaction.delete({
      where: { id: transactionId },
    });

    return NextResponse.json({ message: 'Transaction deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting transaction' }, { status: 500 });
  }
}
