import { useState } from 'react';
import { FactoriesTable } from './FactoriesTable';

import './index.css';
import { Searchbar } from '../../components/Searchbar';

export function FactoriesPage() {
  const [filterString, setFilterString] = useState('');

  return (
    <div className="main">
      <div className="header">
        <div className="left"></div>
        <div className="right">
          <Searchbar onSearch={setFilterString} />
        </div>
      </div>

      <FactoriesTable filterString={filterString} />
    </div>
  );
}
