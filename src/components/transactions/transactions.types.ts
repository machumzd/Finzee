interface TransactionProps {
    id: string;
    userId: string;
    amount: number;
    category: string;
    createdAt: string;
    note?: string;
    type: string;
  }