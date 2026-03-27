import React from 'react';
import { Card } from '../../../components/ui/Card/Card';
import { Skeleton } from '../../../components/ui/Skeleton/Skeleton';
import styles from './PostCard.module.css'; // Reuse container styles

export const PostCardSkeleton: React.FC = () => {
  return (
    <Card variant="elevated" className={styles.postCard}>
      <div className={styles.header}>
        <div className={styles.authorInfo} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Skeleton type="circular" width={40} height={40} />
          <div>
            <Skeleton type="text" width={120} height={16} style={{ marginBottom: '8px' }} />
            <Skeleton type="text" width={80} height={12} />
          </div>
        </div>
        <Skeleton type="rectangular" width={80} height={24} style={{ borderRadius: '16px' }} />
      </div>

      <div style={{ padding: '1.5rem 0' }}>
        <Skeleton type="text" width="100%" height={16} />
        <Skeleton type="text" width="90%" height={16} />
        <Skeleton type="text" width="60%" height={16} />
      </div>

      <div className={styles.actions} style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <Skeleton type="rectangular" width={80} height={32} style={{ borderRadius: '20px' }} />
        <Skeleton type="rectangular" width={100} height={32} style={{ borderRadius: '20px' }} />
      </div>
    </Card>
  );
};
