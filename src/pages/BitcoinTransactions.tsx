import React from 'react';
import ActionButton from '../components/BitconTansactions/ActionButton';
import useBitcoinTransactions from '../hooks/useBitcoinTransactions';
import TransactionItem from '../components/BitconTansactions/TransactionItem.tsx';
import {
  ButtonColor,
  ButtonStatus,
} from '../types/BitcoinTransaction/enums.ts';

const BitcoinTransactions: React.FC = () => {
  const { transactions, sum, connect, disconnect, reset, lastAction } =
    useBitcoinTransactions();

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-center items-center">
        <ActionButton
          onClick={connect}
          color={ButtonColor.Green}
          label="Запуск"
          disabled={lastAction === ButtonStatus.Connect}
        />
        <ActionButton
          onClick={disconnect}
          color={ButtonColor.Red}
          label="Зупинка"
          disabled={lastAction === ButtonStatus.Disconnect}
        />
        <ActionButton
          onClick={reset}
          color={ButtonColor.Blue}
          label="Скинути"
          disabled={lastAction === ButtonStatus.Reset}
        />
      </div>
      <div className="mb-4 font-bold text-xl text-center">
        Сума транзакцій: {sum.toFixed(8)} BTC
      </div>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="p-2 border">From</th>
            <th className="p-2 border">To</th>
            <th className="p-2 border">Sum</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <TransactionItem key={tx.hash} transaction={tx} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BitcoinTransactions;
