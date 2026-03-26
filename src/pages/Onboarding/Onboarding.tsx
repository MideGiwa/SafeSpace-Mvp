import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card/Card';
import styles from './Onboarding.module.css';

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();

  const handleSelection = (path: string) => {
    navigate(path);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Welcome to your <span className={styles.highlight}>SafeSpace</span>.
        </h1>
        <p className={styles.subtitle}>
          We've built this sanctuary for you to heal, connect, and grow. Choose your first step towards mental clarity and community support.
        </p>
      </header>

      <section className={styles.grid}>
        <Card variant="elevated" className={styles.optionCard}>
          <div className={`${styles.iconWrapper} ${styles.primaryIcon}`}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
          </div>
          <div className={styles.textContent}>
            <h3>Book a professional</h3>
            <p>Connect with verified therapists and counselors specialized in diverse mental health journeys.</p>
          </div>
          <button className={styles.actionBtn} onClick={() => handleSelection('/directory')}>
            <span>Find Specialist</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </Card>

        <Card variant="elevated" className={styles.optionCard}>
          <div className={`${styles.iconWrapper} ${styles.tertiaryIcon}`}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
          </div>
          <div className={styles.textContent}>
            <h3>Join a group</h3>
            <p>Find your tribe in curated peer support groups led by compassionate moderators and mentors.</p>
          </div>
          <button className={styles.actionBtnAlt} onClick={() => handleSelection('/groups')}>
            <span>Browse Groups</span>
            <span className="material-symbols-outlined">explore</span>
          </button>
        </Card>

        <Card variant="elevated" className={styles.optionCard}>
          <div className={`${styles.iconWrapper} ${styles.secondaryIcon}`}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_stories</span>
          </div>
          <div className={styles.textContent}>
            <h3>Post your story</h3>
            <p>Share your experiences in a safe, anonymous-first environment and find healing through expression.</p>
          </div>
          <button className={styles.actionBtnOutline} onClick={() => handleSelection('/community')}>
            <span>Share Story</span>
            <span className="material-symbols-outlined">edit_note</span>
          </button>
        </Card>
      </section>

      <footer className={styles.trustFooter}>
        <div className={styles.trustInfo}>
          <span className={styles.trustTag}>Security & Privacy</span>
          <h4>End-to-End Encrypted Sanctuary</h4>
          <p>Your data and identity are protected by hospital-grade security protocols.</p>
        </div>
      </footer>
    </div>
  );
};
