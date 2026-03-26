import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfessionalCard.module.css';

interface ProfessionalCardProps {
  name: string;
  specialty: string;
  hourlyRate: number;
  imageUrl: string;
  tags?: string[];
  onBook: () => void;
  id?: string;
}

export const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
  name,
  specialty,
  hourlyRate,
  imageUrl,
  tags = [],
  onBook,
  id,
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      {/* Always Visible: Compact state */}
      <div className={styles.compactView}>
        <div className={styles.avatar}>
          <img src={imageUrl} alt={name} />
        </div>
        <div className={styles.compactInfo}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.specialty}>{specialty}</p>
        </div>
      </div>

      {/* Revealed on Hover: Expanded state */}
      <div className={styles.expandedView}>
        {tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
          </div>
        )}
        <div className={styles.sectionRow}>
          <span className="material-symbols-outlined iconTertiary">toll</span>
          <div>
            <p className={styles.sectionLabel}>Session Cost</p>
            <p className={styles.sectionValue}>
              {hourlyRate > 0 ? (
                <><strong>{hourlyRate} Tokens</strong> / 50 min</>
              ) : (
                <strong className={styles.freeText}>Free Session</strong>
              )}
            </p>
          </div>
        </div>
        <div className={styles.actions}>
          <button className={styles.btnView} onClick={() => id ? navigate(`/directory/${id}`) : undefined}>View Profile</button>
          <button className={styles.btnBook} onClick={onBook}>Book Session</button>
        </div>
      </div>
    </div>
  );
};
