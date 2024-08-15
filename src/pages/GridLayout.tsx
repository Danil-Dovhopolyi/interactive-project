import React, { useState, useCallback } from 'react';
import GridLayout, { Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

type GridItem = Layout & {
  minW: number;
  minH: number;
};

type GridConfig = {
  cols: number;
  rowHeight: number;
  width: number;
};

const initialLayout: GridItem[] = [
  { i: '1', x: 0, y: 0, w: 10, h: 2, minW: 2, minH: 1 },
  { i: '2', x: 0, y: 2, w: 10, h: 2, minW: 2, minH: 1 },
  { i: '3', x: 0, y: 4, w: 10, h: 2, minW: 2, minH: 1 },
  { i: '4', x: 0, y: 6, w: 10, h: 2, minW: 2, minH: 1 },
  { i: '5', x: 0, y: 8, w: 10, h: 2, minW: 2, minH: 1 },
];

const gridConfig: GridConfig = {
  cols: 30,
  rowHeight: 30,
  width: 1200,
};

const preventSelectStyle: React.CSSProperties = {
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
  userSelect: 'none',
};

const blockStyle: React.CSSProperties = {
  ...preventSelectStyle,
  cursor: 'grab',
};

const useLayout = () => {
  const [layout, setLayout] = useState<GridItem[]>(() => {
    const savedLayout = localStorage.getItem('layout');
    return savedLayout ? JSON.parse(savedLayout) : initialLayout;
  });

  const handleLayoutChange = useCallback((newLayout: Layout[]) => {
    const updatedLayout = newLayout.map((item) => ({
      ...item,
      minW: 2,
      minH: 1,
    }));
    setLayout(updatedLayout);
    localStorage.setItem('layout', JSON.stringify(updatedLayout));
  }, []);

  const resetLayout = useCallback(() => {
    setLayout(initialLayout);
    localStorage.removeItem('layout');
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setLayout((prevLayout) => prevLayout.filter((item) => item.i !== itemId));
  }, []);

  return { layout, handleLayoutChange, resetLayout, removeItem };
};

const DesktopGrid: React.FC = () => {
  const { layout, handleLayoutChange, resetLayout, removeItem } = useLayout();
  console.log('Render DesktopGrid');
  return (
    <div className="p-4">
      <button
        className="mb-4 p-2 bg-blue-500 text-white rounded"
        onClick={resetLayout}
      >
        Повернути у початкову позицію
      </button>
      <GridLayout
        className="layout"
        layout={layout}
        onLayoutChange={handleLayoutChange}
        compactType={null}
        preventCollision={false}
        useCSSTransforms={true}
        draggableCancel=".non-draggable"
        resizeHandles={['se']}
        isDroppable={true}
        {...gridConfig}
      >
        {layout.map((item) => (
          <div
            key={item.i}
            className="bg-white border border-gray-300 flex justify-center items-center text-lg transition-all duration-300"
            style={blockStyle}
          >
            <span className="non-draggable" style={preventSelectStyle}>
              {`Block ${item.i}`}
            </span>
            <button
              className="absolute top-0 right-0 bg-red-500 text-white p-1"
              onClick={(e) => {
                e.stopPropagation();
                removeItem(item.i);
              }}
            >
              X
            </button>
          </div>
        ))}
      </GridLayout>
    </div>
  );
};

export default DesktopGrid;
