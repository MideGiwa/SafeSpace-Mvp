import React, { useState, useMemo } from 'react';
import { groups } from '../../data/groups';
import styles from './Groups.module.css';

export const Groups: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const categories = useMemo(() => {
    const caps = new Set(groups.map(g => g.tag));
    return ['All', ...Array.from(caps)];
  }, []);

  const filteredGroups = useMemo(() => {
    return groups.filter(g => {
      const matchesSearch = 
        g.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        g.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTab = activeTab === 'All' || g.tag === activeTab;

      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab]);

  return (
    <div className={styles.page}>
      
      {/* Hero Header Section */}
      <section className={styles.header}>
        <div className={styles.titleWrapper}>
          <span className={styles.eyebrow}>DIVERSE HUB</span>
          <h1 className={styles.title}>Find your sanctuary</h1>
        </div>

        {/* Filters & Search */}
        <div className={styles.searchBar}>
          <div className={styles.searchInputWrapper}>
            <span className="material-symbols-outlined">search</span>
            <input 
              type="text" 
              placeholder="Search by affinity, health topic, or location..." 
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className={styles.filterChips}>
            {categories.map(cat => (
              <button 
                key={cat}
                className={`${styles.chip} ${activeTab === cat ? styles.chipActive : ''}`}
                onClick={() => setActiveTab(cat)}
              >
                {cat === 'All' ? 'All Types' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Communities Grid */}
      <section className={styles.grid}>
        {filteredGroups.map(group => (
          <div key={group.id} className={styles.card}>
            <div className={styles.cardVisual}>
              <img src={group.image} alt={group.title} className={styles.cardImage} />
              {group.verified && (
                <div className={styles.verifiedBadge}>
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                  VERIFIED
                </div>
              )}
            </div>
            
            <div className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <h3>{group.title}</h3>
                <div className={styles.tagsRow}>
                  <span className={styles.cardTag}>{group.tag}</span>
                  {group.entryFee > 0 ? (
                    <span className={styles.feeTag}>
                      <span className="material-symbols-outlined text-sm">toll</span>
                      {group.entryFee}
                    </span>
                  ) : (
                    <span className={styles.freeTag}>Free</span>
                  )}
                </div>
              </div>
              
              <p className={styles.cardDesc}>{group.description}</p>
              
              <div className={styles.cardFooter}>
                <div className={styles.membersArea}>
                  <div className={styles.avatarStack}>
                    <div className={styles.avatar}></div>
                    <div className={styles.avatar}></div>
                  </div>
                </div>
                <button className={styles.joinBtn}>Join Group</button>
              </div>
            </div>
          </div>
        ))}

        {/* Matchmaker Bento inline */}
        <div className={styles.matchmaker}>
            <div className={styles.matchContent}>
            <span className={styles.matchEyebrow}>MATCHMAKER</span>
            <h2>Can't find your fit?</h2>
            <p>Our AI-assisted sanctuary guide can help you find or even suggest the creation of a group tailored to your unique journey.</p>
            <button className={styles.matchBtn}>Personalized Rec</button>
            </div>
            <div className={styles.matchDecor}>
            <span className="material-symbols-outlined">hub</span>
            </div>
        </div>
      </section>

    </div>
  );
};
