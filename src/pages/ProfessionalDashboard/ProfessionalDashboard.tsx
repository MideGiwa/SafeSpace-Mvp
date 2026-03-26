import React from 'react';
import styles from './ProfessionalDashboard.module.css';

export const ProfessionalDashboard: React.FC = () => {
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
          <div className={styles.earningsBlock}>
            <p className={styles.earningsLabel}>Monthly Earnings</p>
            <p className={styles.earningsAmount}>$12,480.00</p>
          </div>
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoIa1pg84TmV5UlRlC2S7_-XsTHjpLxKfdBEOMsfsXjeSsBpf7GIVFzeVM-Dz9QFEbgdR2o38fV1khF-WVeXMJSArT5ARQJqfsgRDDWMc7YLLD9KmVfu0pn-jUOLQkxiVL6RqfpXcm_Z_PohWOXG_vkTeenHSTynPW8k01pOC8tyPGCeN5ogNo2lk0aGrnLHD4hlmNmitPCYPVX2y-H2aGYpwX-XlGn_z-Y9LLCy_RcceCqC7i36GaWelbY2lvKwuseNrNJ7eqfZtE"
            alt="Pro Avatar" 
            className={styles.avatar} 
          />
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
            <span className={styles.badge}>2</span>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.clientInfo}>
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1wT-ZgBwWga8nVfdCi_2spDeQPHnp1avhuoAz70_zDYtp1D1JQobNP0XWfhgzq_wXs8MpZogyz29lnr_CwnSJVFsrImGTRewJHQPGg0OnMfAHew2uznE4GDuGHBGUhQI_ZvNtmBtrcBwJpGvoWrVtrkYJE5gXqs9y7Yq9bUTTH9IE-3NQG9k4LagNakjHl8mQpNo5N2OhESqP3OuGsmHAemd2sY_2yqn6y9YiaAAqKUX7HfKEAQZt7kojNTQxnigSJVp9vPT01xSC" alt="Client" />
                <div>
                  <h4>Elena Vance</h4>
                  <p>Kindred Member since 2022</p>
                </div>
              </div>
              <span className={styles.tagUrgent}>Urgent</span>
            </div>
            <p className={styles.quote}>
              "Seeking a sanctuary to discuss career transitions and find balance in a high-stress role."
            </p>
            <div className={styles.timeBlock}>
              <span className="material-symbols-outlined">schedule</span>
              <span>Oct 24 • 2:00 PM (45m)</span>
            </div>
            <div className={styles.actionGrid}>
              <button className={styles.btnPrimary}>Accept</button>
              <button className={styles.btnSecondary}>Reschedule</button>
              <button className={styles.btnGhost}>
                <span className="material-symbols-outlined">close</span> Decline Request
              </button>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.clientInfo}>
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuApc-NsYMgiHuxfVGGHFEnxhVWk9B5czEAlvnwyRyYj7oWCuyOg7Vwu4YqyujB6mR-QJfEmGcgg9HkqZCofQfWGJMmtIMWlbnos_HnGPJt4XmbN6VVpzwZt-GpAmijlBFV6ycN1tI3_vsN_RVj7bZTVMGgAVPRkybtZe9jOWIiQx7ty1cRc7SQC67tFb304Y9SFE7W927FLI7hP7bR85dVYeHtQFdcmuW0dbChyUyicGswmNyO8IocuLgaEsj16euZHSHV9jehdIQjb" alt="Client" />
                <div>
                  <h4>Marcus Chen</h4>
                  <p>New Referral</p>
                </div>
              </div>
            </div>
            <div className={styles.timeBlock}>
              <span className="material-symbols-outlined">schedule</span>
              <span>Oct 25 • 10:00 AM (60m)</span>
            </div>
            <div className={styles.actionGrid2}>
              <button className={styles.btnPrimary}>Accept</button>
              <button className={styles.btnSecondary}>Reschedule</button>
            </div>
          </div>
        </div>

        {/* Column 2: Active Discussions */}
        <div className={styles.column}>
          <div className={styles.colHeader}>
            <div className={styles.colTitle}>
              <span className={styles.dotPurple}></span>
              <h3>Active Discussions</h3>
            </div>
            <span className={styles.badge}>2</span>
          </div>

          <div className={styles.activeContainer}>
            <div className={styles.activeCallCard}>
              <div className={styles.activeCallHeader}>
                <div>
                  <h4>Weekly Alignment</h4>
                  <p>With Sarah Jenkins</p>
                </div>
                <div className={styles.videoIcon}>
                  <span className="material-symbols-outlined">videocam</span>
                </div>
              </div>
              <div className={styles.activeCallMeta}>
                <div className={styles.avatarStack}>
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBki9-uDuJvYESxZmdDNl6HmamLXzu5MAOdfkQvfoqF5Ao-kcwNCeuamuIItIPZDJ-YFa_Hius_olQX5_bfmrEc_gXiqtY8vX0jyB9ALplfp4MOh0WRTE8Az0n8uWvN39Mpbtlq1Nl16czavhK0Rxn5Yii3KKyJMKj_9x-e2V9nDGG-NiUtHL7ABTcIJwIi_p3Qv39388d70ZvZhpsNct4WvgFYgUYoCBPGsFQa3YkCt-zyEREBQNRM_LLAR4P5jkYO4iJIAQ9cuOIM" alt="Sarah" />
                  <div className={styles.initialAvatar}>KH</div>
                </div>
                <span className={styles.startingSoon}>Starting in 15m</span>
              </div>
              <button className={styles.btnEnter}>Enter Harbor</button>
            </div>

            <div className={styles.pendingCard}>
              <h5 className={styles.pendingTitle}>Pending Preparation</h5>
              <div className={styles.pendingItem}>
                <div className={styles.pendingIcon}>
                  <span className="material-symbols-outlined">description</span>
                </div>
                <div>
                  <p className={styles.pendingName}>Initial Intake Form</p>
                  <p className={styles.pendingSub}>David Miller • Not started</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Analytics */}
        <div className={styles.column}>
          
          <div className={styles.analyticsCard}>
            <div className={styles.analyticsGlow}></div>
            <h3 className={styles.analyticsTitle}>Earnings Analytics</h3>
            
            <div className={styles.progressSection}>
              <div className={styles.progressHeader}>
                <span>Monthly Target</span>
                <span>$15,000</span>
              </div>
              <div className={styles.progressBarBg}>
                <div className={styles.progressBarFill} style={{ width: '84%' }}></div>
              </div>
            </div>

            <div className={styles.statsGrid}>
              <div>
                <p className={styles.statLabel}>Sessions</p>
                <p className={styles.statValue}>142</p>
              </div>
              <div>
                <p className={styles.statLabel}>Avg Rate</p>
                <p className={styles.statValue}>$185</p>
              </div>
            </div>

            <div className={styles.taxBtn}>
              <span>Download Tax Report</span>
              <span className="material-symbols-outlined">download</span>
            </div>
          </div>

          <div className={styles.historyCard}>
            <h3>Recent History</h3>
            
            <div className={styles.historyList}>
              <div className={styles.historyItem}>
                <div className={styles.historyIconGood}>
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                </div>
                <div className={styles.historyText}>
                  <p>Deep Dive Session</p>
                  <span>Completed • Oct 22</span>
                </div>
                <span className={styles.historyAmtGood}>+$210</span>
              </div>
              
              <div className={styles.historyItem}>
                <div className={styles.historyIconGood}>
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                </div>
                <div className={styles.historyText}>
                  <p>Group Workshop</p>
                  <span>Completed • Oct 21</span>
                </div>
                <span className={styles.historyAmtGood}>+$450</span>
              </div>

              <div className={styles.historyItem}>
                <div className={styles.historyIconBad}>
                  <span className="material-symbols-outlined">cancel</span>
                </div>
                <div className={styles.historyText}>
                  <p>Cancelled Session</p>
                  <span>Nina Sky • Oct 20</span>
                </div>
                <span className={styles.historyAmtBad}>$0</span>
              </div>
            </div>

            <button className={styles.btnLedger}>
              View Full Ledger <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>

        </div>

      </section>
    </div>
  );
};
