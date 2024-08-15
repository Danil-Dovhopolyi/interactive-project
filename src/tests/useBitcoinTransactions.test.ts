import { renderHook, act } from '@testing-library/react';

import { RawTransactionData } from '../types/types';
import useBitcoinTransactions from '../hooks/useBitcoinTransactions.ts';

describe('useBitcoinTransactions', () => {
  it('should handle incoming transactions in WebSocket message handler', () => {
    const { result } = renderHook(() => useBitcoinTransactions());

    const mockData: RawTransactionData = {
      op: 'utx',
      x: {
        hash: 'newhash',
        inputs: [{ prev_out: { addr: 'inputAddr', value: 1000 } }],
        out: [{ addr: 'outputAddr', value: 2000 }],
      },
    };

    const mockEvent = new MessageEvent('message', {
      data: JSON.stringify(mockData),
    });

    act(() => {
      result.current.handleWebSocketMessage(mockEvent);
    });

    expect(result.current.transactions).toHaveLength(1);
    expect(result.current.transactions[0]).toEqual({
      hash: 'newhash',
      inputs: [{ prev_out: { addr: 'inputAddr', value: 1000 } }],
      out: [{ addr: 'outputAddr', value: 2000 }],
    });

    expect(result.current.sum).toBe(0.00002);
  });
});
