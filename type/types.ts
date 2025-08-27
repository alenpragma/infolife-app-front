export interface ITransaction {
  payload: {
    transactions: ITransaction[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}

export interface ITransaction {
  id: number;
  userId: number;
  transactionType: string;
  amount: string;
  currency: string;
  status: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
