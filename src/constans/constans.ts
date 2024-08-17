import { GridItem } from '../types/GridLayout/types.ts';

export const initialItems: GridItem[] = [
  { i: '1', x: 0, y: 0, w: 3, h: 3, minW: 3, minH: 3, maxH: 12, zIndex: 1 },
  { i: '2', x: 3, y: 0, w: 3, h: 3, minW: 3, minH: 3, maxH: 12, zIndex: 1 },
  { i: '3', x: 6, y: 0, w: 3, h: 3, minW: 3, minH: 3, maxH: 12, zIndex: 1 },
  { i: '4', x: 0, y: 3, w: 3, h: 3, minW: 3, minH: 3, maxH: 12, zIndex: 1 },
  { i: '5', x: 3, y: 3, w: 3, h: 3, minW: 3, minH: 3, maxH: 12, zIndex: 1 },
];
export const SATOSHI_TO_BTC = 100_000_000;
