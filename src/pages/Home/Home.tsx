import React, { useMemo } from 'react';
import { Button } from '../../components/ui/Button/Button';
import { professionals } from '../../data/professionals';
import { upcomingSessions } from '../../data/sessions';
import { useAuthStore } from '../../stores/useAuthStore';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { communityService } from '../../services/communityService';
import { groupService } from '../../services/groupService';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();

  // ─── Fetch real data ───────────────────────────────────────────
  const { data: postsData } = useQuery({
    queryKey: ['posts'],
    queryFn: () => communityService.getPosts(1, 5),
    enabled: isAuthenticated
  });

  const { data: groupsData } = useQuery({
    queryKey: ['groups'],
    queryFn: () => groupService.getGroups(),
    enabled: isAuthenticated
  });

  // Derive display name: prefer pseudonym, then firstName, fallback to "there"
  const displayName = useMemo(() => {
    if (!user) return 'there';
    return user.pseudonym || user.firstName || 'there';
  }, [user]);

  const userGroups = groupsData || [];
  const posts = postsData?.data || [];
  const hasGroups = userGroups.length > 0;

  return (
    <div className={styles.page}>

      <header className={styles.header}>
        <div className={styles.headerTop}>
          <h1 className={styles.titleInfo}>
            {isAuthenticated ? 'Welcome back,' : 'Find Your'}<br />
            <span className={styles.italicHigh}>
              {isAuthenticated ? displayName : 'Sanctuary'}
            </span>
          </h1>
        </div>
        <p className={styles.subtitleInfo}>
          {isAuthenticated
            ? 'Your dedicated space for healing and continuous growth.'
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

      {/* ── AUTHENTICATED & HAS GROUPS: Upcoming Sessions & Updates ── */}
      {isAuthenticated && hasGroups && (
        <>
          {/* Upcoming Sessions Section */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Upcoming Sessions</h2>
              <button className={styles.seeAllBtn} onClick={() => navigate('/sessions')}>View All</button>
            </div>
            <div className={styles.sessionsList}>
              {(upcomingSessions as any[]).slice(0, 2).map((session: any) => (
                <div key={session.id} className={styles.sessionCard} onClick={() => navigate('/call')}>
                  <div className={styles.sessionTime}>
                    <span className="material-symbols-outlined">schedule</span>
                    <span>{session.time}</span>
                  </div>
                  <div className={styles.sessionInfo}>
                    <h4>{session.sessionType}</h4>
                    <p>with {session.clientName}</p>
                  </div>
                  <span className="material-symbols-outlined">chevron_right</span>
                </div>
              ))}
            </div>
          </section>

          {/* Group Updates Section */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Updates from your groups</h2>
              <button className={styles.seeAllBtn} onClick={() => navigate('/community')}>Community</button>
            </div>
            <div className={styles.updatesList}>
              {(posts as any[]).slice(0, 3).map((post: any) => (
                <div key={post.id} className={styles.updateCard} onClick={() => navigate('/community')}>
                  <div className={styles.updateHeader}>
                    <span className={styles.updateGroup}>{post.authorName || 'Member'}</span>
                    <span className={styles.updateTime}>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className={styles.updateContent}>{post.content}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ── AUTHENTICATED & NO GROUPS: Onboarding CTAs ──────────── */}
      {isAuthenticated && !hasGroups && (
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

      {/* ── Always show Professionals if not in groups or just as fallback ── */}
      {(!isAuthenticated || !hasGroups) && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionTag}>EXPERT HELP</span>
              <h2 className={styles.sectionTitle}>Talk to a Professional</h2>
            </div>
            <button className={styles.seeAllBtn} onClick={() => navigate('/directory')}>See All</button>
          </div>
          <div className={styles.proScroller}>
            {(professionals as any[]).slice(0, 3).map((pro: any) => (
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

      {/* ── Quick Actions (Authenticated only) ────────────────────── */}
      {isAuthenticated && (
        <div className={styles.quickActions}>
          <div className={styles.actionCard} onClick={() => navigate('/community')}>
            <div className={styles.iconHeart}><span className="material-symbols-outlined">forum</span></div>
            <h3>Community Wall</h3>
            <p>Shared stories.</p>
          </div>
          <div className={styles.actionCard} onClick={() => navigate('/tokens')}>
            <div className={styles.iconSecure}><span className="material-symbols-outlined">toll</span></div>
            <h3>My Wallet</h3>
            <p>Token balance.</p>
          </div>
        </div>
      )}

      {/* ── Newsletter ────────────────────────────────────────────── */}
      <section className={styles.newsletter}>
        <h3>Stay Grounded</h3>
        <p>Weekly mindfulness tips and community updates delivered to your inbox.</p>
        <div className={styles.newsInput}>
          <input type="email" placeholder="Email address" aria-label="Email address" />
          <button>Join</button>
        </div>
      </section>

    </div>
  );
};
