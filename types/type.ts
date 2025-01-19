




export interface User {
    id: number;
    email: string;
    name: string;
    password: string;
    createdAt: string; 
    updatedAt: string; 
    accounts: Account[];
    budgets: Budget[];
    categories: Category[];
    subcategories: Subcategory[];
    transactions: Transaction[];
  }
  
  export interface Account {
    id: number;
    name: string;
    type: AccountType;
    balance: number; 
    currency: string;
    userId: number;
    user: User; 
    transactions: Transaction[];
    createdAt: string; 
    updatedAt: string; 
  }
  
  export interface Category {
    id: number;
    name: string;
    description?: string;
    isActive: boolean;
    userId: number;
    user: User; 
    subcategories: Subcategory[];
    transactions: Transaction[];
    budgets: Budget[];
    createdAt: string; 
    updatedAt: string; 
  }
  
  export interface Subcategory {
    id: number;
    name: string;
    description?: string;
    isActive: boolean;
    categoryId: number;
    category: Category; 
    userId: number;
    user: User; 
    transactions: Transaction[];
    createdAt: string; 
    updatedAt: string; 
  }
  
  export interface Transaction {
    id: number;
    amount: number; 
    type: TransactionType;
    description?: string;
    date: string; 
    accountId: number;
    account: Account; 
    categoryId?: number;
    category?: Category; 
    subcategoryId?: number;
    subcategory?: Subcategory; 
    userId: number;
    user: User; 
    createdAt: string; 
    updatedAt: string; 
  }
  
  export interface Budget {
    id: number;
    amount: number; 
    startDate: string; 
    endDate: string; 
    categoryId: number;
    category: Category; 
    userId: number;
    user: User;
    createdAt: string; 
    updatedAt: string; 
  }
  
  export enum AccountType {
    BANK = "BANK",
    MOBILE_MONEY = "MOBILE_MONEY",
    CASH = "CASH",
    CREDIT_CARD = "CREDIT_CARD",
    OTHER = "OTHER",
  }
  
  export enum TransactionType {
    INCOME = "INCOME",
    EXPENSE = "EXPENSE",
  }
  