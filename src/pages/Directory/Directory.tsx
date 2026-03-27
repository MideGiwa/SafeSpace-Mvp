import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ProfessionalCard } from '../../features/directory/ProfessionalCard/ProfessionalCard';
import { professionalService } from '../../services/professionalService';
import styles from './Directory.module.css';

export const Directory: React.FC = () => {
  const navigate = useNavigate();
  const [activeSpecialty, setActiveSpecialty] = useState<string | undefined>();

  const { data: pros = [], isLoading, isError } = useQuery({
    queryKey: ['professionals', activeSpecialty],
    queryFn: () => professionalService.getProfessionals(activeSpecialty === 'All Specialists' ? undefined : activeSpecialty),
  });

  const handleBook = (id: string) => {
    navigate(`/directory/${id}`);
  };

  const specialties = ['All Specialists', 'Anxiety', 'Depression', 'Trauma', 'Relationships'];

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <h2 className={styles.title}>Professional Directory</h2>
        <p className={styles.subtitle}>Connect with verified therapists and counselors tailored to your journey.</p>
      </header>
      
      <div className={styles.filters}>
        {specialties.map(s => (
          <button 
            key={s} 
            className={`${styles.filterChip} ${activeSpecialty === s || (!activeSpecialty && s === 'All Specialists') ? styles.active : ''}`}
            onClick={() => setActiveSpecialty(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {isLoading ? (
          [1, 2, 3].map(i => <div key={i} className={styles.skeletonCard} />)
        ) : isError ? (
          <p className={styles.error}>Unable to load professionals. Please try again later.</p>
        ) : pros.length > 0 ? (
          pros.map(pro => (
            <ProfessionalCard
              key={pro.id}
              id={pro.userId} // Path uses userId
              name={pro.user?.pseudonym || pro.specialty}
              specialty={pro.specialty}
              tags={[pro.specialty]}
              hourlyRate={150} // Tokens constant for now
              imageUrl={`https://api.dicebear.com/7.x/avataaars/svg?seed=${pro.userId}`}
              onBook={() => handleBook(pro.userId)}
            />
          ))
        ) : (
          <p className={styles.empty}>No specialists found for this category.</p>
        )}
      </div>
    </div>
  );
};
