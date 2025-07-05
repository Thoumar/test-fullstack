import { useState } from 'react';
import { FactoriesTable } from './FactoriesTable';

import './index.css';
import { Link } from 'react-router-dom';
import { Searchbar } from '../../components/Searchbar';

export function FactoriesPage() {
  const [filterString, setFilterString] = useState('');

  return (
    <div className="main">
      <div className="header">
        <div className="left">
          <h1>Overview</h1>
        </div>
        <div className="right">
          <Searchbar onSearch={setFilterString} />
          <Link to={'/add'}>Add</Link>
        </div>
      </div>

      <FactoriesTable filterString={filterString} />
    </div>
  );
}
