import React from 'react';
import { Transaction } from '../../types/types.ts';

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  return (
    <tr>
      <td className="p-2 border max-w-xs break-words">
        {transaction.inputs.map((input, index) => (
          <div key={index} className="mb-1">
            <a
              href={`https://www.blockchain.com/btc/address/${input.prev_out.addr}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {input.prev_out.addr}
            </a>
          </div>
        ))}
      </td>
      <td className="p-2 border max-w-xs break-words">
        {transaction.out.map((output, index) => (
          <div key={index} className="mb-1">
            <a
              href={`https://www.blockchain.com/btc/address/${output.addr}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {output.addr}
            </a>
          </div>
        ))}
      </td>
      <td className="p-2 border">
        {(
          transaction.out.reduce((acc, output) => acc + output.value, 0) /
          100000000
        ).toFixed(8)}{' '}
        BTC
      </td>
    </tr>
  );
};

export default TransactionItem;
