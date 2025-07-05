import { useState } from 'react';
import { FactoriesTable } from './FactoriesTable';

import styles from './index.module.css';
import { Searchbar } from '../../components/Searchbar';

export function FactoriesPage() {
  const [filterString, setFilterString] = useState('');

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.left}></div>
        <div className={styles.right}>
          <Searchbar onSearch={setFilterString} />
        </div>
      </div>

      <FactoriesTable filterString={filterString} />
    </div>
  );
}
