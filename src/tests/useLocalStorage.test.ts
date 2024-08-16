import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { GridItem } from '../types/types';
import { initialItems } from '../constans/constans';

describe('useLocalStorage', () => {
  it('should initialize with items from localStorage or default to initialItems', () => {
    const key = 'test-dashboard-items';
    localStorage.setItem(key, JSON.stringify(initialItems));

    const { result } = renderHook(() => useLocalStorage(key));

    expect(result.current[0]).toEqual(initialItems);
  });

  it('should update localStorage when items are set', () => {
    const key = 'test-dashboard-items';
    const newItems: GridItem[] = [
      {
        i: 'test',
        x: 0,
        y: 0,
        w: 3,
        h: 3,
        minW: 3,
        minH: 3,
        maxH: 12,
        zIndex: 1,
      },
    ];

    const { result } = renderHook(() => useLocalStorage(key));

    act(() => {
      result.current[1](newItems); // setItems
    });

    const storedItems = localStorage.getItem(key);
    expect(storedItems ? JSON.parse(storedItems) : null).toEqual(newItems);
    expect(result.current[0]).toEqual(newItems);
  });

  it('should reset items to initial value and update localStorage', () => {
    const key = 'test-dashboard-items';
    const initialValue: GridItem[] = initialItems;

    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    act(() => {
      result.current[1]([
        {
          i: 'test',
          x: 0,
          y: 0,
          w: 3,
          h: 3,
          minW: 3,
          minH: 3,
          maxH: 12,
          zIndex: 1,
        },
      ]); // setItems to something different
    });

    act(() => {
      result.current[2](); // resetItems
    });

    const storedItems = localStorage.getItem(key);
    expect(storedItems ? JSON.parse(storedItems) : null).toEqual(initialItems);
    expect(result.current[0]).toEqual(initialItems);
  });
});
