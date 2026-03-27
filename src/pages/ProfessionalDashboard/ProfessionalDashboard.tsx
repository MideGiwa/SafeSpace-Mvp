import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingService } from '../../services/bookingService';
import { useAuthStore } from '../../stores/useAuthStore';
import { professionalService } from '../../services/professionalService';
import { toast } from 'sonner';
import styles from './ProfessionalDashboard.module.css';

export const ProfessionalDashboard: React.FC = () => {
  const queryClient = useQueryClient();
  const { user: storeUser } = useAuthStore();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['professionalBookings'],
    queryFn: bookingService.getBookings
  });

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['myProfessionalProfile'],
    queryFn: () => professionalService.getProfessionals().then(pros => pros.find(p => p.userId === storeUser?.id)),
    enabled: !!storeUser?.id
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    bio: '',
    specialty: '',
    contactPreference: 'EMAIL'
  });

  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: (data: any) => profile ? professionalService.updateProfile(data) : professionalService.submitProfile(data),
    onSuccess: () => {
      toast.success(profile ? 'Profile updated' : 'Profile submitted for verification');
      setIsEditingProfile(false);
      queryClient.invalidateQueries({ queryKey: ['myProfessionalProfile'] });
    },
    onError: (err: any) => {
      toast.error('Failed to save profile', {
        description: err.response?.data?.message || 'Something went wrong.'
      });
    }
  });

  const { mutate: acceptRequest } = useMutation({
    mutationFn: (id: string) => bookingService.acceptBooking(id),
    onSuccess: () => {
      toast.success('Booking accepted');
      queryClient.invalidateQueries({ queryKey: ['professionalBookings'] });
    }
  });

  const { mutate: declineRequest } = useMutation({
    mutationFn: (id: string) => bookingService.declineBooking(id),
    onSuccess: () => {
      toast.success('Booking declined');
      queryClient.invalidateQueries({ queryKey: ['professionalBookings'] });
    }
  });

  const incomingRequests = bookings?.filter(b => b.status === 'PENDING') || [];
  const activeDiscussions = bookings?.filter(b => b.status === 'ACCEPTED') || [];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerText}>
          <h2 className={styles.title}>Session Requests</h2>
          <p className={styles.subtitle}>
            Manage incoming consultations and coordinate your harbor's growing schedule. Keep the sanctuary organized.
          </p>
        </div>
        
        <div className={styles.headerStats}>
          <div className={styles.avatarPlaceholder}>JD</div>
        </div>
      </header>

      <section className={styles.grid}>
        
        {/* Column 1: Incoming */}
        <div className={styles.column}>
          <div className={styles.colHeader}>
            <div className={styles.colTitle}>
              <span className={styles.dotBlue}></span>
              <h3>Incoming</h3>
            </div>
            <span className={styles.badge}>{incomingRequests.length}</span>
          </div>

          {isLoading ? (
            <div className={styles.loadingState}>Loading requests...</div>
          ) : incomingRequests.length === 0 ? (
            <div className={styles.emptyState}>No new requests</div>
          ) : (
            incomingRequests.map((request) => (
              <div key={request.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.clientInfo}>
                    {request.clientAvatar ? (
                      <img src={request.clientAvatar} alt={request.clientName} />
                    ) : (
                      <div className={styles.initialsAvatarSmall}>{request.clientName?.[0] || 'U'}</div>
                    )}
                    <div>
                      <h4>{request.clientName || 'Anonymous Member'}</h4>
                      <p>Requested on {new Date(request.proposedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  {request.notes?.includes('Urgent') && <span className={styles.tagUrgent}>Urgent</span>}
                </div>
                <p className={styles.quote}>
                  "{request.notes || 'No notes provided.'}"
                </p>
                <div className={styles.timeBlock}>
                  <span className="material-symbols-outlined">schedule</span>
                  <span>{new Date(request.proposedAt).toLocaleString()}</span>
                </div>
                <div className={styles.actionGrid}>
                  <button className={styles.btnPrimary} onClick={() => acceptRequest(request.id)}>Accept</button>
                  <button className={styles.btnSecondary}>Reschedule</button>
                  <button className={styles.btnGhost} onClick={() => declineRequest(request.id!)}>
                    <span className="material-symbols-outlined">close</span> Decline Request
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Column 2: Active Discussions */}
        <div className={styles.column}>
          <div className={styles.colHeader}>
            <div className={styles.colTitle}>
              <span className={styles.dotPurple}></span>
              <h3>Active Discussions</h3>
            </div>
            <span className={styles.badge}>{activeDiscussions.length}</span>
          </div>

          <div className={styles.activeContainer}>
            {activeDiscussions.length === 0 ? (
              <div className={styles.emptyState}>No active sessions</div>
            ) : (
              activeDiscussions.map((session) => (
                <div key={session.id} className={styles.activeCallCard}>
                  <div className={styles.activeCallHeader}>
                    <div>
                      <h4>Session in Session</h4>
                      <p>With {session.clientName}</p>
                    </div>
                    <div className={styles.videoIcon}>
                      <span className="material-symbols-outlined">videocam</span>
                    </div>
                  </div>
                  <div className={styles.activeCallMeta}>
                    <div className={styles.avatarStack}>
                      {session.clientAvatar && <img src={session.clientAvatar} alt="Client" />}
                      <div className={styles.initialAvatar}>{session.clientName?.[0] || 'U'}</div>
                    </div>
                    <span className={styles.startingSoon}>Started</span>
                  </div>
                  <button className={styles.btnEnter} onClick={() => window.location.href = '/call'}>Enter Harbor</button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 3: Profile Management */}
        <div className={styles.column}>
          <div className={styles.profileCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Professional Profile</h3>
              {!isEditingProfile && (
                <button className={styles.editBtn} onClick={() => {
                  setProfileForm({
                    bio: profile?.bio || '',
                    specialty: profile?.specialty || '',
                    contactPreference: profile?.contactPreference || 'EMAIL'
                  });
                  setIsEditingProfile(true);
                }}>
                  <span className="material-symbols-outlined">edit</span>
                </button>
              )}
            </div>

            {isLoadingProfile ? (
              <p>Loading profile...</p>
            ) : isEditingProfile ? (
              <div className={styles.profileForm}>
                <div className={styles.field}>
                  <label>Specialty</label>
                  <input 
                    value={profileForm.specialty}
                    onChange={e => setProfileForm(f => ({ ...f, specialty: e.target.value }))}
                    placeholder="e.g. Clinical Psychologist"
                  />
                </div>
                <div className={styles.field}>
                  <label>Professional Bio</label>
                  <textarea 
                    value={profileForm.bio}
                    onChange={e => setProfileForm(f => ({ ...f, bio: e.target.value }))}
                    placeholder="Tell members about your approach..."
                  />
                </div>
                <div className={styles.formActions}>
                  <button className={styles.btnGhost} onClick={() => setIsEditingProfile(false)}>Cancel</button>
                  <button 
                    className={styles.btnPrimary} 
                    onClick={() => updateProfile(profileForm)}
                    disabled={isUpdating}
                  >
                    {isUpdating ? 'Saving...' : (profile ? 'Update Profile' : 'Submit Profile')}
                  </button>
                </div>
              </div>
            ) : profile ? (
              <div className={styles.profileDisplay}>
                <div className={styles.statusBadge}>
                  <span className="material-symbols-outlined">verified</span>
                  {profile.isVerified ? 'Verified Professional' : 'Verification Pending'}
                </div>
                <div className={styles.proMeta}>
                  <p className={styles.proSpecialty}>{profile.specialty}</p>
                  <p className={styles.proBio}>{profile.bio}</p>
                </div>
                <button 
                  className={styles.viewPublicBtn}
                  onClick={() => window.location.href = `/directory/${storeUser?.id}`}
                >
                  View Public Profile
                </button>
              </div>
            ) : (
              <div className={styles.emptyProfile}>
                <span className="material-symbols-outlined" style={{fontSize: '3rem', opacity: 0.3}}>account_box</span>
                <p>You haven't set up your professional profile yet.</p>
                <button className={styles.btnPrimary} onClick={() => setIsEditingProfile(true)}>Create Profile</button>
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
};
