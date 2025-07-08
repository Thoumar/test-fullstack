import { Typography } from '@mui/material';

import styles from './RiskLegend.module.sass';

interface RiskLegendItemProps {
  icon: string;
  text: string;
  className?: string;
}

export const RiskLegendItem = ({ icon, text, className }: RiskLegendItemProps) => (
  <div className={`${styles.legendItem} ${className}`}>
    <Typography variant="body1" className={styles.riskIcon}>
      <span role="img" aria-label={text}>
        {icon}
      </span>
    </Typography>
    {text}
  </div>
);
