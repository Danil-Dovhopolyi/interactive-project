import React from 'react';
import { IRoute } from './types/types.ts';

const DesktopGrid = React.lazy(() => import('./pages/GridLayout.tsx'));
const BitcoinTransactions = React.lazy(
  () => import('./pages/BitcoinTransactions.tsx')
);

const routes: IRoute[] = [
  {
    key: 'home',
    title: 'Home',
    path: '/',
    component: DesktopGrid,
  },
  {
    key: 'bitcoin',
    title: 'Bitcoin',
    path: '/bitcoin',
    component: BitcoinTransactions,
  },
];

export default routes;
