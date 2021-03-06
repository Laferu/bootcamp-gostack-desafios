import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    // TODO
    const transactions = transactionsRepository.all()

    const balance = transactionsRepository.getBalance()

    return response.json({ transactions, balance })
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body

    const balance = transactionsRepository.getBalance()

    if (type === 'outcome' && value > balance.total) {
      return response.status(400).json({ error: `Quantidade abaixo de ${balance.total} não permitida` })
    }

    const createTransaction = new CreateTransactionService(transactionsRepository)

    const transaction = createTransaction.execute({
      title: title,
      value: value,
      type: type
    })

    return response.json(transaction)
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
