import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import styles from './VoiceSession.module.css';

export const VoiceSession: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const isProfessional = user?.role === 'PROFESSIONAL';
  
  const [sessionTime, setSessionTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Simple timer logic
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isActive) {
      timer = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleEndSession = () => {
    // In a real app, do cleanup here
    navigate('/home');
  };

  if (!isActive) {
    return (
      <div className={styles.page}>
        <div className={styles.bgEmpathyPulse}></div>
        <div className={styles.waitingContainer}>
          <div className={styles.waitingIcon}>
             <span className="material-symbols-outlined">hourglass_empty</span>
          </div>
          <h2 className={styles.waitingTitle}>
            {isProfessional ? 'Waiting for Client' : 'Waiting for Host'}
          </h2>
          <p className={styles.waitingDesc}>
            {isProfessional 
              ? 'Your private session is ready. Waiting for the client to join the harbor.'
              : 'Dr. Elena Rodriguez\'s session will begin shortly. You are currently in a secure waiting room.'}
          </p>
          <div className={styles.waitingActions}>
              <button className={styles.btnJoin} onClick={() => setIsActive(true)}>
                {isProfessional ? 'Start Session' : 'Mock: Host Admits You'}
              </button>
             <button className={styles.btnLeave} onClick={() => navigate('/home')}>Return Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Background Decorative Element */}
      <div className={styles.bgEmpathyPulse}></div>

      <div className={styles.container}>
        {/* Encryption Badge & Meta Info */}
        <div className={styles.metaSection}>
          <div className={styles.encryptionBadge}>
            <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>lock</span>
            <span>End-to-End Encrypted Session</span>
          </div>
          <div className={styles.proInfo}>
            <h1>{isProfessional ? 'Anonymous Member' : 'Dr. Elena Rodriguez'}</h1>
            <p>{isProfessional ? 'Premium Client' : 'Licensed Clinical Psychologist'}</p>
          </div>
        </div>

        {/* Central Avatar with Pulse */}
        <div className={styles.avatarSection}>
          <div className={styles.pulseRing}></div>
          <div className={`${styles.pulseRing} ${styles.delay1}`}></div>
          <div className={`${styles.pulseRing} ${styles.delay2}`}></div>
          
          <div className={styles.avatarWrapper}>
            <img 
              src={isProfessional 
                ? "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop" 
                : "https://lh3.googleusercontent.com/aida-public/AB6AXuDX49UZAUbxOaqvg6tY6zTR9lLa6ihwcVcW6HL_Tbm8SauOTS7AQtthFyd8rT5m4--BZ1-5vy7ClI5w7V7jRawT8gBBkidVHG61zXvB3HmX1uEsedhRJwJeX_5n4zQtswtha1hxtwsCWj5OiLmkFI-RuvaHfUDVjjOEDdNPbF71yVqS2ltsQ5S8BjRNxxOvr6euxjy09EHb78srmr5E0ZlhNR4NIyv4r4ixujQXIF1VJ7ccMLsTtg35eYtniJH3XeQhxp-iYAkCLUjx"} 
              alt={isProfessional ? "Client" : "Dr. Elena Rodriguez"} 
            />
          </div>

          <div className={styles.timerBadge}>
            <span className={styles.recordingDot}></span>
            <span className={styles.timeText}>{formatTime(sessionTime + 2535)}</span> 
            {/* Added 42 mins (2520s) base offset to match prototype feel */}
          </div>
        </div>

        {/* Secondary Status */}
        <div className={styles.statusSection}>
          <div className={styles.statusItem}>
            <span className="material-symbols-outlined iconPrimary">signal_cellular_alt</span>
            <span>Stable Connection</span>
          </div>
          <div className={styles.statusItem}>
            <span className="material-symbols-outlined iconTertiary" style={{fontVariationSettings: "'FILL' 1"}}>volunteer_activism</span>
            <span>Safe Space Active</span>
          </div>
        </div>
      </div>

      {/* Side Feedback FABs */}
      <div className={styles.sideFabs}>
        <button className={styles.fabHeart}>
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>favorite</span>
        </button>
        <button className={styles.fabThumb}>
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>thumb_up</span>
        </button>
      </div>

      {/* Bottom Control Bar */}
      <footer className={styles.controlBarContainer}>
        <div className={styles.controlBar}>
          <div className={styles.controlGroup}>
            <button className={styles.iconBtn}>
              <span className="material-symbols-outlined">mic</span>
            </button>
            <button className={styles.iconBtn}>
              <span className="material-symbols-outlined">volume_up</span>
            </button>
          </div>
          
          <div className={styles.mainControls}>
            <button className={styles.notesBtn}>
              <span className="material-symbols-outlined">chat</span>
              <span>Session Notes</span>
            </button>
            <button className={styles.endBtn} onClick={handleEndSession}>
              <span className="material-symbols-outlined">call_end</span>
              <span>End Session</span>
            </button>
          </div>

          <div className={styles.controlGroup}>
            <button className={styles.iconBtn}>
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
};
