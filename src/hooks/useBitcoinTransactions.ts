import { useCallback, useEffect, useState } from 'react';
import {
  RawTransactionData,
  Transaction,
} from '../types/BitcoinTransaction/types.ts';

const useBitcoinTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  const [sum, setSum] = useState<number>(() => {
    const savedSum = localStorage.getItem('sum');
    return savedSum ? parseFloat(savedSum) : 0;
  });

  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [lastAction, setLastAction] = useState<string>(() => {
    return localStorage.getItem('lastAction') || '';
  });

  const handleWebSocketMessage = useCallback((event: MessageEvent) => {
    const data: RawTransactionData = JSON.parse(event.data);

    if (data.op === 'utx') {
      const newTransaction: Transaction = {
        hash: data.x.hash,
        inputs: data.x.inputs.map((input) => ({
          prev_out: {
            addr: input.prev_out.addr,
            value: input.prev_out.value,
          },
        })),
        out: data.x.out.map((output) => ({
          addr: output.addr,
          value: output.value,
        })),
      };

      setTransactions((prev) => {
        const updatedTransactions = [newTransaction, ...prev].slice(0, 10);
        localStorage.setItem(
          'transactions',
          JSON.stringify(updatedTransactions)
        );
        return updatedTransactions;
      });

      setSum((prev) => {
        const newSum =
          prev +
          data.x.out.reduce((acc, output) => acc + output.value, 0) / 100000000;
        localStorage.setItem('sum', newSum.toString());
        return newSum;
      });
    }
  }, []);

  const connect = useCallback(() => {
    const ws = new WebSocket('wss://ws.blockchain.info/inv');
    setSocket(ws);

    ws.onopen = () => {
      ws.send(JSON.stringify({ op: 'unconfirmed_sub' }));
    };

    ws.onmessage = handleWebSocketMessage;

    setLastAction('connect');
    localStorage.setItem('lastAction', 'connect');
  }, [handleWebSocketMessage]);

  const disconnect = useCallback(() => {
    if (socket) {
      socket.close();
      setSocket(null);
    }
    setLastAction('disconnect');
    localStorage.setItem('lastAction', 'disconnect');
  }, [socket]);

  const reset = useCallback(() => {
    setTransactions([]);
    setSum(0);
    setLastAction('reset');
    localStorage.removeItem('transactions');
    localStorage.removeItem('sum');
    localStorage.setItem('lastAction', 'reset');
  }, []);

  useEffect(() => {
    if (lastAction === 'connect' && !socket) {
      connect();
    }
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [lastAction, socket, connect]);

  return {
    transactions,
    sum,
    connect,
    disconnect,
    reset,
    lastAction,
    handleWebSocketMessage,
  };
};

export default useBitcoinTransactions;
