import React from 'react';
import styles from './Skeleton.module.css';

interface SkeletonProps {
  type?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  type = 'text',
  width,
  height,
  className = '',
  style,
}) => {
  return (
    <div
      className={`${styles.skeleton} ${styles[type]} ${className}`}
      style={{ width, height, ...style }}
    />
  );
};
