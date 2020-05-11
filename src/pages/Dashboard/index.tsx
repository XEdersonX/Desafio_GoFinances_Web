import React, { useState, useEffect } from 'react';

import { FiTrash2 } from 'react-icons/fi';
import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const response = await api.get('/transactions');

      // setTransactions(response.data.transaction);
      // setBalance(response.data.balance);

      const transactionsFormatted = response.data.transactions.map(
        (transaction: Transaction) => ({
          ...transaction,
          formattedValue: formatValue(transaction.value),
          formattedDate: new Date(transaction.created_at).toLocaleDateString(
            'pt-br',
          ),
        }),
      );

      const balanceFormatted = {
        income: formatValue(response.data.balance.income),
        outcome: formatValue(response.data.balance.outcome),
        total: formatValue(response.data.balance.total),
      };

      setTransactions(transactionsFormatted);
      setBalance(balanceFormatted);
    }

    loadTransactions();
  }, []);

  async function handleDeleteTransaction(id: string): Promise<void> {
    try {
      await api.delete(`/transactions/${id}`);

      const found = transactions.find(transaction => transaction.id === id);

      if (found) {
        const { value, type } = found;
        let calcTotal = 0;

        const convertIncome = balance.income.replace(',', '.');
        const convertOutcome = balance.outcome.replace(',', '.');

        if (type === 'income') {
          const calcIncome =
            parseFloat(convertIncome.replace(/[R$]+/g, '')) - value;

          calcTotal =
            calcIncome - parseFloat(convertOutcome.replace(/[R$]+/g, ''));

          setBalance({
            income: formatValue(calcIncome),
            outcome: balance.outcome,
            total: formatValue(calcTotal),
          });
        } else if (type === 'outcome') {
          const calcOutcome =
            parseFloat(convertOutcome.replace(/[R$]+/g, '')) - value;

          calcTotal =
            parseFloat(convertIncome.replace(/[R$]+/g, '')) - calcOutcome;

          setBalance({
            income: balance.income,
            outcome: formatValue(calcOutcome),
            total: formatValue(calcTotal),
          });
        }

        console.log(value, type);
        console.log(balance);

        setTransactions(
          transactions.filter(transaction => transaction.id !== id),
        );
      }
    } catch {
      alert('Erro ao deletar a transaction, tente novamente.');
    }
  }

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{balance.income}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">{balance.outcome}</h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{balance.total}</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td className="title">{transaction.title}</td>
                  <td className={transaction.type}>
                    {transaction.type === 'outcome' && ' - '}
                    {transaction.formattedValue}
                  </td>
                  <td>{transaction.category.title}</td>
                  <td>{transaction.formattedDate}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteTransaction(transaction.id)}
                      type="button"
                    >
                      <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
