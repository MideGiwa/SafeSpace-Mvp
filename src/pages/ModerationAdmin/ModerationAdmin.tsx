import React from 'react';
import styles from './ModerationAdmin.module.css';

export const ModerationAdmin: React.FC = () => {
  return (
    <div className={styles.page}>
      
      {/* Top Header Bar */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.pageTitle}>Sanctuary Admin</h1>
          <div className={styles.divider}></div>
          <div className={styles.liveBadge}>
            <span className={styles.pulseInner}></span>
            <span>Live Moderation Active</span>
          </div>
        </div>
        
        <div className={styles.headerRight}>
          <button className={styles.iconBtn}>
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className={styles.iconBtn}>
            <span className="material-symbols-outlined">help_outline</span>
          </button>
          <div className={styles.avatarWrap}>
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWKpU0NttsxJ7frp2meNIGUFbWN1rrJcrluupV8FbChp9yY_n7D6vJNs5c9bpjhngM1WUa1HgFx5wmYD-XIELDc3dAbIeOhhrYtowpahTAv2ZURN-cBwbHiw3um7lgCyT6YRKA4mu9rSsQcrntLhjDYktWnudDBCws6ArFY81pXp65_99xVaCLg_I52A9okFQ8YFtzN--AxsTnOTiJ2NoFxo1jHUvpRVcxFxFxRPAsxMJ24qCERtFhntAYGqRWM244Qkl-wlHRmSRq" alt="Admin" />
          </div>
        </div>
      </header>

      <div className={styles.mainCanvas}>
        {/* Top Grid: Hero Session + Global Actions */}
        <div className={styles.topGrid}>
          
          <div className={styles.activeSessionCard}>
            <div className={styles.sessionCardContent}>
              <span className={styles.cardTag}>Active Session</span>
              <h2 className={styles.sessionTitle}>Grief Support & Healing Circle</h2>
              <p className={styles.sessionHost}>Hosted by Dr. Aris Thorne</p>
            </div>
            
            <div className={styles.sessionCardFooter}>
              <div className={styles.sessionStats}>
                <div>
                  <p className={styles.statLabel}>Members Online</p>
                  <p className={styles.statValue}>42 <span>/ 50 max</span></p>
                </div>
                <div>
                  <p className={styles.statLabel}>Session Duration</p>
                  <p className={`${styles.statValue} ${styles.statMono}`}>00:42:15</p>
                </div>
              </div>
              
              <div className={styles.avatarStack}>
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_viAPHpjLqbS2bhN8AKRjQY1B48tGyXSf5cG_Rb5VM7SKMNAN4MSEQU2Evtj9p1PcCxoFb2b-uJ-opPyZvo5wGGSCctcEIaCPv1Sg_49GUCfu-mIdT2xCkxF2uGrWIqqqfa4p2XM8POX2yQrXwt0U-Gj1SIh-bB1fVrgQKeT7g-jvIW6TJ9iDDOXKkVPlpLqJcT_7Zeb_SjSiyrU3kucqEEqOHIW7HE6A_YfXkNaZOSyj3CPJP9CCagai4OqSYfXlllEMmfzCXRl6" alt="Participant" />
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCP8UEz38issNQXZj_GEdVbeeM_C6pB3wXhNECciAZbVCXUKukuspXY6gnuzB7DYeqvRVYqhk935dZQ5T6SGKyj4XSJ9bDqO28n0JbvrlmJHobV_7X1R7tbCvOSmTWzQAlo3f98KFPUPAXoimTrRERsElvzBEXSa4u-iB-jmPRgF-xxbXE9UOTb9xTf-kQAoy2-qVDKwOLHv6oo1Gkuc3p3lTxFy1gX27iPe_BA7pcZz2UNTDHV9tX7K1LepdN1IWLdez4vKE0gOZnM" alt="Participant" />
                <div className={styles.avatarMore}>+39</div>
              </div>
            </div>
            <div className={styles.cardDeco}></div>
          </div>

          <div className={styles.actionsCard}>
            <h3 className={styles.actionsHeader}>Global Actions</h3>
            <div className={styles.actionsList}>
              <button className={styles.btnAction}>
                <span className="material-symbols-outlined iconPrimary">campaign</span>
                <span>Broadcast Message</span>
              </button>
              <button className={styles.btnAction}>
                <span className="material-symbols-outlined iconTertiary">volume_off</span>
                <span>Mute All Participants</span>
              </button>
              <button className={styles.btnAction}>
                <span className="material-symbols-outlined iconPrimary">list_alt</span>
                <span>Manage Speaker Queue</span>
              </button>
              <button className={styles.btnEndAction}>
                <span className="material-symbols-outlined">cancel</span>
                <span>End Session</span>
              </button>
            </div>
          </div>
          
        </div>

        {/* Middle Grid: Participants + Flags */}
        <div className={styles.middleGrid}>
          
          <div className={styles.participantsCard}>
            <div className={styles.pHeader}>
              <h3 className={styles.pTitle}>Active Participants</h3>
              <div className={styles.pFilters}>
                <button className={styles.pFilterBtn}>Sort by: Activity</button>
                <button className={styles.pFilterIcon}><span className="material-symbols-outlined">filter_list</span></button>
              </div>
            </div>

            <div className={styles.pList}>
              {/* Speaker */}
              <div className={styles.pRow}>
                <div className={styles.pInfo}>
                  <div className={styles.pProfileWrap}>
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgZUnl7oXdvfE-v54zQzSlenbW_jSci-el5bffTjrUZR0_NUWO7piKlez9bV8nQsLbF8GmTXqEWyNr93wd5-tNuq9u6mIo7lyUNTcNdh3TrGs-iyE-lbM_PNENMYmOo0krUon_GeHeNsob_rXdYUcHdjJhtwALtUwGX-nPjllQig0ywpfaglTZ5NQp8hdLZcdVj1Ll4bezkuaRIMS2xx2kK3iMbxkqfwxIesflYMUPzGKRilsujhb_Ff1dUiw0QcTnJfJGTEu5-vEe" alt="Marcus" />
                    <div className={styles.pPulse}></div>
                  </div>
                  <div>
                    <h4>Marcus Chen</h4>
                    <div className={styles.pTags}>
                      <span className={styles.tagSpeaker}>Speaker</span>
                      <span className={styles.pSubtitle}>Speaking for 02:14</span>
                    </div>
                  </div>
                </div>
                <div className={styles.pHoverActions}>
                  <button className={styles.pIconBtn}><span className="material-symbols-outlined">mic_off</span></button>
                  <button className={styles.pIconBtnError}><span className="material-symbols-outlined">report</span></button>
                </div>
              </div>

              {/* Hand Raised */}
              <div className={styles.pRow}>
                <div className={styles.pInfo}>
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDadcfNK-WhuvJLXF2bN1YlLAO5F6gOMBNMKKPa6VsCp2kSRQY91VP5jqg7tnmd6GG3Er4ajPcWV2D-xDUcNZSL5Cz_xGflnmNWY7rvamqJ47vCP9xLU4Op1vmQw_RAMczAz9AbTMWOfdFs3JIy_hTJcgiTCYqR-vb__RNOqbMOYOlRplpQb17fKmodFNo56ei44HHR4bkM4lXPsDWDjmlBEju-ir5QRrZ5Gaks81_nHTstHbjmKAZu74lDLXdR7on9b7ESc0eYVjYl" alt="Elena" className={styles.pImgGrayscale} />
                  <div>
                    <h4 className={styles.pNameMuted}>Elena Rodriguez</h4>
                    <div className={styles.pTags}>
                      <span className={styles.tagListener}>Listener</span>
                      <span className={styles.pSubtitle}>Raised hand <strong>Just now</strong></span>
                    </div>
                  </div>
                </div>
                <div>
                  <button className={styles.pPrimaryBtn}>Invite to Speak</button>
                </div>
              </div>

              {/* Moderator */}
              <div className={styles.pRow}>
                <div className={styles.pInfo}>
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKko_L0bivIDCsTTz8CMVmknGzZ6JpKh7gU-jhrKgyTARV43kmqth2jBiqWTBB0FkACLFF3GfItTpEH2qJHqA3Szfpkbenu3rDaJlkhXCcSw2Cce8ZKOj1_wP8vNKkP1d0NRV6_mEWWQzrurS4iZPR-DgUBctjQwIn9ft39fJ3fXVMIq9CMomvpmiQcGID7NRfWFClg_tfvFQ_dscDMORsp_UmVLM9d6wgctGGKJPGV6vOr01Ime67y8Nkr4SisIUq24bOyOj4ERi2" alt="Simon" className={styles.pImg} />
                  <div>
                    <h4>Dr. Simon K.</h4>
                    <div className={styles.pTags}>
                      <span className={styles.tagModerator}>Moderator</span>
                      <span className={styles.tagSafe}>Verifying logs</span>
                    </div>
                  </div>
                </div>
                <div className={styles.pHoverActions}>
                  <button className={styles.pIconBtn}><span className="material-symbols-outlined">more_horiz</span></button>
                </div>
              </div>

            </div>
            <button className={styles.pViewAll}>View All 42 Participants</button>
          </div>

          <div className={styles.flagsCard}>
            <div className={styles.flagsHeader}>
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1", color: 'var(--error)'}}>warning</span>
              <h3>Urgent Flags</h3>
            </div>
            
            <div className={styles.flagsList}>
              <div className={styles.flagItemError}>
                 <div className={styles.flagTop}>
                   <span className={styles.flagLabelError}>Inappropriate Content</span>
                   <span className={styles.flagTime}>2m ago</span>
                 </div>
                 <p>System detected restricted keywords in Private Chat #04.</p>
                 <div className={styles.flagActions}>
                   <button className={styles.flagBtnPrimary}>Review</button>
                   <button className={styles.flagBtnSecondary}>Dismiss</button>
                 </div>
              </div>

              <div className={styles.flagItemWarn}>
                 <div className={styles.flagTop}>
                   <span className={styles.flagLabelWarn}>Engagement Alert</span>
                   <span className={styles.flagTime}>12m ago</span>
                 </div>
                 <p>Participant Sarah M. has been silent for 20 mins after intensive sharing.</p>
                 <div className={styles.flagActions}>
                   <button className={styles.flagBtnText}>
                     <span className="material-symbols-outlined">favorite</span> Send Private Nudge
                   </button>
                 </div>
              </div>
            </div>

            <div className={styles.sentimentSection}>
              <h4>Space Sentiment</h4>
              <div className={styles.sentimentBar}>
                <div className={styles.sentimentSafe} style={{width: '75%'}}></div>
                <div className={styles.sentimentNeutral} style={{width: '20%'}}></div>
                <div className={styles.sentimentTense} style={{width: '5%'}}></div>
              </div>
              <div className={styles.sentimentLabels}>
                <span className={styles.labelSafe}>75% High Trust</span>
                <span className={styles.labelTense}>Moderate Vigilance</span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Context Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomLeft}>
            <div className={styles.statusBox}>
              <div className={styles.sIconPrimary}><span className="material-symbols-outlined">shield_with_heart</span></div>
              <div>
                <h5>Trust Engine</h5>
                <p>Secure & Encrypted</p>
              </div>
            </div>
            <div className={styles.sDivider}></div>
            <div className={styles.statusBox}>
              <div className={styles.sIconTertiary}><span className="material-symbols-outlined">diversity_3</span></div>
              <div>
                <h5>Safety Level</h5>
                <p>Harbor Tier 3 (High)</p>
              </div>
            </div>
          </div>
          
          <div className={styles.bottomRight}>
            <div className={styles.latency}>
              <h5>System Load</h5>
              <p>Latency: 12ms</p>
            </div>
            <span className="material-symbols-outlined" style={{color: '#10b981'}}>cloud_done</span>
          </div>
        </div>

      </div>
    </div>
  );
};
