import React from 'react';
import { Transaction } from '../../types/BitcoinTransaction/types.ts';
import { SATOSHI_TO_BTC } from '../../constans/constans.ts';

interface TransactionItemProps {
  transaction: Transaction;
}

const BLOCKCHAIN_BASE_URL = 'https://www.blockchain.com/btc/address/';

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  return (
    <tr>
      <td className="p-2 border max-w-xs break-words">
        {transaction.inputs.map((input, index) => (
          <div key={index} className="mb-1">
            <a
              href={`${BLOCKCHAIN_BASE_URL}${input.prev_out.addr}`}
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
              href={`${BLOCKCHAIN_BASE_URL}${output.addr}`}
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
          SATOSHI_TO_BTC
        ).toFixed(8)}{' '}
        BTC
      </td>
    </tr>
  );
};

export default TransactionItem;
