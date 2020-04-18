import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string,
  value: number,
  type: 'income' | 'outcome'
}
interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    this.transactions

    return this.transactions
  }

  public getBalance(): Balance {
    const result = this.transactions.reduce((acc, crr) => {
      acc = {
        income: acc.income + (crr.type === 'income' ? + crr.value : 0),
        outcome: acc.outcome + (crr.type === 'outcome' ? + crr.value : 0)
      }

      return acc
    }, {
      income: 0,
      outcome: 0
    })

    return { ...result, total: result.income - result.outcome }
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type })

    this.transactions.push(transaction)

    return transaction
  }
}

export default TransactionsRepository;
