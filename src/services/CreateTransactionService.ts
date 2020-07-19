import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    // TODO
    if (type !== 'income' && type !== 'outcome')
      throw Error('O tipo não pode ser diferente de outcome e income');

    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome' && value > total)
      throw Error('Valor de retirada maior que o total disponível');

    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
