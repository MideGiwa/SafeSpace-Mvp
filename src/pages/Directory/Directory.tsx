import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfessionalCard } from '../../features/directory/ProfessionalCard/ProfessionalCard';
import { professionals } from '../../data/professionals';
import styles from './Directory.module.css';

export const Directory: React.FC = () => {
  const navigate = useNavigate();

  const handleBook = (id: string) => {
    navigate(`/directory/${id}`);
  };

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <h2 className={styles.title}>Professional Directory</h2>
        <p className={styles.subtitle}>Connect with verified therapists and counselors tailored to your journey.</p>
      </header>
      
      <div className={styles.filters}>
        <button className={`${styles.filterChip} ${styles.active}`}>All Specialists</button>
        <button className={styles.filterChip}>Anxiety</button>
        <button className={styles.filterChip}>Depression</button>
        <button className={styles.filterChip}>Trauma</button>
        <button className={styles.filterChip}>Relationships</button>
      </div>

      <div className={styles.grid}>
        {professionals.map(pro => (
          <ProfessionalCard
            key={pro.id}
            id={pro.id}
            name={pro.name}
            specialty={pro.specialty}
            tags={pro.tags}
            hourlyRate={pro.hourlyRate}
            imageUrl={pro.imageUrl}
            onBook={() => handleBook(pro.id)}
          />
        ))}
      </div>
    </div>
  );
};
