import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { FiTrash2 } from 'react-icons/fi';
import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';

import { Container } from './styles';

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

const Create: React.FC = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');

  const history = useHistory();

  async function handleRegister(
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();

    const data = {
      title,
      value,
      type,
      category,
    };

    try {
      const response = await api.post('/transactions', data);

      alert('Transação cadastrada com sucesso!!');

      history.push('/');
    } catch (err) {
      alert('Erro no cadastro, tente novamente.');
    }
  }

  return (
    <>
      <Header />
      <Container>
        <form onSubmit={handleRegister}>
          <h1>Cadastro de Transações</h1>

          <input
            placeholder="Título da Transação"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Valor"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <input
            placeholder="Tipo"
            value={type}
            onChange={e => setType(e.target.value)}
          />

          <input
            placeholder="Categoria"
            value={category}
            onChange={e => setCategory(e.target.value)}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </Container>
    </>
  );
};

export default Create;
