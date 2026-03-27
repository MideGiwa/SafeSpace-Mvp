import React, { useMemo } from 'react';
import { Button } from '../../components/ui/Button/Button';
import { professionals } from '../../data/professionals';
import { useAuthStore } from '../../stores/useAuthStore';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { communityService } from '../../services/communityService';
import { groupService } from '../../services/groupService';
import { sessionService } from '../../services/sessionService';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();

  // ─── Fetch real data ───────────────────────────────────────────
  const { data: postsData, isLoading: isLoadingPosts } = useQuery({
    queryKey: ['posts'],
    queryFn: () => communityService.getPosts(1, 5),
    enabled: isAuthenticated
  });

  const { data: groupsData, isLoading: isLoadingGroups } = useQuery({
    queryKey: ['groups'],
    queryFn: () => groupService.getGroups(),
    enabled: isAuthenticated
  });

  const { data: sessions, isLoading: isLoadingSessions } = useQuery({
    queryKey: ['upcomingSessions'],
    queryFn: sessionService.getUpcomingSessions,
    enabled: isAuthenticated
  });

  const isProfessional = user?.role === 'PROFESSIONAL';
  const isLeader = user?.role === 'LEADER';
  
  // Derive display name: prefer pseudonym, then firstName, fallback to "there"
  const displayName = useMemo(() => {
    if (!user) return 'there';
    return user.pseudonym || user.firstName || 'there';
  }, [user]);

  const welcomePrefix = useMemo(() => {
    if (!isAuthenticated) return 'Find Your';
    if (isProfessional) return 'Welcome back, Specialist';
    if (isLeader) return 'Greetings, Leader';
    return 'Welcome back,';
  }, [isAuthenticated, isProfessional, isLeader]);

  const userGroups = groupsData || [];
  const posts = postsData?.data || [];
  const hasGroups = userGroups.length > 0;

  return (
    <div className={styles.page}>

      <header className={styles.header}>
        <div className={styles.headerTop}>
          <h1 className={styles.titleInfo}>
            {welcomePrefix}<br />
            <span className={styles.italicHigh}>
              {isAuthenticated ? displayName : 'Sanctuary'}
            </span>
          </h1>
        </div>
        <p className={styles.subtitleInfo}>
          {isAuthenticated
            ? (isProfessional 
                ? 'Your dashboard for managing sessions and helping the community grow.' 
                : 'Your dedicated space for healing and continuous growth.')
            : 'A cushioned digital space designed for healing, community support, and professional care.'}
        </p>
      </header>

      {/* ── UNAUTHENTICATED: Hero Card ─────────────────────────── */}
      {!isAuthenticated && (
        <section className={styles.heroCard}>
          <span className={styles.heroTag}>JOIN OUR COMMUNITY</span>
          <h2 className={styles.heroTitle}>Talk to people who understand.</h2>
          <button className={styles.exploreBtn} onClick={() => navigate('/auth')}>
            Get Started &rarr;
          </button>
        </section>
      )}

      {/* ── AUTHENTICATED: Upcoming Sessions ── */}
      {isAuthenticated && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {isProfessional ? "Today's Appointments" : "Upcoming Sessions"}
            </h2>
            <button className={styles.seeAllBtn} onClick={() => navigate('/sessions')}>View All</button>
          </div>
          <div className={styles.sessionsList}>
            {isLoadingSessions ? (
              <>
                <div className={`${styles.skeleton} ${styles.skeletonSession}`} />
                <div className={`${styles.skeleton} ${styles.skeletonSession}`} />
              </>
            ) : sessions && sessions.length > 0 ? (
              sessions.slice(0, 2).map((session) => (
                <div key={session.id} className={styles.sessionCard} onClick={() => navigate('/call')}>
                  <div className={styles.sessionTime}>
                    <span className="material-symbols-outlined">schedule</span>
                    <span>{session.time}</span>
                  </div>
                  <div className={styles.sessionInfo}>
                    <h4>{session.sessionType}</h4>
                    <p>{isProfessional ? `Client: ${session.clientName || 'Anonymous'}` : `with ${session.professionalName || 'Specialist'}`}</p>
                  </div>
                  <span className="material-symbols-outlined">chevron_right</span>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>No sessions scheduled for today.</div>
            )}
          </div>
        </section>
      )}

      {/* ── AUTHENTICATED & NO GROUPS (MEMBER) ──────────── */}
      {isAuthenticated && !isProfessional && !hasGroups && !isLoadingGroups && (
        <section className={styles.onboardingSection}>
          <div className={styles.ctaCard} onClick={() => navigate('/groups')}>
            <div className={styles.ctaIcon}><span className="material-symbols-outlined">hub</span></div>
            <div className={styles.ctaContent}>
              <h3>Join a Support Group</h3>
              <p>Find a community of people who share your journey.</p>
            </div>
            <span className="material-symbols-outlined">arrow_forward</span>
          </div>
          
          <div className={styles.ctaCard} onClick={() => navigate('/directory')}>
            <div className={styles.ctaIcon}><span className="material-symbols-outlined">psychology</span></div>
            <div className={styles.ctaContent}>
              <h3>Speak to a Professional</h3>
              <p>Book a private session with a licensed specialist.</p>
            </div>
            <span className="material-symbols-outlined">arrow_forward</span>
          </div>
        </section>
      )}

      {/* ── PROFESSIONAL CTAs ─────────────────────────── */}
      {isAuthenticated && isProfessional && (
        <section className={styles.onboardingSection}>
          <div className={styles.ctaCard} onClick={() => navigate('/professional/availability')}>
            <div className={styles.ctaIcon}><span className="material-symbols-outlined">calendar_month</span></div>
            <div className={styles.ctaContent}>
              <h3>Set Availability</h3>
              <p>Manage your working hours and session slots.</p>
            </div>
            <span className="material-symbols-outlined">arrow_forward</span>
          </div>
          
          <div className={styles.ctaCard} onClick={() => navigate('/professional/requests')}>
            <div className={styles.ctaIcon}><span className="material-symbols-outlined">mail</span></div>
            <div className={styles.ctaContent}>
              <h3>Session Requests</h3>
              <p>View and accept incoming specialized care requests.</p>
            </div>
            <span className="material-symbols-outlined">arrow_forward</span>
          </div>
        </section>
      )}

      {/* ── Updates List ────────────────────────────────────────────── */}
      {isAuthenticated && !isProfessional && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {isProfessional ? 'Community Insights' : 'Updates from your groups'}
            </h2>
            <button className={styles.seeAllBtn} onClick={() => navigate('/community')}>Community</button>
          </div>
          <div className={styles.updatesList}>
            {isLoadingPosts ? (
              <>
                <div className={`${styles.skeleton} ${styles.skeletonUpdate}`} />
                <div className={`${styles.skeleton} ${styles.skeletonUpdate}`} />
              </>
            ) : posts.length > 0 ? (
              posts.slice(0, 3).map((post) => (
                <div key={post.id} className={styles.updateCard} onClick={() => navigate('/community')}>
                  <div className={styles.updateHeader}>
                    <span className={styles.updateGroup}>{post.authorName || 'Member'}</span>
                    <span className={styles.updateTime}>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className={styles.updateContent}>{post.content}</p>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>No community updates yet.</div>
            )}
          </div>
        </section>
      )}

      {/* ── Always show Professionals only for Members ── */}
      {(!isAuthenticated || !isProfessional) && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionTag}>EXPERT HELP</span>
              <h2 className={styles.sectionTitle}>Talk to a Professional</h2>
            </div>
            <button className={styles.seeAllBtn} onClick={() => navigate('/directory')}>See All</button>
          </div>
          <div className={styles.proScroller}>
            {professionals.slice(0, 3).map((pro) => (
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
                <Button
                  variant="primary"
                  className={styles.bookBtn}
                  onClick={() => navigate(`/directory/${pro.id}`)}
                >
                  Book Session
                </Button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Quick Actions ────────────────────── */}
      {isAuthenticated && (
        <div className={styles.quickActions}>
          <div className={styles.actionCard} onClick={() => navigate('/community')}>
            <div className={styles.iconHeart}><span className="material-symbols-outlined">forum</span></div>
            <h3>{isProfessional ? 'Platform Feed' : 'Community Wall'}</h3>
            <p>Shared stories.</p>
          </div>
        </div>
      )}

      {/* ── Newsletter ────────────────────────────────────────────── */}
      <section className={styles.newsletter}>
        <h3>{isProfessional ? 'Clinical Excellence' : 'Stay Grounded'}</h3>
        <p>
          {isProfessional 
            ? 'Professional resources and therapist-focused updates for your practice.'
            : 'Weekly mindfulness tips and community updates delivered to your inbox.'}
        </p>
        <div className={styles.newsInput}>
          <input type="email" placeholder="Email address" aria-label="Email address" />
          <button>Join</button>
        </div>
      </section>

    </div>
  );
};
