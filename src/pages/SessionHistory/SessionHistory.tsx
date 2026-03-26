import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SessionHistory.module.css';

export const SessionHistory: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>

      {/* Top Header Placeholder */}
      <header className={styles.topNav}>
         <div className={styles.navBrand}>SafeSpace</div>
         <div className={styles.navLinks}>
           <span className={styles.navLink} onClick={() => navigate('/home')}>Dashboard</span>
           <span className={styles.navLink} onClick={() => navigate('/sessions')}>Appointments</span>
           <span className={styles.navLink} onClick={() => navigate('/session-details')}>Session Notes</span>
           <span className={styles.navLinkActive}>History</span>
         </div>
         <div className={styles.navActions}>
           <button className={styles.iconBtn}><span className="material-symbols-outlined">notifications</span></button>
           <button className={styles.iconBtn}><span className="material-symbols-outlined">help_outline</span></button>
           <div className={styles.avatarWrap}>
             <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_-i1MpO6Azw9ck0I6eKJJSliCW9RgfwVClWM54K3ToTO-26iOe3Fl36G31yH2ECXjJ7R14-jy91ga8FHmCzWv0x7Usj8nPwUms2MKgtGHA1koasTgJOcSewR5181nH-PVum5iFiZHX0MjvCzc_445kwVqsEauVFKQJW2iCKgrkQhNw73qytnhkDKevFRJCwCI4qoq8vJpjw-QhmaQPmG34sUJxXnZoJ_gkhqzgtz5zRrhGwh5NjsVyAIaNXHBMPnmNjmwE64X-wSv" alt="Therapist" />
           </div>
         </div>
      </header>

      <main className={styles.mainCanvas}>
        <div className={styles.contentWrap}>
          
          {/* Header Section */}
          <header className={styles.pageHeader}>
            <div>
              <span className={styles.preTitle}>Clinical Records</span>
              <h1 className={styles.title}>Session History</h1>
              <p className={styles.subtitle}>A comprehensive overview of your therapeutic journey and clinical engagements.</p>
            </div>
            
            <div className={styles.headerActions}>
              <button className={styles.btnAction}><span className="material-symbols-outlined">download</span></button>
              <button className={styles.btnAction}><span className="material-symbols-outlined">print</span></button>
            </div>
          </header>

          {/* Filters Grid */}
          <section className={styles.filtersSection}>
            <div className={styles.filterGroup}>
              <label>Search Client</label>
              <div className={styles.inputWrap}>
                <input type="text" placeholder="Enter client name..." />
                <span className="material-symbols-outlined">search</span>
              </div>
            </div>
            <div className={styles.filterGroup}>
              <label>Date Range</label>
              <div className={styles.inputWrap}>
                <input type="date" />
              </div>
            </div>
            <div className={styles.filterGroup}>
              <label>Session Type</label>
              <div className={styles.inputWrap}>
                <select>
                  <option>All Types</option>
                  <option>Individual Therapy</option>
                  <option>Group Session</option>
                  <option>Crisis Intervention</option>
                  <option>Initial Intake</option>
                </select>
              </div>
            </div>
            <div className={styles.filterSubmit}>
              <button className={styles.btnFilter}>Apply Filters</button>
            </div>
          </section>

          {/* Session History Table */}
          <div className={styles.tableCard}>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Client</th>
                    <th>Session Type</th>
                    <th>Duration</th>
                    <th>Status</th>
                    <th className={styles.textRight}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Row 1 */}
                  <tr>
                    <td>
                      <div className={styles.tdDate}>
                        <span className={styles.dateMain}>Oct 24, 2023</span>
                        <span className={styles.dateSub}>02:30 PM</span>
                      </div>
                    </td>
                    <td>
                      <div className={styles.tdClient}>
                        <div className={styles.clientAvatarText}>EM</div>
                        <span className={styles.clientName}>Eleanor Murphy</span>
                      </div>
                    </td>
                    <td><span className={styles.pillTertiary}>Individual Therapy</span></td>
                    <td><span className={styles.tdDuration}>50 mins</span></td>
                    <td>
                      <div className={styles.tdStatus}>
                        <span className={styles.statusDotCompleted}></span>
                        <span>Completed</span>
                      </div>
                    </td>
                    <td className={styles.textRight}>
                      <button className={styles.btnLink} onClick={() => navigate('/session-details')}>View Notes <span className="material-symbols-outlined">arrow_forward</span></button>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr>
                    <td>
                      <div className={styles.tdDate}>
                        <span className={styles.dateMain}>Oct 22, 2023</span>
                        <span className={styles.dateSub}>10:00 AM</span>
                      </div>
                    </td>
                    <td>
                      <div className={styles.tdClient}>
                        <img className={styles.clientImg} src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvkVQFFhSLtmgekYbJoNByAJqJFkP1yHVTqAEkb6FnPjpoBzO3B21LePJc8udHM4HczUNvgsc3Ad_E-BJuf3WbXglq06bu9j4v-_qIZs9Cs82o7Z8mFkOaWanjaUHCy6mCVuBqsWoTHJmkfeGPOHM7t7hpdZSBEwG6SE1aKEa5Yj9yCu1ZWLmz_aRZ5Opg6cA9D8BTWRTkpHBC9bW56tWCOSHXoa4PtpKYwE1b7lrqdcRKi3iRrx9ctwsWzB8_bU57QjJQmigVBbBU" alt="Jameson" />
                        <span className={styles.clientName}>Jameson Reed</span>
                      </div>
                    </td>
                    <td><span className={styles.pillPrimary}>Initial Intake</span></td>
                    <td><span className={styles.tdDuration}>90 mins</span></td>
                    <td>
                      <div className={styles.tdStatus}>
                        <span className={styles.statusDotCompleted}></span>
                        <span>Completed</span>
                      </div>
                    </td>
                    <td className={styles.textRight}>
                      <button className={styles.btnLink} onClick={() => navigate('/session-details')}>View Notes <span className="material-symbols-outlined">arrow_forward</span></button>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr>
                    <td>
                      <div className={styles.tdDate}>
                        <span className={styles.dateMain}>Oct 21, 2023</span>
                        <span className={styles.dateSub}>04:15 PM</span>
                      </div>
                    </td>
                    <td>
                      <div className={styles.tdClient}>
                        <div className={`${styles.clientAvatarText} ${styles.avatarTertiary}`}>SL</div>
                        <span className={styles.clientName}>Sarah Lopez</span>
                      </div>
                    </td>
                    <td><span className={styles.pillTertiary}>Group Session</span></td>
                    <td><span className={styles.tdDuration}>60 mins</span></td>
                    <td>
                      <div className={styles.tdStatus}>
                        <span className={styles.statusDotDraft}></span>
                        <span>Draft Notes</span>
                      </div>
                    </td>
                    <td className={styles.textRight}>
                      <button className={styles.btnLink} onClick={() => navigate('/session-details')}>Resume Draft <span className="material-symbols-outlined">edit</span></button>
                    </td>
                  </tr>
                  
                  {/* Row 4 */}
                  <tr>
                    <td>
                      <div className={styles.tdDate}>
                        <span className={styles.dateMain}>Oct 19, 2023</span>
                        <span className={styles.dateSub}>11:00 AM</span>
                      </div>
                    </td>
                    <td>
                      <div className={styles.tdClient}>
                        <img className={styles.clientImg} src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbC_9wA3S2B6S9oJ7I2IdElRT5mZu56AiOZazKGXsSdPh5Q0Ux8rTA8VJ1-PIUKfUBsGJ8DFYsordxfC3x6oFQc9OLDxupTogJ-3QTpaneooFsVa_pIxgvOK8UVt5pfGOlQLY5Tzlj1hWjgHMPTA4_vR1B2Iqv_aeOg5vOjbXaiUUkZ7K-HAH7Qe0GEQiQhfdK6b7bGr_iLJBpIWhICIk_g7UY6SvJJrRfvci1JYFnXc5gmvN81WMUuf-hkjvl_YjdXBNtw0gtdJli" alt="Maya" />
                        <span className={styles.clientName}>Maya Henderson</span>
                      </div>
                    </td>
                    <td><span className={styles.pillTertiary}>Individual Therapy</span></td>
                    <td><span className={styles.tdDuration}>50 mins</span></td>
                    <td>
                      <div className={styles.tdStatus}>
                        <span className={styles.statusDotCompleted}></span>
                        <span>Completed</span>
                      </div>
                    </td>
                    <td className={styles.textRight}>
                      <button className={styles.btnLink} onClick={() => navigate('/session-details')}>View Notes <span className="material-symbols-outlined">arrow_forward</span></button>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

            <footer className={styles.pagination}>
              <p>Showing <strong>4</strong> of <strong>128</strong> sessions</p>
              <div className={styles.pageControls}>
                <button className={styles.btnPageNav} disabled><span className="material-symbols-outlined">chevron_left</span></button>
                <button className={`${styles.btnPageNum} ${styles.btnPageActive}`}>1</button>
                <button className={styles.btnPageNum}>2</button>
                <button className={styles.btnPageNum}>3</button>
                <button className={styles.btnPageNav}><span className="material-symbols-outlined">chevron_right</span></button>
              </div>
            </footer>
          </div>

          <section className={styles.bottomBento}>
            <div className={styles.bentoPrimary}>
              <span className="material-symbols-outlined">timer</span>
              <p>Total Therapy Hours</p>
              <h4>1,240</h4>
            </div>
            
            <div className={styles.bentoWhite}>
              <span className="material-symbols-outlined iconTertiary">favorite</span>
              <p>Patient Retention</p>
              <h4>94%</h4>
            </div>
            
            <div className={styles.bentoWide}>
              <div className={styles.bentoContent}>
                <p>Practice Insights</p>
                <h4>October has seen a 12% increase in Group Sessions.</h4>
                <button className={styles.btnAnalytics}>View Analytics Report <span className="material-symbols-outlined text-sm">trending_up</span></button>
              </div>
              <div className={styles.bentoDeco}></div>
            </div>
          </section>

        </div>
      </main>
      
      {/* FAB */}
      <button className={styles.fab}>
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>

    </div>
  );
};
