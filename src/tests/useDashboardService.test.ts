import { renderHook, act } from '@testing-library/react';
import { useDashboardService } from '../hooks/useDashboardService';
import { initialItems } from '../constans/constans';

describe('useDashboardService', () => {
  it('should initialize with items from localStorage or default to initialItems', () => {
    const { result } = renderHook(() => useDashboardService());

    expect(result.current.items).toEqual(initialItems);
  });

  it('should add a new item to the dashboard', () => {
    const { result } = renderHook(() => useDashboardService());

    act(() => {
      result.current.onAddItem();
    });

    expect(result.current.items).toHaveLength(initialItems.length + 1);
    expect(result.current.items[result.current.items.length - 1].i).toContain(
      'n'
    );
  });

  it('should remove an item from the dashboard', () => {
    const { result } = renderHook(() => useDashboardService());

    act(() => {
      result.current.onAddItem();
    });

    const itemId = result.current.items[0].i;

    act(() => {
      result.current.onRemoveItem(itemId);
    });

    expect(
      result.current.items.find((item) => item.i === itemId)
    ).toBeUndefined();
  });

  it('should update item layout', () => {
    const { result } = renderHook(() => useDashboardService());

    const newLayout = [
      {
        i: result.current.items[0].i,
        x: 1,
        y: 1,
        w: 3,
        h: 3,
      },
    ];

    act(() => {
      result.current.onLayoutChange(newLayout);
    });

    expect(result.current.items[0].x).toBe(1);
    expect(result.current.items[0].y).toBe(1);
  });

  it('should reset layout to initial state', () => {
    const { result } = renderHook(() => useDashboardService());

    act(() => {
      result.current.onAddItem();
    });

    act(() => {
      result.current.resetLayout();
    });

    expect(result.current.items).toEqual(initialItems);
  });

  it('should update zIndex when dragging or resizing stops', () => {
    const { result } = renderHook(() => useDashboardService());

    act(() => {
      result.current.onAddItem();
    });

    const itemId = result.current.items[0].i;

    act(() => {
      result.current.onDragStop(
        [],
        { i: itemId, x: 1, y: 1, w: 3, h: 3 },
        { i: itemId, x: 2, y: 2, w: 3, h: 3 }
      );
    });

    const maxZIndex = Math.max(
      ...result.current.items.map((item) => item.zIndex)
    );
    expect(result.current.items.find((item) => item.i === itemId)?.zIndex).toBe(
      maxZIndex
    );
  });
});
