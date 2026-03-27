import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { groupService } from '../../services/groupService';
import { profileService } from '../../services/profileService';
import { useAuthStore } from '../../stores/useAuthStore';
import styles from './Groups.module.css';

export const Groups: React.FC = () => {
  const queryClient = useQueryClient();
  const { user: storeUser } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  // ─── Fetch groups ───────────────────────────────────────────────
  const { data: groups = [], isLoading, isError } = useQuery({
    queryKey: ['groups'],
    queryFn: () => groupService.getGroups(),
  });

  const { data: profile } = useQuery({
    queryKey: ['profile', storeUser?.id],
    queryFn: () => storeUser?.id ? profileService.getProfile(storeUser.id) : Promise.reject('No ID'),
    enabled: !!storeUser?.id,
  });

  const joinedGroups = useMemo(() => {
    return (profile as any)?.groupMemberships?.map((m: any) => m.group) || [];
  }, [profile]);

  const navigate = useNavigate();

  // ─── Join mutation ──────────────────────────────────────────────
  const { mutate: joinGroup } = useMutation({
    mutationFn: (id: string) => groupService.joinGroup(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      queryClient.invalidateQueries({ queryKey: ['joinedGroups'] });
    },
    onError: (err: any) => {
      if (err.response?.status === 409) {
        queryClient.invalidateQueries({ queryKey: ['groups'] });
        queryClient.invalidateQueries({ queryKey: ['joinedGroups'] });
        return;
      }
      console.error('Failed to join group', err);
    },
  });

  const categories = useMemo(() => {
    if (!groups) return ['All'];
    const caps = new Set(groups.map(g => g.tag));
    return ['All', ...Array.from(caps)];
  }, [groups]);

  const filteredGroups = useMemo(() => {
    return groups.filter(g => {
      const matchesSearch = 
        (g.title?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
        (g.description?.toLowerCase() || '').includes(searchQuery.toLowerCase());
      
      const matchesTab = activeTab === 'All' || g.tag === activeTab;

      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab, groups]);

  if (isLoading) return <div className={styles.page}><p style={{ textAlign: 'center', marginTop: '4rem' }}>Finding sanctuaries...</p></div>;
  if (isError) return <div className={styles.page}><p style={{ textAlign: 'center', marginTop: '4rem', color: 'red' }}>Error loading groups.</p></div>;

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

      {/* My Joined Groups (Fast access) */}
      {joinedGroups.length > 0 && (
        <section className={styles.joinedSection}>
          <div className={styles.sectionHeader}>
            <span className="material-symbols-outlined">favorite</span>
            <h2>My Sanctuaries</h2>
          </div>
          <div className={styles.joinedScroll}>
            {joinedGroups.map(group => (
              <div 
                key={group.id} 
                className={styles.joinedMiniCard}
                onClick={() => navigate(`/groups/${group.id}`)}
              >
                <img src={group.image || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop'} alt="" />
                <div className={styles.miniInfo}>
                  <h4>{group.title}</h4>
                  <span className={styles.miniTag}>{group.tag}</span>
                </div>
                <button className={styles.miniEnterBtn}>
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Communities Grid */}
      <section className={styles.grid}>
        {filteredGroups.map(group => (
          <div key={group.id} className={styles.card}>
            <div className={styles.cardVisual}>
              <img src={group.image || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop'} alt={group.title} className={styles.cardImage} />
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
                  {(group.entryFee ?? 0) > 0 ? (
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
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>
                      {group.memberCount} members
                    </span>
                  </div>
                </div>
                {joinedGroups.some(jg => jg.id === group.id) ? (
                  <button 
                    className={styles.enterBtn} 
                    onClick={() => navigate(`/groups/${group.id}`)}
                  >
                    Enter Sanctuary
                  </button>
                ) : (
                  <button 
                    className={styles.joinBtn} 
                    onClick={() => joinGroup(group.id)}
                  >
                    Join Group
                  </button>
                )}
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
