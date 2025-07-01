import { useState } from 'react';
import { FactoriesTable } from './FactoriesTable';

import './index.css';
import { Link } from 'react-router-dom';
import { Searchbar } from '../../components/Searchbar';

export function FactoriesPage() {
  const [filterString, setFilterString] = useState('');

  return (
    <div id="main">
      <div id="header">
        <h1>My factories</h1>
        <Link to={'/add'}>Add</Link>
      </div>
      <Searchbar onSearch={setFilterString} />
      <FactoriesTable filterString={filterString} />
    </div>
  );
}
