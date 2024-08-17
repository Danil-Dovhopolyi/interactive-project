import { useCallback, useState } from 'react';
import { Layout } from 'react-grid-layout';
import { GridItem } from '../types/GridLayout/types.ts';
import { useLocalStorage } from './useLocalStorage';

export const useDashboardService = () => {
  const [items, setItems, resetItems] = useLocalStorage('dashboard-items');
  const [newCounter, setNewCounter] = useState(items.length);

  const onAddItem = useCallback(() => {
    const newItem: GridItem = {
      i: `n${newCounter}`,
      x: (items.length * 2) % 12,
      y: Infinity,
      w: 3,
      h: 3,
      minW: 3,
      minH: 3,
      maxH: 12,
      zIndex: 1,
    };
    setItems((prevItems) => [...prevItems, newItem]);
    setNewCounter((prevCounter) => prevCounter + 1);
  }, [items.length, newCounter, setItems]);

  const onRemoveItem = useCallback(
    (i: string) => {
      setItems((prevItems) => prevItems.filter((item) => item.i !== i));
    },
    [setItems]
  );

  const onLayoutChange = useCallback(
    (layout: Layout[]) => {
      setItems((prevItems) => {
        return prevItems.map((item) => {
          const updatedItem = layout.find(
            (layoutItem) => layoutItem.i === item.i
          );
          return updatedItem ? { ...item, ...updatedItem } : item;
        });
      });
    },
    [setItems]
  );

  const handleZIndexUpdate = useCallback(
    (id: string) => {
      setItems((prevItems) => {
        const maxZIndex = Math.max(...prevItems.map((el) => el.zIndex));
        return prevItems.map((item) =>
          item.i === id ? { ...item, zIndex: maxZIndex + 1 } : item
        );
      });
    },
    [setItems]
  );

  const onDragStop = useCallback(
    (_layout: Layout[], _oldItem: Layout, newItem: Layout) => {
      handleZIndexUpdate(newItem.i);
    },
    [handleZIndexUpdate]
  );

  const onResizeStop = useCallback(
    (_layout: Layout[], _oldItem: Layout, newItem: Layout) => {
      handleZIndexUpdate(newItem.i);
    },
    [handleZIndexUpdate]
  );

  const resetLayout = useCallback(() => {
    resetItems();
    setNewCounter(items.length);
  }, [resetItems, items.length]);

  return {
    items,
    onAddItem,
    onRemoveItem,
    onLayoutChange,
    handleZIndexUpdate,
    onDragStop,
    onResizeStop,
    resetLayout,
  };
};
