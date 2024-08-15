import React from 'react';
import useBitcoinTransactions from '../hooks/useBitcoinTransactions.ts';

const BitcoinTransactions: React.FC = () => {
  const { transactions, sum, connect, disconnect, reset } =
    useBitcoinTransactions();

  return (
    <div className="p-4">
      <div className="mb-4">
        <button
          onClick={connect}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        >
          Запуск
        </button>
        <button
          onClick={disconnect}
          className="bg-red-500 text-white px-4 py-2 rounded mr-2"
        >
          Зупинка
        </button>
        <button
          onClick={reset}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Скинути
        </button>
      </div>
      <div className="mb-4">Сума транзакцій: {sum.toFixed(8)} BTC</div>
      <ul className="list-disc pl-5">
        {transactions.map((tx) => (
          <li key={tx.hash} className="mb-2">
            {tx.hash} -{' '}
            {(
              tx.out.reduce((acc, output) => acc + output.value, 0) / 100000000
            ).toFixed(8)}{' '}
            BTC
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BitcoinTransactions;
