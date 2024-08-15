import React from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from '../routes.ts';

function RoutesMap() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map(({ key, path, component: Component }) => (
          <Route key={key} path={path} element={<Component />} />
        ))}
      </Routes>
    </React.Suspense>
  );
}

export default RoutesMap;
