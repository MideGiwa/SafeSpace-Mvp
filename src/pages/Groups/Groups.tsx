import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { groupService } from '../../services/groupService';
import { profileService } from '../../services/profileService';
import { useAuthStore } from '../../stores/useAuthStore';
import { toast } from 'sonner';
import styles from './Groups.module.css';

export const Groups: React.FC = () => {
  const queryClient = useQueryClient();
  const { user: storeUser } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // ─── Fetch groups ───────────────────────────────────────────────
  const { data: groups = [], isLoading } = useQuery({
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

  const isProfessional = storeUser?.role === 'PROFESSIONAL';
  const isLeader = storeUser?.role === 'LEADER';
  
  const ledGroups = useMemo(() => {
    if (!isProfessional || !groups) return [];
    return groups.filter(g => g.leaderId === storeUser?.id);
  }, [isProfessional, groups, storeUser?.id]);

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
      toast.error('Failed to join group');
    },
  });

  // ─── Create mutation ────────────────────────────────────────────
  const { mutate: createGroup, isPending: isCreating } = useMutation({
    mutationFn: (data: any) => groupService.createGroup(data),
    onSuccess: () => {
      toast.success('Your professional group has been created!');
      setIsCreateModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to create group');
    }
  });

  const categories = useMemo(() => {
    if (!groups) return ['All'];
    const caps = new Set(groups.map(g => g.tag));
    return ['All', ...Array.from(caps)];
  }, [groups]);

  const welcomeText = useMemo(() => {
    if (isProfessional) return 'Manage and facilitate specialized growth.';
    if (isLeader) return 'Lead your community with empathy.';
    return 'Find your sanctuary';
  }, [isProfessional, isLeader]);

  const filteredGroups = useMemo(() => {
    return groups.filter(g => {
      const matchesSearch =
        (g.title?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (g.description?.toLowerCase() || '').includes(searchQuery.toLowerCase());

      const matchesTab = activeTab === 'All' || g.tag === activeTab;
      
      // Don't show led groups in the discovery grid for professionals to avoid clutter
      const isLedByMe = isProfessional && g.leaderId === storeUser?.id;

      return matchesSearch && matchesTab && !isLedByMe;
    });
  }, [searchQuery, activeTab, groups, isProfessional, storeUser?.id]);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <section className={styles.header}>
          <div className={styles.skeleton} style={{ height: '4rem', width: '300px', marginBottom: '2rem' }} />
          <div className={styles.skeleton} style={{ height: '5rem', borderRadius: '2.5rem' }} />
        </section>

        <section className={styles.grid}>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className={`${styles.skeleton} ${styles.skeletonCard}`} />
          ))}
        </section>
      </div>
    );
  }

  return (
    <div className={styles.page}>

      {/* Hero Header Section */}
      <section className={styles.header}>
        <div className={styles.titleWrapper}>
          <span className={styles.eyebrow}>{isProfessional ? 'PROFESSIONAL HUB' : 'DIVERSE HUB'}</span>
          <h1 className={styles.title}>{welcomeText}</h1>
        </div>

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

      {/* Professional CTA / Managed Groups */}
      {isProfessional && (
        <>
          {ledGroups.length > 0 ? (
            <section className={styles.joinedSection} style={{ borderBottom: '1px solid var(--surface-container)' }}>
              <div className={styles.sectionHeader}>
                <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>stars</span>
                <div style={{ flex: 1 }}>
                  <h2>Groups You Lead</h2>
                </div>
                <button 
                  className={styles.createCTABtn} 
                  style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  + New Group
                </button>
              </div>
              <div className={styles.joinedScroll}>
                {ledGroups.map((group: any) => (
                  <div 
                    key={group.id} 
                    className={styles.joinedMiniCard}
                    onClick={() => navigate(`/groups/${group.id}`)}
                    style={{ border: '1px solid var(--primary-fixed-dim)' }}
                  >
                    <img src={group.image || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop'} alt="" />
                    <div className={styles.miniInfo}>
                      <h4>{group.title}</h4>
                      <span className={styles.miniTag} style={{ background: 'var(--primary-fixed)', color: 'var(--primary)' }}>LEADER</span>
                    </div>
                    <button className={styles.miniEnterBtn}>
                      <span className="material-symbols-outlined">settings</span>
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <section className={styles.createCTA}>
               <div className={styles.createCTAIcon}>
                 <span className="material-symbols-outlined">groups_3</span>
               </div>
               <h2>Start your first Professional Group</h2>
               <p>Create a dedicated sanctuary where members can receive specialized guidance, peer support, and clinical excellence under your leadership.</p>
               <button className={styles.createCTABtn} onClick={() => setIsCreateModalOpen(true)}>
                 Create Professional Group
               </button>
            </section>
          )}
        </>
      )}

      {/* My Joined Groups (Fast access) */}
      {!isProfessional && joinedGroups.length > 0 && (
        <section className={styles.joinedSection}>
          <div className={styles.sectionHeader}>
            <span className="material-symbols-outlined">favorite</span>
            <h2>My Sanctuaries</h2>
          </div>
          <div className={styles.joinedScroll}>
            {joinedGroups.map((group: any) => (
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
                <div className={styles.tagsRow}>
                  {group.tag && <span className={styles.cardTag}>{group.tag}</span>}
                  {(group.entryFee ?? 0) > 0 ? (
                    <span className={styles.feeTag}>
                      <span className="material-symbols-outlined" style={{fontSize: '1rem'}}>toll</span>
                      {group.entryFee}
                    </span>
                  ) : (
                    <span className={styles.freeTag}>Free</span>
                  )}
                </div>
                <h3>{group.title}</h3>
              </div>
              
              <p className={styles.cardDesc}>{group.description}</p>
              
              <div className={styles.cardFooter}>
                <div className={styles.membersArea}>
                  <div className={styles.avatarStack}>
                    <div className={styles.avatar}>
                      <span className="material-symbols-outlined" style={{fontSize: '1rem', color: 'var(--outline)'}}>person</span>
                    </div>
                    <div className={styles.avatar}>
                      <span className="material-symbols-outlined" style={{fontSize: '1rem', color: 'var(--outline)'}}>group</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--on-surface-variant)', marginLeft: '0.5rem' }}>
                      {group.memberCount} members
                    </span>
                  </div>
                </div>
                {joinedGroups.some((jg: any) => jg.id === group.id) ? (
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

      {/* Creation Modal */}
      {isCreateModalOpen && (
        <CreateGroupModal 
          onClose={() => setIsCreateModalOpen(false)} 
          onSubmit={(data) => createGroup(data)}
          isPending={isCreating}
        />
      )}
    </div>
  );
};

interface CreateGroupModalProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  isPending: boolean;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ onClose, onSubmit, isPending }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tag: 'Support',
    isPublic: true,
    entryFee: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Create New Group</h2>
          <p>Define your sanctuary's clinical or support focus.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Group Title</label>
            <input 
              className={styles.formInput}
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Anxiety Management Focus"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea 
              className={styles.formTextarea}
              required
              rows={4}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="What can members expect from this group?"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Category Tag</label>
            <select 
              className={styles.formSelect}
              value={formData.tag}
              onChange={e => setFormData({ ...formData, tag: e.target.value })}
            >
              <option value="Support">Support</option>
              <option value="Clinical">Clinical</option>
              <option value="Peer-to-Peer">Peer-to-Peer</option>
              <option value="Wellness">Wellness</option>
            </select>
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancel</button>
            <button type="submit" className={styles.submitBtn} disabled={isPending}>
              {isPending ? 'Establishing...' : 'Create Sanctuary'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
