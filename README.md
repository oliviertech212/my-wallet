

## My Wallet

This web application helps users manage their finances by tracking accounts, budgets, and transactions.

## Technologies 
- Next.js (Full Stack)
- Prisma ORM
- PostgreSQL Database
- Shared UI Components
- Nodemailer (Email Notifications for Budget Exceeding Transactions)

## How to Run This Project Locally

1. Clone the repository:
   `git clone https://github.com/oliviertech212/my-wallet.git`

2. Change directory:
   `cd my-wallet`

3. Install dependencies
 `npm install`
4. Create a .env file based on .env.example.
5. Run database migrations:
`npm run migration`
6. Start the development server:
`npm run dev `
7. The app will be running on http://localhost:3000/.
8. Here is the deployed version: `https://my-wallet-chi-sepia.vercel.app/`


## Example Scenario
Create an account.
Sign in to the dashboard.

User creates accounts:
Example: Checking Account (Balance: $1,000)
User creates categories and subcategories:
Example: "Food" -> "Groceries"
User creates budgets:
Example: $500 for "Food"
User records a transaction:
Example: Spent $50 on groceries using "Checking Account."
After recording the transaction:
Checking Account Balance: $950
Budget Remaining: $450

