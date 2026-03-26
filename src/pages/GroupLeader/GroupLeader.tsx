import React from 'react';
import styles from './GroupLeader.module.css';

export const GroupLeader: React.FC = () => {
  return (
    <div className={styles.page}>
      
      {/* Top Header Bar */}
      <header className={styles.header}>
        <div className={styles.searchContainer}>
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant">search</span>
          <input 
            className={styles.searchInput} 
            placeholder="Search members, analytics, or messages..." 
            type="text"
          />
        </div>
        
        <div className={styles.headerActions}>
          <button className={styles.actionBtn}>
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className={`${styles.actionBtn} ${styles.supportBtn}`}>
            <span className="material-symbols-outlined">help_outline</span>
            <span className={styles.btnText}>Support</span>
          </button>
          <div className={styles.profileAvatar}>
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBP7rFrPIL5k_OsMcTKVEIM1hFkuNtteQsi-2AOuu14ekRHec4Bte0x-1RZOXAONxDv93dyb-XMDQ0BSVc3Evskl59bP5xE6Zs-IcW_2A_kk6bNOLI-V1jnzwVVoGJQ6eMQcK5I0wo5G8UdsYPen4vrXrca0lNsYgBPVJXGJbOPH0LRNtaKulcyhemCv0WvzMwLoU8jj7leWmtw4I2sK22U7kVSFM6a0VmXOCQGzrXAMtRcXqxC5X__SA_D89UMOfpdTcR8rajNPDfl" alt="Marcus" />
          </div>
        </div>
      </header>

      {/* Main Canvas */}
      <div className={styles.mainCanvas}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h2 className={styles.heroTitle}>Welcome back, Marcus.</h2>
            <p className={styles.heroSubtitle}>
              Your "Resilient Minds" community has seen a <span className={styles.highlight}>12% growth</span> this week. You have 3 pending member requests and an AMA session scheduled for tomorrow.
            </p>
          </div>
          <div className={styles.heroBadge}>
             <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>favorite</span>
             <span>Level 4 Leader</span>
          </div>
        </section>

        {/* Bento Grid */}
        <div className={styles.bentoGrid}>
          
          {/* Analytics Chart */}
          <div className={`${styles.bentoCard} ${styles.cardAnalytics}`}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Engagement Analytics</h3>
              <div className={styles.tabGroup}>
                <span className={styles.tabActive}>Weekly</span>
                <span className={styles.tabInactive}>Monthly</span>
              </div>
            </div>
            
            <div className={styles.chartArea}>
              {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((day, i) => {
                const heights = ['100px','160px','120px','200px','140px','80px','110px'];
                return (
                  <div key={day} className={styles.chartCol}>
                    <div className={styles.chartBar} style={{height: heights[i]}}></div>
                    <span className={styles.chartLabel}>{day}</span>
                  </div>
                );
              })}
            </div>

            <div className={styles.statsGrid}>
              <div className={styles.statBox}>
                <p>Total Members</p>
                <h4>2,842</h4>
              </div>
              <div className={styles.statBox}>
                <p>Active Now</p>
                <h4>156</h4>
              </div>
              <div className={styles.statBox}>
                <p>Avg. Session</p>
                <h4>42m</h4>
              </div>
            </div>
          </div>

          {/* Session Scheduler */}
          <div className={`${styles.bentoCard} ${styles.cardScheduler}`}>
             <div className={styles.schedulerIcon}>
               <span className="material-symbols-outlined">event_upcoming</span>
             </div>
             <div>
               <h3 className={styles.schedTitle}>Upcoming AMA</h3>
               <p className={styles.schedDesc}>"Navigating Career Transitions with Confidence" — Group session with 42 RSVPs.</p>
             </div>
             <div className={styles.schedTimeBox}>
               <div className={styles.schedTimeInner}>
                 <span className="material-symbols-outlined">schedule</span>
                 <span>Tomorrow, 4:00 PM</span>
               </div>
               <span className="material-symbols-outlined">arrow_forward</span>
             </div>
             <button className={styles.schedBtn}>Manage RSVP List</button>
             <div className={styles.schedDeco}></div>
          </div>

          {/* Member Requests */}
          <div className={`${styles.bentoCard} ${styles.cardRequests}`}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Pending Requests</h3>
              <span className={styles.badgeError}>3 New</span>
            </div>
            <div className={styles.requestList}>
              {[
                { name: 'Elena Vance', role: 'Professional Designer', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDonWFZTRO1Ig4T0XM_1Slr-guyuk9Hdy6tWlpeLaulfVILCm9Lud6Si415x_pXL-mWhKORvUEPX5BcmeMNtA-_hf2PgwYR_8VACoEzIwIQTZNPdUFQVQOPJzQxAsQBpCvd2ly3s_sQ2uz9halILnTkwwbu1bPYyeV5CohZl8bP2zA1vuXA1doe-VNIiJXjwbST1pIK7XikZ7J-B16tpDYCCLeEX2mG793Mw8pcdwhVLeD7HbZKpwzOD3DL2Oq4kxxVqkIkEEcP8ZaR' },
                { name: 'Julian Cho', role: 'Student Leader', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2NPwu3DhT1D59h8NjIJd3PX6_tXKrmfgQoyZl81XKE-kscNOaDritx4jtYmEIAmm6rmHvUwmYV7eCfgnT3irSjZvovlAYKYNdQIa38exND6lE-fidYej6qsBpHyfOKAzbWEbd9VGnHABVo6aUGUY602-th34AwLP2AKlzAqNoLPcoWxBLNXt7-xzLZkNOhYl9mOpnjvtnmFvzKaDv0yRwYK88aiV65jZM6_R4vBzMySSmt43CvKf8pMP-MNOfTekswdVKMNymANMk' }
              ].map(req => (
                <div key={req.name} className={styles.requestItem}>
                  <div className={styles.reqProfile}>
                    <img src={req.img} alt={req.name} />
                    <div>
                      <h5>{req.name}</h5>
                      <p>{req.role}</p>
                    </div>
                  </div>
                  <div className={styles.reqActions}>
                     <button className={styles.btnDeny}><span className="material-symbols-outlined">close</span></button>
                     <button className={styles.btnApprove}><span className="material-symbols-outlined">check</span></button>
                  </div>
                </div>
              ))}
              <button className={styles.reqViewAll}>View all requests</button>
            </div>
          </div>

          {/* Community Updates Container */}
          <div className={`${styles.bentoCard} ${styles.cardUpdatesGrid}`}>
            <div className={styles.updateBoxAction}>
              <div className={styles.iconBoxAction}>
                <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>bolt</span>
              </div>
              <h4 className={styles.boxTitle}>Action Needed</h4>
              <p className={styles.boxDesc}>The "Burnout Prevention" thread has 14 unanswered comments. Engaging now could boost score by 4 points.</p>
              <button className={styles.btnLink}>Review Thread <span className="material-symbols-outlined">arrow_forward</span></button>
            </div>
            
            <div className={styles.updateBoxInsights}>
              <div className={styles.insightContent}>
                <div className={styles.iconBoxInsights}>
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>insights</span>
                </div>
                <h4 className={styles.boxTitle}>New Insights</h4>
                <p className={styles.boxDesc}>Your community's peak activity time has shifted from 7 PM to 4 PM this month.</p>
              </div>
              <span className={`material-symbols-outlined ${styles.insightDeco}`}>auto_graph</span>
            </div>
          </div>
        </div>

        {/* Past Sessions List */}
        <section className={styles.pastSessions}>
          <div className={styles.pastHeader}>
            <h3 className={styles.cardTitle}>Past Sessions</h3>
            <button className={styles.btnLink}>View Session History</button>
          </div>
          <div className={styles.pastGrid}>
            {[
              { date: 'Feb 14, 2024', title: 'Finding Your Flow', desc: 'A deep dive into productivity and mental well-being during high-stress weeks.', attended: 82 },
              { date: 'Feb 07, 2024', title: 'Leadership 101', desc: 'How to lead with empathy without sacrificing authority or efficiency.', attended: 114 },
              { date: 'Jan 30, 2024', title: 'Boundaries in the Workplace', desc: 'Techniques for saying \'no\' gracefully to preserve your creative energy.', attended: 65 }
            ].map(session => (
              <div key={session.title} className={styles.pastCard}>
                <div className={styles.pastCardHeader}>
                  <span className={styles.pastDate}>{session.date}</span>
                  <span className={styles.pastBadge}>Completed</span>
                </div>
                <h4 className={styles.pastTitle}>{session.title}</h4>
                <p className={styles.pastDesc}>{session.desc}</p>
                <div className={styles.pastFooter}>
                  <div className={styles.avatars}>
                    <div className={styles.avatarMini}></div>
                    <div className={styles.avatarMini}></div>
                    <div className={styles.avatarMini}></div>
                  </div>
                  <span className={styles.pastCount}>+{session.attended} attended</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Floating Action Badge */}
      <button className={styles.fabChat}>
        <span className="material-symbols-outlined">chat</span>
        <span className={styles.fabStatus}></span>
      </button>

    </div>
  );
};
