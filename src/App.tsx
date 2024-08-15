import React from 'react';
import './index.css';
import RoutesMap from './components/RoutesMap.tsx';
import Header from './components/Header.tsx';

const App: React.FC = () => {
  return (
    <div className="App container mx-auto p-4">
      <Header />
      <RoutesMap />
    </div>
  );
};

export default App;
