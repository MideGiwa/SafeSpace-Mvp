import React, { useState } from 'react';
import { Button } from '../../components/ui/Button/Button';
import { professionals } from '../../data/professionals';
import { groups } from '../../data/groups';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  // Simulated state for Active vs New user
  const [hasActiveGroups, setHasActiveGroups] = useState(false);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <h1 className={styles.titleInfo}>
            {hasActiveGroups ? 'Welcome back,' : 'Find Your'}<br />
            <span className={styles.italicHigh}>{hasActiveGroups ? 'Olamide' : 'Sanctuary'}</span>
          </h1>
          
          <button 
            className={styles.toggleStateBtn}
            onClick={() => setHasActiveGroups(!hasActiveGroups)}
            title="Toggle Dashboard State (Dev Only)"
          >
            <span className="material-symbols-outlined">swap_horiz</span>
          </button>
        </div>
        
        <p className={styles.subtitleInfo}>
          {hasActiveGroups 
            ? 'Your dedicated space for healing and continuous growth.' 
            : 'A cushioned digital space designed for healing, community support, and professional care.'}
        </p>
      </header>

      {/* NEW USER VIEW: Explore groups prominently */}
      {!hasActiveGroups && (
        <section className={styles.heroCard}>
          <span className={styles.heroTag}>JOIN OUR COMMUNITY</span>
          <h2 className={styles.heroTitle}>Talk to people who understand.</h2>
          <button className={styles.exploreBtn} onClick={() => navigate('/groups')}>
            Explore Groups &rarr;
          </button>
        </section>
      )}

      {/* ACTIVE USER VIEW: Shows their enrolled groups */}
      {hasActiveGroups && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Your Safe Spaces</h2>
            <button className={styles.seeAllBtn} onClick={() => navigate('/groups')}>Find More</button>
          </div>
          <div className={styles.activeGroupsGrid}>
            {groups.slice(0, 2).map((group, i) => (
              <div key={group.id} className={styles.activeGroupCard}>
                <div className={styles.agcVisual} style={{ background: i % 2 === 0 ? 'var(--primary)' : 'var(--tertiary)' }}>
                  <span className="material-symbols-outlined">spa</span>
                </div>
                <div className={styles.agcContent}>
                  <h4>{group.title}</h4>
                  <p>{i % 2 === 0 ? '2 new posts today' : 'Meeting in 2 days'}</p>
                </div>
                <button className={styles.agcEnterBtn} onClick={() => navigate('/community')}>Enter</button>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className={styles.quickActions}>
        <div className={styles.actionCard}>
          <div className={styles.iconHeart}><span className="material-symbols-outlined">favorite</span></div>
          <h3>Find Support</h3>
          <p>Immediate self-care tools.</p>
        </div>
        <div className={styles.actionCard} onClick={() => navigate('/tokens')}>
          <div className={styles.iconSecure}><span className="material-symbols-outlined">toll</span></div>
          <h3>Tokens</h3>
          <p>Manage session balance.</p>
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionTag}>EXPERT HELP</span>
            <h2 className={styles.sectionTitle}>Talk to a Professional</h2>
          </div>
          <button className={styles.seeAllBtn} onClick={() => navigate('/directory')}>See All</button>
        </div>
        
        <div className={styles.proScroller}>
          {professionals.slice(0, 3).map(pro => (
            <div key={pro.id} className={styles.proCard}>
              <div className={styles.proInfo}>
                <div className={styles.proAvatar}>
                 <img src={pro.imageUrl} alt={pro.name} />
                </div>
                <div>
                  <h4>{pro.name}</h4>
                  <p>{pro.specialty}</p>
                </div>
              </div>
              <Button variant="primary" className={styles.bookBtn} onClick={() => navigate(`/directory/${pro.id}`)}>Book Session</Button>
            </div>
          ))}
        </div>
      </section>

      {/* NEW USER VIEW: Additional generic groups if they skipped the huge banner */}
      {!hasActiveGroups && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Join a Support Group</h2>
          
          <div className={styles.groupList}>
            {groups.slice(0, 2).map((group, i) => (
              <div key={group.id} className={styles.groupItem}>
                <div className={i % 2 === 0 ? styles.groupIconPink : styles.groupIconBlue}>
                  <span className="material-symbols-outlined">{i % 2 === 0 ? 'psychology' : 'spa'}</span>
                </div>
                <div className={styles.groupDetails}>
                  <h4>{group.title}</h4>
                  <p>{group.tag} community</p>
                </div>
                <button className={styles.joinBtn} onClick={() => navigate('/groups')}>+</button>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className={styles.newsletter}>
        <h3>Stay Grounded</h3>
        <p>Weekly mindfulness tips and community updates delivered to your inbox.</p>
        <div className={styles.newsInput}>
          <input type="email" placeholder="Email address" />
          <button>Join</button>
        </div>
      </section>
    </div>
  );
};
