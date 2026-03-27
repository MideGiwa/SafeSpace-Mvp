import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '../../services/profileService';
import { useAuthStore } from '../../stores/useAuthStore';
import styles from './Profile.module.css';

const kycStatusLabel: Record<string, { label: string; color: string }> = {
  PENDING: { label: 'Verification Pending', color: 'var(--warning, #F59E0B)' },
  VERIFIED: { label: 'Verified', color: 'var(--success, #22C55E)' },
  REJECTED: { label: 'Unverified', color: 'var(--error, #EF4444)' },
};

const roleLabel: Record<string, string> = {
  REGULAR: 'Community Member',
  VERIFIED_PERSON: 'Verified Member',
  PROFESSIONAL: 'Mental Health Professional',
  ADMIN: 'Administrator',
};

export const Profile: React.FC = () => {
  const queryClient = useQueryClient();
  const { user: storeUser, updateUser } = useAuthStore();

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    pseudonym: storeUser?.pseudonym ?? '',
    firstName: storeUser?.firstName ?? '',
    lastName: storeUser?.lastName ?? '',
  });

  // Fetch fresh profile from API
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', storeUser?.id],
    queryFn: () => storeUser?.id ? profileService.getProfile(storeUser.id) : Promise.reject('No user ID'),
    enabled: !!storeUser?.id,
    initialData: storeUser ?? undefined,
    staleTime: 60_000,
  });

  // Update profile mutation
  const { mutate: saveProfile, isPending: saving } = useMutation({
    mutationFn: () => {
      if (!storeUser?.id) throw new Error('No user ID');
      return profileService.updateProfile(storeUser.id, {
        pseudonym: form.pseudonym || undefined,
        firstName: form.firstName || undefined,
        lastName: form.lastName || undefined,
      });
    },
    onSuccess: (updated) => {
      updateUser(updated);
      queryClient.setQueryData(['profile', storeUser?.id], updated);
      setIsEditing(false);
    },
    onError: (err) => console.error('Profile update failed', err),
  });

  const displayName = profile?.pseudonym || profile?.firstName || 'Member';
  const initials = (profile?.firstName?.[0] ?? '') + (profile?.lastName?.[0] ?? '');
  const kyc = profile?.kycStatus ? kycStatusLabel[profile.kycStatus] : null;

  return (
    <div className={styles.page}>

      {/* Hero Banner */}
      <div className={styles.heroBanner} />

      {/* Card */}
      <div className={styles.profileCard}>

        {/* Avatar placeholder */}
        <div className={styles.avatarWrap}>
          <div className={styles.avatar}>
            {initials ? (
              <span className={styles.avatarInitials}>{initials.toUpperCase()}</span>
            ) : (
              <span className="material-symbols-outlined">person</span>
            )}
          </div>
        </div>

        {/* Name & role */}
        <div className={styles.identityBlock}>
          <h1 className={styles.displayName}>{displayName}</h1>
          {profile?.role && (
            <span className={styles.rolePill}>{roleLabel[profile.role] ?? profile.role}</span>
          )}
          {kyc && profile?.role !== 'REGULAR' && (
            <span className={styles.kycBadge} style={{ color: kyc.color }}>
              <span className="material-symbols-outlined">
                {profile?.kycStatus === 'VERIFIED' ? 'verified' : 'pending'}
              </span>
              {kyc.label}
            </span>
          )}
        </div>

        {/* Info fields */}
        {isLoading ? (
          <div className={styles.loadingPulse}>
            <div className={styles.skeletonLine} />
            <div className={styles.skeletonLine} style={{ width: '60%' }} />
          </div>
        ) : isEditing ? (
          <form
            className={styles.editForm}
            onSubmit={(e) => { e.preventDefault(); saveProfile(); }}
          >
            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>Display name (pseudonym)</label>
              <input
                className={styles.fieldInput}
                value={form.pseudonym}
                onChange={e => setForm(f => ({ ...f, pseudonym: e.target.value }))}
                placeholder="e.g. Quiet Storm"
              />
            </div>
            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>First name</label>
              <input
                className={styles.fieldInput}
                value={form.firstName}
                onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
              />
            </div>
            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>Last name</label>
              <input
                className={styles.fieldInput}
                value={form.lastName}
                onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
              />
            </div>
            <div className={styles.editActions}>
              <button
                type="button"
                className={styles.btnCancel}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.btnSave}
                disabled={saving}
              >
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </form>
        ) : (
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Email</span>
              <span className={styles.infoValue}>{profile?.email ?? '—'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Pseudonym</span>
              <span className={styles.infoValue}>{profile?.pseudonym ?? '—'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Full name</span>
              <span className={styles.infoValue}>
                {[profile?.firstName, profile?.lastName].filter(Boolean).join(' ') || '—'}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>DM opt-in</span>
              <span className={styles.infoValue}>{profile?.dmOptIn ? 'Enabled' : 'Disabled'}</span>
            </div>
          </div>
        )}

        {/* Edit toggle */}
        {!isEditing && (
          <button className={styles.editBtn} onClick={() => {
            setForm({
              pseudonym: profile?.pseudonym ?? '',
              firstName: profile?.firstName ?? '',
              lastName: profile?.lastName ?? '',
            });
            setIsEditing(true);
          }}>
            <span className="material-symbols-outlined">edit</span>
            Edit Profile
          </button>
        )}
      </div>

      {/* Privacy & safety section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Privacy & Safety</h2>
        <div className={styles.settingsList}>
          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <span className="material-symbols-outlined">visibility_off</span>
              <div>
                <h4>Anonymous mode</h4>
                <p>Post and comment without showing your identity</p>
              </div>
            </div>
            <AnonToggle />
          </div>
          {profile?.role !== 'REGULAR' && (
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <span className="material-symbols-outlined">verified_user</span>
                <div>
                  <h4>Identity verification (KYC)</h4>
                  <p>Verify your identity to unlock additional features</p>
                </div>
              </div>
              <span className={styles.settingChevron}>›</span>
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

/** Inline toggle for anonymous mode wired to the auth store */
const AnonToggle: React.FC = () => {
  const { isAnonymousMode, toggleAnonymousMode } = useAuthStore();
  return (
    <button
      className={`${styles.toggle} ${isAnonymousMode ? styles.toggleOn : ''}`}
      onClick={() => toggleAnonymousMode(!isAnonymousMode)}
      aria-pressed={isAnonymousMode}
    >
      <span className={styles.toggleThumb} />
    </button>
  );
};
