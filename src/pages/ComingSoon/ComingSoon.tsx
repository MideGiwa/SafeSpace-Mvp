import React from 'react';
import styles from './ComingSoon.module.css';

interface ComingSoonProps {
  title: string;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({ title }) => {
  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <span className="material-symbols-outlined">construction</span>
      </div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>This safe space is currently being built. Check back soon.</p>
    </div>
  );
};
