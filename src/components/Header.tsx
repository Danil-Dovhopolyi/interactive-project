import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header>
      <nav className="mb-4">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-blue-500 hover:underline">
              Інтерактивний робочий стіл
            </Link>
          </li>
          <li>
            <Link to="/bitcoin" className="text-blue-500 hover:underline">
              Bitcoin Транзакції
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
