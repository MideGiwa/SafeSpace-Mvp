import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '../../services/profileService';
import { kycService } from '../../services/kycService';
import { useAuthStore } from '../../stores/useAuthStore';
import { toast } from 'sonner';
import styles from './Profile.module.css';

type VerificationMethod = 'NIN' | 'BVN';

export const Profile: React.FC = () => {
  const queryClient = useQueryClient();
  const { user: storeUser, updateUser } = useAuthStore();

  const [activeTab, setActiveTab] = useState<'info' | 'verify' | 'privacy'>('info');
  const [vMethod, setVMethod] = useState<VerificationMethod>('NIN');
  const [vValue, setVValue] = useState('');
  
  const [form, setForm] = useState({
    pseudonym: storeUser?.pseudonym ?? '',
    firstName: storeUser?.firstName ?? '',
    lastName: storeUser?.lastName ?? '',
  });

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', storeUser?.id],
    queryFn: () => storeUser?.id ? profileService.getProfile(storeUser.id) : Promise.reject('No user ID'),
    enabled: !!storeUser?.id,
  });

  const { data: kycStatusData } = useQuery({
    queryKey: ['kycStatus'],
    queryFn: kycService.getStatus,
    refetchInterval: (query) => query.state.data?.kycStatus === 'PENDING' ? 5000 : false,
    enabled: !!storeUser?.id
  });

  const currentKycStatus = kycStatusData?.kycStatus || profile?.kycStatus;

  const isNamesComplete = useMemo(() => {
    return !!profile?.firstName && !!profile?.lastName;
  }, [profile]);

  const { mutate: saveProfile, isPending: saving } = useMutation({
    mutationFn: (data: any) => profileService.updateProfile(storeUser!.id!, data),
    onSuccess: (updated) => {
      updateUser(updated);
      queryClient.invalidateQueries({ queryKey: ['profile', storeUser?.id] });
      toast.success('Identity updated');
    }
  });

  const { mutate: startKyc, isPending: isVerifying } = useMutation({
    mutationFn: () => vMethod === 'BVN' ? kycService.verifyBvn(vValue) : kycService.verifyNin(vValue),
    onSuccess: () => {
      toast.success('Verification submitted');
      queryClient.invalidateQueries({ queryKey: ['profile', storeUser?.id] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Verification failed');
    }
  });

  if (isLoading) return <div className={styles.loader}>Shaping your sanctuary...</div>;

  const initials = ((profile?.firstName?.[0] || '') + (profile?.lastName?.[0] || '')).toUpperCase();

  return (
    <div className={styles.container}>
      {/* Sidebar-like Navigation inside the page */}
      <aside className={styles.navSide}>
        <div className={styles.userBrief}>
          <div className={styles.avatarLarge}>{initials || '??'}</div>
          <h3>{profile?.pseudonym || 'Mysterious Member'}</h3>
          <p>{profile?.role?.toLowerCase().replace('_', ' ')}</p>
        </div>
        
        <nav className={styles.sideMenu}>
          <button 
            className={`${styles.navItem} ${activeTab === 'info' ? styles.navActive : ''}`}
            onClick={() => setActiveTab('info')}
          >
            <span className="material-symbols-outlined">badge</span> Personal Info
          </button>
          {storeUser?.role !== 'REGULAR' && (
            <button 
              className={`${styles.navItem} ${activeTab === 'verify' ? styles.navActive : ''}`}
              onClick={() => setActiveTab('verify')}
            >
              <span className="material-symbols-outlined">verified_user</span> Verification
            </button>
          )}
          <button 
            className={`${styles.navItem} ${activeTab === 'privacy' ? styles.navActive : ''}`}
            onClick={() => setActiveTab('privacy')}
          >
            <span className="material-symbols-outlined">security</span> Privacy & Safety
          </button>
        </nav>
      </aside>

      <main className={styles.contentArea}>
        {activeTab === 'info' && (
          <div className={styles.viewPanel}>
            <header className={styles.panelHeader}>
              <h2>Personal Information</h2>
              <p>Update how you appear to the community and specialists.</p>
            </header>

            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label>First Name</label>
                <input 
                  value={form.firstName} 
                  onChange={e => setForm(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder="Legal First Name"
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Last Name</label>
                <input 
                  value={form.lastName} 
                  onChange={e => setForm(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Legal Last Name"
                />
              </div>
              <div className={styles.inputGroupFull}>
                <label>Pseudonym (Display Name)</label>
                <input 
                  value={form.pseudonym} 
                  onChange={e => setForm(prev => ({ ...prev, pseudonym: e.target.value }))}
                  placeholder="e.g. PeacefulMind"
                />
                <small>This is what other members will see.</small>
              </div>
            </div>

            <button 
              className={styles.primaryBtn}
              onClick={() => saveProfile(form)}
              disabled={saving}
            >
              {saving ? 'Syncing...' : 'Save Changes'}
            </button>
          </div>
        )}

        {activeTab === 'verify' && storeUser?.role !== 'REGULAR' && (
          <div className={styles.viewPanel}>
            <header className={styles.panelHeader}>
              <h2>Identity Verification</h2>
              <p>Verify your identity to unlock trust badges and premium features.</p>
            </header>

            {currentKycStatus === 'VERIFIED' ? (
              <div className={styles.statusCardSuccess}>
                <span className="material-symbols-outlined">check_circle</span>
                <div>
                  <h4>Fully Verified</h4>
                  <p>Your identity has been confirmed. You now have full access to all features.</p>
                </div>
              </div>
            ) : (
              <div className={styles.verifyFlow}>
                {currentKycStatus === 'PENDING' && (
                  <div className={styles.statusCardPending} style={{ marginBottom: '2rem' }}>
                    <span className="material-symbols-outlined">hourglass_empty</span>
                    <div>
                      <h4>Verification Under Review</h4>
                      <p>We're currently reviewing your details. You can update your submission below if needed.</p>
                    </div>
                  </div>
                )}

                {!isNamesComplete && (
                  <div className={styles.warningBox}>
                    <span className="material-symbols-outlined">error</span>
                    <p>Please complete your <b>First and Last Name</b> in the Personal Info tab before verifying.</p>
                  </div>
                )}

                <div className={styles.methodToggle}>
                  <button 
                    className={vMethod === 'NIN' ? styles.toggleActive : ''} 
                    onClick={() => setVMethod('NIN')}
                  >NIN (Identity Number)</button>
                  <button 
                    className={vMethod === 'BVN' ? styles.toggleActive : ''} 
                    onClick={() => setVMethod('BVN')}
                  >BVN (Bank Verification)</button>
                </div>

                <div className={styles.inputGroupFull}>
                  <label>{vMethod === 'NIN' ? '11-Digit NIN' : '11-Digit BVN'}</label>
                  <input 
                    type="password"
                    value={vValue}
                    onChange={e => setVValue(e.target.value.replace(/\D/g, '').slice(0, 11))}
                    placeholder="Enter 11 digits"
                    disabled={!isNamesComplete || isVerifying}
                  />
                  <small>Your security is our priority. This data is encrypted and discarded after verification.</small>
                </div>

                <button 
                  className={styles.verifyBtn}
                  disabled={!isNamesComplete || vValue.length < 11 || isVerifying}
                  onClick={() => startKyc()}
                >
                  {isVerifying ? 'Verifying...' : (currentKycStatus === 'PENDING' ? 'Update Submission' : 'Submit for Review')}
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className={styles.viewPanel}>
            <header className={styles.panelHeader}>
              <h2>Privacy & Safety</h2>
              <p>Control your visibility and safety preferences.</p>
            </header>

            <div className={styles.settingCard}>
              <div className={styles.settingText}>
                <h4>Anonymous Mode</h4>
                <p>When enabled, your pseudonym is hidden and replaced with "Anonymous" across public groups.</p>
              </div>
              <AnonToggle />
            </div>

            <div className={styles.settingCard}>
              <div className={styles.settingText}>
                <h4>Direct Messaging</h4>
                <p>Allow specialists and members to reach out to you directly.</p>
              </div>
              <DMOption 
                onChange={(enabled) => saveProfile({ ...form, dmOptIn: enabled } as any)} 
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const AnonToggle: React.FC = () => {
  const { isAnonymousMode, toggleAnonymousMode } = useAuthStore();
  return (
    <button
      className={`${styles.toggle} ${isAnonymousMode ? styles.toggleOn : ''}`}
      onClick={() => toggleAnonymousMode(!isAnonymousMode)}
    >
      <div className={styles.toggleTrack}>
        <div className={styles.toggleThumb} />
      </div>
    </button>
  );
};

const DMOption: React.FC<{ onChange: (enabled: boolean) => void }> = ({ onChange }) => {
  const { dmOptIn, toggleDmOptIn } = useAuthStore();
  
  const handleToggle = () => {
    const newVal = !dmOptIn;
    toggleDmOptIn(newVal);
    onChange(newVal);
  };

  return (
    <button className={`${styles.toggle} ${dmOptIn ? styles.toggleOn : ''}`} onClick={handleToggle}>
       <div className={styles.toggleTrack}>
        <div className={styles.toggleThumb} />
      </div>
    </button>
  );
}
