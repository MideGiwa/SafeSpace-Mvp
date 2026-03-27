import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../../stores/useAuthStore';
import { professionalService } from '../../services/professionalService';
import { bookingService } from '../../services/bookingService';
import { toast } from 'sonner';
import styles from './ProfessionalProfile.module.css';

export const ProfessionalProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user: storeUser } = useAuthStore();
  const isOwnProfile = storeUser?.id === id;

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    bio: '',
    specialty: '',
    contactPreference: 'EMAIL'
  });

  const { data: pro, isLoading: loadingPro } = useQuery({
    queryKey: ['professional', id],
    queryFn: () => professionalService.getProfessionalById(id!),
    enabled: !!id
  });

  // Connect Mutation
  const { mutate: connect, isPending: connecting } = useMutation({
    mutationFn: () => professionalService.connect(id!),
    onSuccess: () => {
      toast.success('Connection Request Sent!', {
        description: `You've expressed interest in connecting with ${pro?.user?.pseudonym || 'this specialist'}.`,
      });
    },
    onError: (err: any) => {
      toast.error('Connection Failed', {
        description: err.response?.data?.message || 'Unable to send request.'
      });
    }
  });

  // Update Profile Mutation
  const { mutate: updateProfile, isPending: updating } = useMutation({
    mutationFn: (data: any) => professionalService.updateProfile(data),
    onSuccess: () => {
      toast.success('Profile Updated');
      setIsEditingProfile(false);
      queryClient.invalidateQueries({ queryKey: ['professional', id] });
    },
    onError: (err: any) => {
      toast.error('Update Failed', {
        description: err.response?.data?.message || 'Unable to save changes.'
      });
    }
  });

  const [selectedDate, setSelectedDate] = useState<number | null>(4);
  const [selectedTime, setSelectedTime] = useState<string | null>('10:30 AM');

  const { data: availabilityData, isLoading: isLoadingAvailability } = useQuery({
    queryKey: ['availability', id],
    queryFn: () => bookingService.getProfessionalAvailability(id!),
    enabled: !!id
  });

  const availableTimes = useMemo(() => {
    if (!availabilityData) return ['09:00 AM', '10:30 AM', '01:00 PM', '03:30 PM'];
    const daySlot = availabilityData.find((slot: any) => new Date(slot.date).getDate() === selectedDate);
    return daySlot ? daySlot.times : ['09:00 AM', '10:30 AM', '01:00 PM', '03:30 PM'];
  }, [availabilityData, selectedDate]);

  const { mutate: bookSession, isPending } = useMutation({
    mutationFn: (data: any) => bookingService.createBooking(data),
    onSuccess: () => {
      toast.success('Booking Successful!', {
        description: `Your session has been requested for ${selectedTime}.`,
      });
      navigate('/sessions');
    },
    onError: (error: any) => {
      toast.error('Booking Failed', {
        description: error.response?.data?.message || 'Something went wrong. Please try again.',
      });
    }
  });

  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedTime) {
      toast.warning('Selection Required', {
        description: 'Please select a date and time for your session.',
      });
      return;
    }

    const proposedAt = new Date(2023, 9, selectedDate!, 10).toISOString();
    
    bookSession({
      professionalId: pro?.id || id!,
      proposedAt,
      notes: `Consultation for ${pro?.specialty || 'Wellness'}`
    });
  };

  const dates = [
    { day: 'Mon', num: 1, active: true },
    { day: 'Tue', num: 2, active: true },
    { day: 'Wed', num: 3, active: true },
    { day: 'Thu', num: 4, active: true, featured: true },
    { day: 'Fri', num: 5, active: true },
    { day: 'Sat', num: 6, active: true },
    { day: 'Sun', num: 7, active: false }
  ];

  if (loadingPro) return <div className={styles.page}><p style={{textAlign: 'center', marginTop: '4rem'}}>Waking up Specialist...</p></div>;
  if (!pro) return <div className={styles.page}><p style={{textAlign: 'center', marginTop: '4rem', color: 'red'}}>Specialist not found.</p></div>;

  const proName = pro.user?.pseudonym || pro.specialty;

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumbs}>
        <span onClick={() => navigate('/directory')} className={styles.bLink}>Specialists</span>
        <span className="material-symbols-outlined">chevron_right</span>
        <span className={styles.bCurrent}>{proName}</span>
      </nav>

      <div className={styles.grid}>
        {/* Left Column: Profile & Calendar */}
        <div className={styles.leftCol}>
          <section className={styles.profileSection}>
            <div className={styles.imageWrapper}>
              <div className={styles.imageGlow}></div>
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${pro.userId}`} alt={proName} className={styles.profileImg} />
            </div>
            {isEditingProfile ? (
              <div className={styles.editForm}>
                <input 
                  className={styles.editInput}
                  value={profileForm.specialty}
                  onChange={e => setProfileForm(f => ({ ...f, specialty: e.target.value }))}
                  placeholder="Specialty (e.g. Cognitive Behavioral Therapy)"
                />
                <textarea 
                  className={styles.editTextarea}
                  value={profileForm.bio}
                  onChange={e => setProfileForm(f => ({ ...f, bio: e.target.value }))}
                  placeholder="Describe your practice..."
                />
                <div className={styles.editActions}>
                  <button onClick={() => setIsEditingProfile(false)} className={styles.btnCancel}>Cancel</button>
                  <button 
                    onClick={() => updateProfile(profileForm)} 
                    className={styles.btnSave}
                    disabled={updating}
                  >
                    {updating ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.profileInfo}>
                <div className={styles.nameHeader}>
                  <h1 className={styles.proName}>{proName}</h1>
                  {isOwnProfile && (
                    <button className={styles.editIconBtn} onClick={() => {
                      setProfileForm({ bio: pro.bio, specialty: pro.specialty, contactPreference: pro.contactPreference });
                      setIsEditingProfile(true);
                    }}>
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                  )}
                </div>
                <p className={styles.proTitle}>{pro.specialty} • Quality Care</p>
                <p className={styles.proBio}>{pro.bio || 'Highly dedicated mental health professional committed to your wellness journey.'}</p>
                <div className={styles.proTags}>
                  <span className={styles.tag}>{pro.specialty}</span>
                </div>
              </div>
            )}
          </section>

          <section className={styles.calendarSection}>
            <div className={styles.calHeader}>
              <h2 className={styles.calTitle}>Select a Date</h2>
              <div className={styles.monthSelector}>
                <button><span className="material-symbols-outlined">chevron_left</span></button>
                <span>October 2023</span>
                <button><span className="material-symbols-outlined">chevron_right</span></button>
              </div>
            </div>

            <div className={styles.daysGrid}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                <div key={d} className={styles.dayHeader}>{d}</div>
              ))}
              {/* padding days */}
              <div className={styles.dayOff}>25</div><div className={styles.dayOff}>26</div>
              <div className={styles.dayOff}>27</div><div className={styles.dayOff}>28</div>
              <div className={styles.dayOff}>29</div><div className={styles.dayOff}>30</div>
              
              {dates.map((d) => (
                <button 
                  key={d.num} 
                  className={`${styles.dayBtn} ${!d.active ? styles.dayDisabled : ''} ${selectedDate === d.num ? styles.daySelected : ''} ${d.featured ? styles.dayFeatured : ''}`}
                  onClick={() => d.active && setSelectedDate(d.num)}
                >
                  {d.num}
                </button>
              ))}
            </div>

            <div className={styles.timeSection}>
              <h3 className={styles.timeTitle}>
                <span className="material-symbols-outlined">schedule</span>
                Available Times (GMT+1)
              </h3>
              <div className={styles.timeGrid}>
                {isLoadingAvailability ? (
                  <div className={styles.loadingPulse}>Loading slots...</div>
                ) : (
                  availableTimes.map(t => (
                    <button 
                      key={t}
                      className={`${styles.timeBtn} ${selectedTime === t ? styles.timeSelected : ''}`}
                      onClick={() => setSelectedTime(t)}
                    >
                      {t}
                    </button>
                  ))
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Payment Summary */}
        <div className={styles.rightCol}>
          <div className={styles.tokenCard}>
            <div className={styles.glowOrb}></div>
            <div className={styles.tokenContent}>
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1", fontSize: '3rem', opacity: 0.8}}>toll</span>
              <div>
                <p className={styles.tokenLabel}>Your Token Balance</p>
                <h2 className={styles.tokenAmount}>450</h2>
              </div>
              <button className={styles.buyTokensBtn} onClick={() => navigate('/tokens')}>
                <span className="material-symbols-outlined">add_circle</span> Buy Tokens
              </button>
            </div>
          </div>

          <div className={styles.summaryCard}>
            <h3 className={styles.summaryTitle}>Session Summary</h3>
            <div className={styles.summaryRows}>
              <div className={styles.sRow}>
                <span>60 min Therapy Session</span>
                <span className={styles.val}>150 Tokens</span>
              </div>
              <div className={styles.sRow}>
                <span>Platform Fee</span>
                <span className={styles.val}>15 Tokens</span>
              </div>
              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Total to Pay</span>
                <div className={styles.totalVals}>
                  <span className={styles.totalTokens}>165 Tokens</span>
                  <span className={styles.remTokens}>Remaining: 285 Tokens</span>
                </div>
              </div>
            </div>

            <div className={styles.guaranteeBox}>
              <span className="material-symbols-outlined">verified_user</span>
              <p>Your booking is covered by the <b>SafeSpace Guarantee</b>.</p>
            </div>

            <div className={styles.mainActions}>
              <button 
                className={`${styles.confirmBtn} ${isPending ? styles.btnLoading : ''}`} 
                onClick={handleConfirmBooking}
                disabled={isPending || isOwnProfile}
              >
                {isPending ? 'Processing...' : `Confirm & Pay 165 Tokens`}
              </button>
              
              {!isOwnProfile && (
                <button 
                  className={styles.connectBtn} 
                  onClick={() => connect()}
                  disabled={connecting}
                >
                  <span className="material-symbols-outlined">person_add</span>
                  {connecting ? 'Connecting...' : 'Connect (MVP)'}
                </button>
              )}
            </div>
            <p className={styles.termsText}>By confirming, you agree to our Terms of Service</p>
          </div>

          <div className={styles.bentoBox}>
            <h4>Why choose {proName.split(' ')[1] || proName}?</h4>
            <ul>
              <li><div className={styles.bullet}></div> Direct video/audio support</li>
              <li><div className={styles.bullet}></div> Personalized action plans</li>
              <li><div className={styles.bullet}></div> Encrypted messaging access</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
