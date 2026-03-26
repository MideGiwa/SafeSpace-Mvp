import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ProfessionalProfile.module.css';

export const ProfessionalProfile: React.FC = () => {
  useParams(); // for tracking
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<number | null>(4);
  const [selectedTime, setSelectedTime] = useState<string | null>('10:30 AM');

  // Hardcode Data for MVP based on prototype
  const pro = {
    name: "Dr. Elena Rodriguez",
    title: "Clinical Psychologist • 12+ Yrs Experience",
    bio: "Specializing in anxiety management, cognitive behavioral therapy, and mindful wellness. Elena focuses on creating a safe, judgment-free space for deep healing and personal growth.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5o_3NPKdYrD3kFhFA5BF1-8qFktiU0xMXlFQYGY7WlvlaekvgYZg0QYPBfoyS7C0tEcxWPUJECMxowuOH74XgDyqOSKFtcIGWpHBQuGRUi8ao4TsbBE3Zy0oyUabH3yoaYVB5EERYTgB8QESBtESbZx7e0A0_yGb0qQ7kVaRfwXEUJ8inek_IU6CNwcfuh7HeHxfp4kLY-IMDWmfxGO4levtKXARirrGIyz-mfU1OUBkrFmPTT-MH-U5jM8G2imu3zxexoVnLsYqG",
    tags: ["Anxiety Recovery", "CBT Specialist", "Mindfulness"],
    tokenCost: 150,
    platformFee: 15
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

  const times = ['09:00 AM', '10:30 AM', '01:00 PM', '03:30 PM'];

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumbs}>
        <span onClick={() => navigate('/directory')} className={styles.bLink}>Specialists</span>
        <span className="material-symbols-outlined">chevron_right</span>
        <span className={styles.bCurrent}>{pro.name}</span>
      </nav>

      <div className={styles.grid}>
        {/* Left Column: Profile & Calendar */}
        <div className={styles.leftCol}>
          <section className={styles.profileSection}>
            <div className={styles.imageWrapper}>
              <div className={styles.imageGlow}></div>
              <img src={pro.image} alt={pro.name} className={styles.profileImg} />
            </div>
            <div className={styles.profileInfo}>
              <h1 className={styles.proName}>{pro.name}</h1>
              <p className={styles.proTitle}>{pro.title}</p>
              <p className={styles.proBio}>{pro.bio}</p>
              <div className={styles.proTags}>
                {pro.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
              </div>
            </div>
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
                Available Times (GMT-5)
              </h3>
              <div className={styles.timeGrid}>
                {times.map(t => (
                  <button 
                    key={t}
                    className={`${styles.timeBtn} ${selectedTime === t ? styles.timeSelected : ''}`}
                    onClick={() => setSelectedTime(t)}
                  >
                    {t}
                  </button>
                ))}
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
              <button className={styles.buyTokensBtn}>
                <span className="material-symbols-outlined">add_circle</span> Buy Tokens
              </button>
            </div>
          </div>

          <div className={styles.summaryCard}>
            <h3 className={styles.summaryTitle}>Session Summary</h3>
            <div className={styles.summaryRows}>
              <div className={styles.sRow}>
                <span>60 min Therapy Session</span>
                <span className={styles.val}>{pro.tokenCost} Tokens</span>
              </div>
              <div className={styles.sRow}>
                <span>Platform Fee</span>
                <span className={styles.val}>{pro.platformFee} Tokens</span>
              </div>
              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Total to Pay</span>
                <div className={styles.totalVals}>
                  <span className={styles.totalTokens}>{pro.tokenCost + pro.platformFee} Tokens</span>
                  <span className={styles.remTokens}>Remaining: {450 - (pro.tokenCost + pro.platformFee)} Tokens</span>
                </div>
              </div>
            </div>

            <div className={styles.guaranteeBox}>
              <span className="material-symbols-outlined">verified_user</span>
              <p>Your booking is covered by the <b>SafeSpace Guarantee</b>. Reschedule for free up to 24 hours before your session.</p>
            </div>

            <button className={styles.confirmBtn} onClick={() => alert('Feature coming soon: Token Payment Hook!')}>
              <span>Confirm & Pay {pro.tokenCost + pro.platformFee} Tokens</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <p className={styles.termsText}>By confirming, you agree to our Terms of Service</p>
          </div>

          <div className={styles.bentoBox}>
            <h4>Why choose Elena?</h4>
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
