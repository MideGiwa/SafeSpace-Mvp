import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UpcomingSessions.module.css';

export const UpcomingSessions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      {/* Top Header */}
      <header className={styles.header}>
        <h2 className={styles.pageTitle}>Appointments</h2>
        <div className={styles.headerRight}>
          <div className={styles.searchWrap}>
            <span className="material-symbols-outlined text-outline">search</span>
            <input className={styles.searchInput} placeholder="Search clients or sessions..." type="text" />
          </div>
          <button className={styles.iconBtn}><span className="material-symbols-outlined">notifications</span></button>
          <button className={styles.iconBtn}><span className="material-symbols-outlined">help_outline</span></button>
          <div className={styles.divider}></div>
          <div className={styles.profileSection}>
            <div className={styles.profileInfo}>
              <p className={styles.profileName}>Dr. Sarah Jenkins</p>
              <p className={styles.profileRole}>Clinical Director</p>
            </div>
            <img className={styles.profileImg} src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcG3wtolEhnRXCm4JGmVlZ8MkzYaEhnocQUbn14MxKnbqFru7LjoLIWRmDULqJeGiS3Y3S9zLycuYrY9HgnqLImyK5e6kxZDVZfjW-0ALfC6SCZS0-4TInaHYwgzG96VGN1oT2RbmnJeiJJzWJFJK4mvi-73UiVjtq-ttLvu_xJsB-ZGjqvYzB8RLF601aGpc7CbxxJWphCiOytKtBUeOybFM74zwppiv4k7zLev9WxziGMP4UrebUK9mfcLBR_gZNt3sEkvqd-fcb" alt="Therapist" />
          </div>
        </div>
      </header>

      <main className={styles.mainCanvas}>
        {/* Welcome Section */}
        <section className={styles.welcomeSection}>
          <div>
            <span className={styles.welcomeDate}>Today's Schedule</span>
            <h1 className={styles.welcomeTitle}>Upcoming Sessions</h1>
            <p className={styles.welcomeDesc}>You have 4 sessions scheduled for today. Your first appointment starts in <strong>25 minutes</strong>.</p>
          </div>
          <div className={styles.viewToggles}>
            <div className={styles.toggleInner}>
              <button className={`${styles.toggleBtn} ${styles.toggleActive}`}>List</button>
              <button className={styles.toggleBtn}>Calendar</button>
            </div>
          </div>
        </section>

        {/* Bento Grid */}
        <div className={styles.bentoGrid}>
          {/* Main Column */}
          <div className={styles.mainCol}>
            {/* Immediate Session */}
            <div className={styles.heroCard}>
              <div className={styles.heroDeco}></div>
              <div className={styles.heroContent}>
                <div className={styles.clientInfo}>
                  <div className={styles.clientImgWrap}>
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuChV0TFsmk4Uvc092GejsM8rYo299Yvh9tjhCubomZXN6o9czdYnyxaEBOLmPWuXp_2d-oXqYxPV2k8XJr-AzEN_kGXhlm-XENLYLrecl6lPYPrVMmDwRC_xatDlLA97Npk9rwYMZj5dZbWb5yem-gxo9oF3HCuN-MZlawvw2nuhCcztTRZHacBNx2dZLDR8Oe0amzX5RI95PovlMimYN05GTMgfx2aX2awCnC7edt82UWRQUoKcqMmiGyRzmT9z8afuuDkaUuGGRWT" alt="Elena" />
                    <div className={styles.onlineDot}></div>
                  </div>
                  <div>
                    <div className={styles.clientNameRow}>
                      <h3 className={styles.clientName}>Elena Rodriguez</h3>
                      <span className={styles.tagRecurring}>Recurring</span>
                    </div>
                    <p className={styles.clientType}>
                      <span className="material-symbols-outlined">psychology</span>
                      Anxiety Support • 60 min
                    </p>
                    <div className={styles.clientMeta}>
                      <div className={styles.metaTime}>
                        <span className="material-symbols-outlined">schedule</span> 10:00 AM — 11:00 AM
                      </div>
                      <div className={styles.metaVideo}>
                        <span className="material-symbols-outlined">videocam</span> Video Consultation
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.heroActions}>
                  <button className={styles.btnStart} onClick={() => navigate('/call')}>
                    <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>play_circle</span>
                    Start Session
                  </button>
                  <button className={styles.btnNotes}>View Intake Notes</button>
                </div>
              </div>
            </div>

            {/* Later Today List */}
            <div className={styles.laterListContainer}>
              <h4 className={styles.laterHeader}>Later Today</h4>
              
              <div className={styles.sessionRow}>
                <div className={styles.rowLeft}>
                  <div className={styles.initialsAvatar}>JD</div>
                  <div>
                    <h5 className={styles.rowName}>Jameson Dunst</h5>
                    <p className={styles.rowDesc}>Cognitive Behavioral Therapy • 1:30 PM</p>
                  </div>
                </div>
                <div className={styles.rowRight}>
                  <div className={styles.rowFiles}>
                    <span className="material-symbols-outlined text-sm">attachment</span>
                    <span>2 Files</span>
                  </div>
                  <button className={styles.btnJoin}>Join Call</button>
                </div>
              </div>

              <div className={styles.sessionRow}>
                <div className={styles.rowLeft}>
                  <img className={styles.rowImg} src="https://lh3.googleusercontent.com/aida-public/AB6AXuCawEb6HiQOoQhwFyyXcH6g8K57h8Y5R0LgdfunLGaD2lgokPgWTMs20pcdROy6nt1abWA0vyMqqs3ZfVQRGFnM9a9Csng9qOPrpv9k_jWleI9_QRLnEeygVuQifjwOxpdiUqdKPHIBxOaglb-R28MZHJVUwY8byd27A9dOv4_J_vQ4cOiQu0tMMsZu4r8EDozCIUUv2yZs4MGmdpcTxkwSS2jwNBN-wzHnaoZBXFxcgV_MHXWtjm_Rf-0okI1CMyC_a1EhZ_CevZTK" alt="Marcus" />
                  <div>
                    <h5 className={styles.rowName}>Marcus Chen</h5>
                    <p className={styles.rowDesc}>Relationship Counseling • 3:00 PM</p>
                  </div>
                </div>
                <div className={styles.rowRight}>
                  <div className={styles.rowAlert}>
                    <span className="material-symbols-outlined text-sm">favorite</span>
                    <span>High Support</span>
                  </div>
                  <button className={styles.btnJoin}>Join Call</button>
                </div>
              </div>
              
            </div>
          </div>

          {/* Side Column */}
          <div className={styles.sideCol}>
            {/* Analytics Card */}
            <div className={styles.analyticsCard}>
              <div className={styles.analyticsDeco}>
                <span className="material-symbols-outlined">clinical_notes</span>
              </div>
              <h4 className={styles.acTitle}>Weekly Insights</h4>
              <div className={styles.acBody}>
                <div className={styles.acMainStat}>
                  <p className={styles.acBigNum}>28</p>
                  <p className={styles.acNumLabel}>Total Sessions this week</p>
                </div>
                <div className={styles.acGrid}>
                  <div className={styles.acBox}>
                    <p className={styles.acBoxVal}>94%</p>
                    <p className={styles.acBoxLabel}>Retention</p>
                  </div>
                  <div className={styles.acBox}>
                    <p className={styles.acBoxVal}>12h</p>
                    <p className={styles.acBoxLabel}>Prep Time</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendar Widget */}
            <div className={styles.calendarWidget}>
              <div className={styles.calHeader}>
                <h4>October 2023</h4>
                <div className={styles.calNav}>
                  <button><span className="material-symbols-outlined">chevron_left</span></button>
                  <button><span className="material-symbols-outlined">chevron_right</span></button>
                </div>
              </div>
              <div className={styles.calDays}>
                <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
              </div>
              <div className={styles.calGrid}>
                <span className={styles.calItemMuted}>28</span>
                <span className={styles.calItemMuted}>29</span>
                <span className={styles.calItemMuted}>30</span>
                <span className={styles.calItem}>1</span>
                <span className={styles.calItem}>2</span>
                <span className={styles.calItem}>3</span>
                <span className={styles.calItem}>4</span>
                <span className={styles.calItem}>5</span>
                <span className={styles.calItem}>6</span>
                <span className={styles.calItemActive}>7</span>
                <span className={styles.calItemDot}>8<span></span></span>
                <span className={styles.calItem}>9</span>
                <span className={styles.calItemDot}>10<span></span></span>
                <span className={styles.calItem}>11</span>
              </div>
            </div>

            {/* Focus Areas */}
            <div className={styles.focusAreas}>
              <h4 className={styles.focusTitle}>Focus Areas</h4>
              <div className={styles.focusChips}>
                <span className={styles.chipTertiary}>Feeling Heard</span>
                <span className={styles.chipPrimary}>Crisis Management</span>
                <span className={styles.chipTertiary}>Trauma Recovery</span>
                <span className={styles.chipPrimary}>Youth Counseling</span>
              </div>
            </div>
          </div>
        </div>

      </main>
      
      {/* FAB */}
      <button className={styles.fab}>
        <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>add_comment</span>
      </button>

    </div>
  );
};
