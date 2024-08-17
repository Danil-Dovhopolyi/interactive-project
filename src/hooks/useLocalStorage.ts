import { useState, useEffect, useCallback } from 'react';
import { initialItems } from '../constans/constans';
import { GridItem } from '../types/GridLayout/types.ts';

export const useLocalStorage = (
  key: string,
  initialValue: GridItem[] = initialItems
) => {
  const [items, setItems] = useState<GridItem[]>(() => {
    const savedItems = localStorage.getItem(key);
    return savedItems ? JSON.parse(savedItems) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(items));
  }, [key, items]);

  const resetItems = useCallback(() => {
    setItems(initialValue);
    localStorage.setItem(key, JSON.stringify(initialValue));
  }, [key, initialValue]);

  return [items, setItems, resetItems] as const;
};
