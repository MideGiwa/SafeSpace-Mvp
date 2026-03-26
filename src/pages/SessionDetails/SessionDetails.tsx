import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SessionDetails.module.css';

export const SessionDetails: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      
      {/* Top Header Placeholder (Normally injected by AppShell) */}
      <header className={styles.topNav}>
         <h1 className={styles.navBrand}>SafeSpace</h1>
         <div className={styles.navLinks}>
           <span className={styles.navLink} onClick={() => navigate('/home')}>Dashboard</span>
           <span className={styles.navLink} onClick={() => navigate('/sessions')}>Appointments</span>
           <span className={styles.navLinkActive}>Session Notes</span>
           <span className={styles.navLink} onClick={() => navigate('/history')}>History</span>
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
            <div className={styles.headerTitles}>
              <div className={styles.encryptedBadge}>
                <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>lock</span>
                <span>End-to-End Encrypted Session</span>
              </div>
              <h1 className={styles.title}>Session Details</h1>
              <p className={styles.subtitle}>Oct 24, 2023 • 2:00 PM — 3:00 PM (60 min)</p>
            </div>
            
            <div className={styles.headerActions}>
              <button className={styles.btnExport}>Export PDF</button>
              <button className={styles.btnSave}>Save Changes</button>
            </div>
          </header>

          <div className={styles.gridContainer}>
            
            {/* Left Sidebar: Profile & Status */}
            <div className={styles.leftCol}>
              <section className={styles.profileCard}>
                <div className={styles.clientAvatar}>
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1RvHyWX9vP2_yS-TA4wmBp-msZ0nTgRgbURzxNjDnTEOGKKUxFkOzljndTy2IWqTyraLcgbinlqKFrPP9QGMfx4S4uFyp-4ehVXDzcdahPbEG7NyDCG1gSz8ls-RNunOZEgEb9wijMpAD1kUxot1igDUskLAdy7L4tIdka1eSvXs0lOgF7tV6TPLBeVALE8BwU7rbemlKNkeEqQgb55Z6ADbEy4RffrMShSzg7kF_CtfpJWLRtIkTZuOAybVqBgBAtmOG71Wwx_aG" alt="Client" />
                </div>
                <div className={styles.clientText}>
                  <h2>Sarah Mitchell</h2>
                  <p>Client since June 2022</p>
                </div>
                
                <div className={styles.statusList}>
                  <div className={styles.statusRow}>
                    <span className={styles.statusLabel}>Status</span>
                    <span className={styles.statusPillSuccess}>Completed</span>
                  </div>
                  <div className={styles.statusRow}>
                    <span className={styles.statusLabel}>Focus</span>
                    <span className={styles.statusPillTertiary}>Anxiety Management</span>
                  </div>
                </div>
              </section>

              <section className={styles.secureCard}>
                <div className={styles.secureIcon}>
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>verified_user</span>
                </div>
                <div>
                  <h3 className={styles.secureTitle}>Secure Channel</h3>
                  <p className={styles.secureDesc}>This session is protected by AES-256 encryption. Only authorized clinical staff can access these notes.</p>
                </div>
              </section>
            </div>

            {/* Center: Editor Canvas */}
            <div className={styles.centerCol}>
              <div className={styles.editorCard}>
                <div className={styles.editorHeader}>
                  <h2>Session Notes</h2>
                  <div className={styles.editorTools}>
                    <button className={styles.toolBtn}><span className="material-symbols-outlined">format_bold</span></button>
                    <button className={styles.toolBtn}><span className="material-symbols-outlined">format_italic</span></button>
                    <button className={styles.toolBtn}><span className="material-symbols-outlined">format_list_bulleted</span></button>
                    <div className={styles.toolDivider}></div>
                    <button className={styles.toolBtn}><span className="material-symbols-outlined">attach_file</span></button>
                  </div>
                </div>
                
                <textarea 
                  className={styles.editorTextarea} 
                  placeholder="Start typing your clinical observations here..."
                ></textarea>
                
                <div className={styles.editorFooter}>
                  <div className={styles.saveStatus}>
                    <span className="material-symbols-outlined text-xs">sync</span>
                    <span>Auto-saved at 2:45 PM</span>
                  </div>
                  <span>842 words</span>
                </div>
              </div>
            </div>

            {/* Right Sidebar: History & Docs */}
            <div className={styles.rightCol}>
              
              {/* History Section */}
              <section className={styles.historySection}>
                <div className={styles.sectionHeader}>
                  <h3>Client History</h3>
                  <span className="material-symbols-outlined iconLink">open_in_new</span>
                </div>
                
                <div className={styles.historyList}>
                  <div className={styles.historyItem}>
                    <div className={styles.hDate}>Oct 17, 2023</div>
                    <div className={styles.hTitle}>Cognitive Reframing Exercises</div>
                    <div className={styles.hMeta}>45 min • Reviewing homework</div>
                  </div>
                  <div className={styles.historyItem}>
                    <div className={styles.hDate}>Oct 10, 2023</div>
                    <div className={styles.hTitle}>Initial Intake Assessment</div>
                    <div className={styles.hMeta}>90 min • Standard baseline</div>
                  </div>
                </div>
              </section>

              {/* Documents Section */}
              <section className={styles.docsSection}>
                <h3 className={styles.sectionHeaderTitle}>Shared Documents</h3>
                <div className={styles.docsList}>
                  <div className={styles.docItem}>
                    <span className="material-symbols-outlined docIconPdf">description</span>
                    <div className={styles.docInfo}>
                      <div className={styles.docName}>Anxiety_Journal_Oct.pdf</div>
                      <div className={styles.docMeta}>Shared yesterday</div>
                    </div>
                  </div>
                  <div className={styles.docItem}>
                    <span className="material-symbols-outlined docIconImg">image</span>
                    <div className={styles.docInfo}>
                      <div className={styles.docName}>Mind_Map_Visualization.jpg</div>
                      <div className={styles.docMeta}>Shared Oct 17</div>
                    </div>
                  </div>
                </div>
                <button className={styles.btnUpload}>
                  <span className="material-symbols-outlined">add</span>
                  <span>Upload Document</span>
                </button>
              </section>

              {/* Insight Chip */}
              <div className={styles.insightBox}>
                <div className={styles.insightHeader}>
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>psychology</span>
                  <h4>Clinical Insight</h4>
                </div>
                <p className={styles.insightDesc}>"Sarah is showing increased resilience during stress-trigger discussions compared to previous sessions."</p>
              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
};
