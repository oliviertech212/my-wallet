

export type AccountType = 'BANK' | 'MOBILE_MONEY' | 'CASH' | 'CREDIT_CARD' | 'OTHER';

export interface Account {
  id: number;
  name: string;
  type: AccountType;
  balance: number;
  currency: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}