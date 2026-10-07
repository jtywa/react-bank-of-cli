 type User = {
        id: number;
        username: string;
        firstName: string;
        lastName: string;
        email: Email;
        password: string;
        balance: number;
        accountNumber: number;
    }

    type Transaction = {
        transactionType: TransactionType;
        amount: number;
        from: number;
        to: number;
        timestamp: string;
    }

    type Email = `${string}@${string}.${string}`;

    type TransactionType = "DEPOSIT" | "WITHDRAWAL" | "TRANSFER";