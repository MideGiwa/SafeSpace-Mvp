import React, { HTMLAttributes } from 'react';
import styles from './Card.module.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'flat' | 'outline';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  className = '',
  ...props
}) => {
  const cn = [
    styles.card,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cn} {...props}>
      {children}
    </div>
  );
};
