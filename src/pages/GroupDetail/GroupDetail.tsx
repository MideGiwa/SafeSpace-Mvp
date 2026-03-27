import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { groupService } from '../../services/groupService';
import styles from './GroupDetail.module.css';

export const GroupDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'chat' | 'sessions'>('sessions');

  const { data: group, isLoading: loadingGroup } = useQuery({
    queryKey: ['group', id],
    queryFn: () => groupService.getGroupDetails(id!),
    enabled: !!id,
  });

  const { data: sessions = [], isLoading: loadingSessions } = useQuery({
    queryKey: ['group-sessions', id],
    queryFn: () => groupService.getSessions(id!),
    enabled: !!id && activeTab === 'sessions',
  });

  if (loadingGroup) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.skeleton} style={{ width: '3rem', height: '3rem', borderRadius: '50%' }} />
          <div className={styles.headerInfo}>
            <div className={styles.skeleton} style={{ width: '200px', height: '2.5rem', marginBottom: '0.5rem' }} />
            <div className={styles.skeleton} style={{ width: '100px', height: '1.25rem' }} />
          </div>
        </header>
        <div className={styles.skeleton} style={{ height: '3rem', marginBottom: '2rem' }} />
        <div className={styles.skeleton} style={{ height: '300px', borderRadius: '1.5rem' }} />
      </div>
    );
  }

  if (!group) return <div className={styles.error}>Sanctuary not found.</div>;

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate('/groups')}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className={styles.headerInfo}>
          <div className={styles.titleRow}>
            <h1>{group.title}</h1>
            <span className={styles.tag}>{group.tag}</span>
          </div>
          <p className={styles.stats}>
            <span className="material-symbols-outlined">groups</span>
            {group.memberCount} members
          </p>
        </div>
      </header>

      {/* Tabs */}
      <nav className={styles.tabs}>
        <button 
          className={activeTab === 'sessions' ? styles.tabActive : styles.tab}
          onClick={() => setActiveTab('sessions')}
        >
          Sessions
        </button>
        <button 
          className={activeTab === 'chat' ? styles.tabActive : styles.tab}
          onClick={() => setActiveTab('chat')}
        >
          Community Chat
        </button>
      </nav>

      {/* Content */}
      <main className={styles.content}>
        {activeTab === 'sessions' ? (
          <div className={styles.sessionsList}>
            <div className={styles.listHeader}>
              <h2>Upcoming & Active Sessions</h2>
              <button className={styles.createBtn} onClick={() => navigate('/leader')}>
                Notify Leader
              </button>
            </div>
            
            {loadingSessions ? (
              <div className={styles.sessionsList}>
                <div className={styles.skeleton} style={{ height: '80px', borderRadius: '1rem' }} />
                <div className={styles.skeleton} style={{ height: '80px', borderRadius: '1rem' }} />
              </div>
            ) : sessions.length > 0 ? (
              sessions.map(s => (
                <div key={s.id} className={styles.sessionCard}>
                  <div className={styles.sessionInfo}>
                    <h3>{s.title}</h3>
                    <p className={styles.time}>
                      <span className="material-symbols-outlined">schedule</span>
                      {new Date(s.startTime).toLocaleString()}
                    </p>
                  </div>
                  <div className={styles.sessionActions}>
                    {s.status === 'OPEN' ? (
                      <button className={styles.joinBtn}>Join Live</button>
                    ) : (
                      <span className={styles.statusBadge}>Scheduled</span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>
                <span className="material-symbols-outlined">event_busy</span>
                <p>No sessions scheduled yet.</p>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.chatPlaceholder}>
            <span className="material-symbols-outlined">forum</span>
            <h2>Group Chat Coming Soon</h2>
            <p>We're building an end-to-end encrypted space for your community to connect 24/7.</p>
          </div>
        )}
      </main>
    </div>
  );
};
