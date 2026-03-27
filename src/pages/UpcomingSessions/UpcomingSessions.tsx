import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { sessionService } from '../../services/sessionService';
import styles from './UpcomingSessions.module.css';

export const UpcomingSessions: React.FC = () => {
  const navigate = useNavigate();

  const { data: sessions, isLoading, error } = useQuery({
    queryKey: ['upcomingSessions'],
    queryFn: sessionService.getUpcomingSessions,
    retry: 1,
    // Add a small delay for smoother UI transitions if needed, 
    // or just let it load as fast as possible.
  });

  const nextSession = sessions?.find(s => s.isNext) || sessions?.[0];
  const laterSessions = sessions?.filter(s => s.id !== nextSession?.id) || [];

  if (error) {
    return (
      <div className={styles.page}>
        <div className={styles.mainCanvas}>
          <div className={styles.errorState}>
            <span className="material-symbols-outlined">error</span>
            <h3>Failed to load sessions</h3>
            <p>Please try again later or contact support if the problem persists.</p>
            <button onClick={() => window.location.reload()} className={styles.btnJoin}>Retry</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Top Header */}
      <header className={styles.header}>
        <h2 className={styles.pageTitle}>Appointments</h2>
        <div className={styles.headerRight}>
          <div className={styles.searchWrap}>
            <span className="material-symbols-outlined">search</span>
            <input className={styles.searchInput} placeholder="Search sessions..." type="text" />
          </div>
          <button className={styles.iconBtn}><span className="material-symbols-outlined">notifications</span></button>
          <div className={styles.divider}></div>
          <button className={styles.iconBtn} onClick={() => navigate('/profile')} title="My Profile">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </header>

      <main className={styles.mainCanvas}>
        {/* Welcome Section */}
        <section className={styles.welcomeSection}>
          <div>
            <span className={styles.welcomeDate}>Today's Schedule</span>
            <h1 className={styles.welcomeTitle}>Upcoming Sessions</h1>
            {isLoading ? (
              <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '300px' }}></div>
            ) : (
              <p className={styles.welcomeDesc}>
                {sessions?.length ? (
                  <>You have {sessions.length} sessions scheduled. Your next appointment is ready.</>
                ) : (
                  <>You have no sessions scheduled for today.</>
                )}
              </p>
            )}
          </div>
          <div className={styles.viewToggles}>
            <div className={styles.toggleInner}>
              <button className={`${styles.toggleBtn} ${styles.toggleActive}`}>List</button>
              <button className={styles.toggleBtn} disabled>Calendar</button>
            </div>
          </div>
        </section>

        {/* Bento Grid */}
        <div className={styles.bentoGrid}>
          {/* Main Column */}
          <div className={styles.mainCol}>
            
            {/* Loading State or Next Session */}
            {isLoading ? (
              <div className={`${styles.skeleton} ${styles.skeletonHero}`}></div>
            ) : nextSession ? (
              <div className={styles.heroCard}>
                <div className={styles.heroDeco}></div>
                <div className={styles.heroContent}>
                  <div className={styles.clientInfo}>
                    <div className={styles.clientImgWrap}>
                      {nextSession.clientImage ? (
                        <img src={nextSession.clientImage} alt={nextSession.clientName} />
                      ) : (
                        <div className={styles.initialsAvatar}>{nextSession.clientInitials || nextSession.clientName[0]}</div>
                      )}
                      <div className={styles.onlineDot}></div>
                    </div>
                    <div>
                      <div className={styles.clientNameRow}>
                        <h3 className={styles.clientName}>{nextSession.clientName}</h3>
                        {nextSession.isRecurring && <span className={styles.tagRecurring}>Recurring</span>}
                      </div>
                      <p className={styles.clientType}>
                        <span className="material-symbols-outlined">psychology</span>
                        {nextSession.sessionType} • {nextSession.durationMins} min
                      </p>
                      <div className={styles.clientMeta}>
                        <div className={styles.metaTime}>
                          <span className="material-symbols-outlined">schedule</span> {nextSession.time}
                        </div>
                        <div className={styles.metaVideo}>
                          <span className="material-symbols-outlined">{nextSession.mode === 'video' ? 'videocam' : 'call'}</span> 
                          {nextSession.mode === 'video' ? 'Video Consultation' : 'Voice Session'}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.heroActions}>
                    <button className={styles.btnStart} onClick={() => navigate('/call')}>
                      <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>play_circle</span>
                      Start Session
                    </button>
                    <button className={styles.btnNotes} disabled>View Intake Notes</button>
                  </div>
                </div>
              </div>
            ) : !sessions?.length && (
              <div className={styles.emptyState}>
                <p>No upcoming sessions found.</p>
                <button className={styles.btnJoin} onClick={() => navigate('/directory')}>Browse Professionals</button>
              </div>
            )}

            {/* Later Today List */}
            <div className={styles.laterListContainer}>
              <h4 className={styles.laterHeader}>Later Today</h4>
              
              {isLoading ? (
                <>
                  <div className={`${styles.skeleton} ${styles.skeletonRow}`}></div>
                  <div className={`${styles.skeleton} ${styles.skeletonRow}`}></div>
                </>
              ) : (
                laterSessions.map((session) => (
                  <div key={session.id} className={styles.sessionRow} onClick={() => navigate('/call')}>
                    <div className={styles.rowLeft}>
                      {session.clientImage ? (
                        <img className={styles.rowImg} src={session.clientImage} alt={session.clientName} />
                      ) : (
                        <div className={styles.initialsAvatar}>{session.clientInitials || session.clientName[0]}</div>
                      )}
                      <div>
                        <h5 className={styles.rowName}>{session.clientName}</h5>
                        <p className={styles.rowDesc}>{session.sessionType} • {session.time}</p>
                      </div>
                    </div>
                    <div className={styles.rowRight}>
                      {session.attachments ? (
                        <div className={styles.rowFiles}>
                          <span className="material-symbols-outlined text-sm">attachment</span>
                          <span>{session.attachments} Files</span>
                        </div>
                      ) : null}
                      {session.supportLevel === 'high' && (
                        <div className={styles.rowAlert}>
                          <span className="material-symbols-outlined text-sm">favorite</span>
                          <span>High Support</span>
                        </div>
                      )}
                      <button className={styles.btnJoin}>Join Call</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Side Column */}
          <div className={styles.sideCol}>
            {/* Insights Card */}
            <div className={styles.analyticsCard}>
              <div className={styles.analyticsDeco}>
                <span className="material-symbols-outlined">clinical_notes</span>
              </div>
              <h4 className={styles.acTitle}>Weekly Insights</h4>
              <div className={styles.acBody}>
                <div className={styles.acMainStat}>
                  <p className={styles.acBigNum}>24</p>
                  <p className={styles.acNumLabel}>Sessions completed</p>
                </div>
                <div className={styles.acGrid}>
                  <div className={styles.acBox}>
                    <p className={styles.acBoxVal}>98%</p>
                    <p className={styles.acBoxLabel}>Satisfaction</p>
                  </div>
                  <div className={styles.acBox}>
                    <p className={styles.acBoxVal}>15h</p>
                    <p className={styles.acBoxLabel}>Total Help</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Focus Areas */}
            <div className={styles.focusAreas}>
              <h4 className={styles.focusTitle}>Focus Areas</h4>
              <div className={styles.focusChips}>
                <span className={styles.chipTertiary}>Anxiety</span>
                <span className={styles.chipPrimary}>Depression</span>
                <span className={styles.chipTertiary}>Trauma</span>
                <span className={styles.chipPrimary}>Relationships</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* FAB */}
      <button className={styles.fab} onClick={() => navigate('/inbox')}>
        <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>add_comment</span>
      </button>
    </div>
  );
};
