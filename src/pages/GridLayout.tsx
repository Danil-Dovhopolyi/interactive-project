import React, { useCallback } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { GridItem } from '../types/GridLayout/types.ts';
import { useDashboardService } from '../hooks/useDashboardService';
import {
  ButtonVariant,
  GridButtonAction,
} from '../components/GridLayout/GridButtonAction.tsx';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard: React.FC = () => {
  const {
    items,
    onAddItem,
    onRemoveItem,
    onLayoutChange,
    handleZIndexUpdate,
    onDragStop,
    onResizeStop,
    resetLayout,
  } = useDashboardService();

  const createElement = useCallback(
    (el: GridItem) => {
      return (
        <div
          key={el.i}
          className="custom-grid-item bg-gray-200 border border-gray-400 flex items-center justify-center relative"
          onClick={() => handleZIndexUpdate(el.i)}
          style={{ zIndex: el.zIndex }}
        >
          <span className="text-lg font-bold">{`Tile ${el.i}`}</span>
          <button
            className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onRemoveItem(el.i);
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
          >
            &times;
          </button>
        </div>
      );
    },
    [handleZIndexUpdate, onRemoveItem]
  );

  return (
    <div className="p-4">
      <GridButtonAction
        variant={ButtonVariant.Primary}
        onClick={resetLayout}
        className="mr-4 mb-4"
      >
        Повернути у початкову позицію
      </GridButtonAction>
      <GridButtonAction
        variant={ButtonVariant.Success}
        onClick={onAddItem}
        className="mb-4"
      >
        Додати новий блок
      </GridButtonAction>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: items }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={33.33}
        width={1200}
        onLayoutChange={onLayoutChange}
        onDragStop={onDragStop}
        onResizeStop={onResizeStop}
        isResizable
        isDraggable
        allowOverlap={true}
        compactType={null}
        resizeHandles={['s', 'w', 'e', 'n']}
      >
        {items.map(createElement)}
      </ResponsiveGridLayout>
    </div>
  );
};

export default Dashboard;
