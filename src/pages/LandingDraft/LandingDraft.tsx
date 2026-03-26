import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './LandingDraft.module.css';

export const LandingDraft: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      
      {/* Navigation Bar */}
      <motion.nav 
        className={styles.navbar}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className={styles.navBrand}>SafeSpace</div>
        <div className={styles.navLinks}>
           <a href="#features">Features</a>
           <a href="#experts">Experts</a>
           <a href="#community">Community</a>
        </div>
        <div className={styles.navActions}>
           <button className={styles.btnSignIn} onClick={() => navigate('/auth')}>Sign In</button>
           <button className={styles.btnSignUp} onClick={() => navigate('/auth?role=seeker')}>Get Started</button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroGradients}>
           <div className={styles.gradBlue}></div>
           <div className={styles.gradPink}></div>
        </div>
        
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className={styles.badge}>HIPAA Compliant & End-to-End Encrypted</div>
          <h1 className={styles.heroTitle}>
            A safe harbor for your <br/><span className={styles.textGradient}>mental wellness.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Connect with licensed professionals and compassionate peers in a secure, judgment-free environment designed solely for your healing journey.
          </p>
          <div className={styles.heroActions}>
            <button className={styles.btnPrimary} onClick={() => navigate('/auth?role=seeker')}>Start as a Seeker</button>
            <button className={styles.btnSecondary} onClick={() => navigate('/auth?role=professional')}>Join as a Provider <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>arrow_forward</span></button>
          </div>
        </motion.div>
      </section>

      {/* Bento Features Section */}
      <section id="features" className={styles.features}>
         <motion.div 
           initial={{ opacity: 0, y: 20 }} 
           whileInView={{ opacity: 1, y: 0 }} 
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6 }}
           className={styles.sectionHeader}
         >
           <h2>Healing, fully reimagined.</h2>
           <p>Everything you need to navigate your mental health, beautifully integrated into one platform.</p>
         </motion.div>

         <div className={styles.bentoGrid}>
            <motion.div 
              className={styles.bentoLarge} 
              initial={{ y: 50, opacity: 0 }} 
              whileInView={{ y: 0, opacity: 1 }} 
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
               <div className={styles.bentoContentLarge}>
                  <h3>Encrypted Video Sessions</h3>
                  <p>State-of-the-art secure rooms for 1-on-1 therapy or group sessions. Your conversations remain strictly confidential.</p>
                  <button className={styles.bentoLink} onClick={() => navigate('/auth')}>Learn more &rarr;</button>
               </div>
               <div className={styles.vidMockup}>
                 <div className={styles.mockupHeader}>
                   <div className={styles.dotRed}></div><div className={styles.dotYellow}></div><div className={styles.dotGreen}></div>
                 </div>
                 <div className={styles.mockupBody}>
                    <div className={styles.pulsingAvatar}>
                      <span className="material-symbols-outlined">videocam</span>
                    </div>
                 </div>
               </div>
            </motion.div>

            <motion.div 
              className={styles.bentoSmall1} 
              initial={{ y: 50, opacity: 0 }} 
              whileInView={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.2, duration: 0.6 }} 
              viewport={{ once: true }}
            >
               <div className={styles.iconCircleBlue}>
                 <span className="material-symbols-outlined">travel_explore</span>
               </div>
               <h3>Intelligent Matching</h3>
               <p>Our algorithm pairs you with the perfect clinical professional based on your unique emotional fingerprint.</p>
            </motion.div>

            <motion.div 
              className={styles.bentoSmall2} 
              initial={{ y: 50, opacity: 0 }} 
              whileInView={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.3, duration: 0.6 }} 
              viewport={{ once: true }}
            >
               <div className={styles.iconCirclePink}>
                 <span className="material-symbols-outlined">favorite</span>
               </div>
               <h3>Community Driven</h3>
               <p>24/7 access to curated peer-led support groups addressing everything from burnout to new motherhood.</p>
            </motion.div>
         </div>
      </section>

      {/* Experts Marquee Section */}
      <section id="experts" className={styles.expertsSection}>
        <div className={styles.expertTextContainer}>
           <h2>World-class clinical care.</h2>
           <p>Work with top-tier licensed therapists, psychologists, and counselors.</p>
        </div>
        
        <div className={styles.marquee}>
           <div className={styles.marqueeTrack}>
              {/* Expert Cards repeated for infinite scroll effect */}
              {[1,2,3,4,5,6].map((i) => (
                 <div key={i} className={styles.expertCard}>
                    <div className={styles.expertAvatarWrap}>
                      <img src={`https://i.pravatar.cc/150?img=${i+10}`} alt="Expert" />
                    </div>
                    <div className={styles.expertInfo}>
                       <h4>{['Dr. Elena Rossi', 'Marcus Chen, LCSW', 'Sarah Jenkins', 'Dr. David Miller', 'Dr. Lisa Torres', 'James Wong'][i-1]}</h4>
                       <p className={styles.expertRole}>{['Cognitive Specialist', 'Behavioral Counselor', 'Psychiatrist', 'Adolescent Specialist', 'Trauma Counselor', 'Family Therapist'][i-1]}</p>
                    </div>
                 </div>
              ))}
              {/* Duplicate map for seamless looping */}
              {[1,2,3,4,5,6].map((i) => (
                 <div key={i+6} className={styles.expertCard}>
                    <div className={styles.expertAvatarWrap}>
                      <img src={`https://i.pravatar.cc/150?img=${i+10}`} alt="Expert" />
                    </div>
                    <div className={styles.expertInfo}>
                       <h4>{['Dr. Elena Rossi', 'Marcus Chen, LCSW', 'Sarah Jenkins', 'Dr. David Miller', 'Dr. Lisa Torres', 'James Wong'][i-1]}</h4>
                       <p className={styles.expertRole}>{['Cognitive Specialist', 'Behavioral Counselor', 'Psychiatrist', 'Adolescent Specialist', 'Trauma Counselor', 'Family Therapist'][i-1]}</p>
                       <div className={styles.expertRating}>
                         <span className="material-symbols-outlined">star</span> 
                         <span>{[4.9, 5.0, 4.8, 4.9, 5.0, 4.7][i-1]}</span>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* Community / Kindred Harbor Section */}
      <section id="community" className={styles.communitySection}>
         <motion.div 
           initial={{ opacity: 0, y: 20 }} 
           whileInView={{ opacity: 1, y: 0 }} 
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6 }}
           className={styles.sectionHeader}
         >
           <h2>Join Your <span className={styles.tertiaryHigh}>Kindred Harbor.</span></h2>
           <p>Find your tribe in curated peer support groups led by compassionate moderators.</p>
         </motion.div>

         <div className={styles.communityGrid}>
            {/* Big Card */}
            <motion.div 
              className={styles.communityBigCard}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.communityBigImg}></div>
              <div className={styles.communityBigOverlay}>
                <div className={styles.communityTags}>
                  <span className={styles.tagDark}>New Mothers</span>
                  <span className={styles.tagLive}>Live Now <span className={styles.liveIndicator}></span></span>
                </div>
                <h3>The Early Years Support Group</h3>
                <p>Navigating the beautiful chaos of new parenthood. 24/7 active channel. Peer-to-peer sharing, no judgment.</p>
                <button className={styles.btnGlass} onClick={() => navigate('/auth')}>Join Harbor <span className="material-symbols-outlined">arrow_forward</span></button>
              </div>
            </motion.div>

            {/* Small Cards */}
            <div className={styles.communitySmallGrid}>
              <motion.div 
                 className={styles.communitySmallCard1}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className={styles.iconTopWrap}><span className="material-symbols-outlined">work</span></div>
                <h4>Tech Burnout Collective</h4>
                <p>Every Tuesday & Thursday at 8PM</p>
                <div className={styles.cardBottomAction}>
                  <button className={styles.btnSecondarySmall} onClick={() => navigate('/auth')}>Join Queue</button>
                </div>
              </motion.div>

              <motion.div 
                 className={styles.communitySmallCard2}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className={styles.iconTopWrapBlue}><span className="material-symbols-outlined">palette</span></div>
                <h4>Artistic Recovery</h4>
                <p>Healing through creative expression.</p>
                <div className={styles.avatarsRow}>
                  <div className={styles.av} style={{ backgroundImage: 'url(https://i.pravatar.cc/100?img=1)' }} />
                  <div className={styles.av} style={{ backgroundImage: 'url(https://i.pravatar.cc/100?img=2)' }} />
                  <div className={styles.av} style={{ backgroundImage: 'url(https://i.pravatar.cc/100?img=3)' }} />
                  <div className={styles.avMore}>+12</div>
                </div>
              </motion.div>
            </div>
         </div>
      </section>

      {/* CTA Footer */}
      <footer className={styles.ctaFooter}>
         <div className={styles.ctaGlass}>
           <motion.div 
             className={styles.ctaContent}
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
           >
              <h2>You aren't alone.<br/>Let's find your sanctuary.</h2>
              <p>Join thousands of others discovering peace of mind and transforming their lives.</p>
              <div className={styles.ctaActions}>
                <button className={styles.btnPrimaryLarge} onClick={() => navigate('/auth?role=seeker')}>Create Free Account</button>
                <button className={styles.btnSecondaryLarge} onClick={() => navigate('/auth')}>Talk to a Guide</button>
              </div>
           </motion.div>
         </div>
         
         <div className={styles.footerBottomFull}>
            <div className={styles.footerGrid}>
              <div className={styles.footerBrandBlock}>
                <div className={styles.footerBrandHole}>SafeSpace</div>
                <p>The digital harbor for mental wellness and human connection in an encrypted space.</p>
                <div className={styles.socialIcons}>
                   <span className="material-symbols-outlined">share</span>
                   <span className="material-symbols-outlined">pin_drop</span>
                   <span className="material-symbols-outlined">mail</span>
                </div>
              </div>

              <div className={styles.footerLinkCol}>
                <h4>Support</h4>
                <a href="#">Emergency Resources</a>
                <a href="#">Find a Professional</a>
                <a href="#">Join a Session</a>
                <a href="#">Gift a Session</a>
              </div>

              <div className={styles.footerLinkCol}>
                <h4>Platform</h4>
                <a href="#">How it Works</a>
                <a href="#">Safety Standards</a>
                <a href="#">For Providers</a>
                <a href="#">Accessibility</a>
              </div>

              <div className={styles.footerNews}>
                <h4>Newsletter</h4>
                <p>Curated wellness routines directly to your inbox.</p>
                <div className={styles.newsInput}>
                  <input type="email" placeholder="Email address" />
                  <button><span className="material-symbols-outlined">arrow_forward</span></button>
                </div>
              </div>
            </div>
            
            <div className={styles.footerLegalSplit}>
               <div className={styles.brandFooter}>SafeSpace &copy; 2026</div>
               <div className={styles.legalLinks}>
                  <a href="#">Privacy Policy</a>
                  <a href="#">Terms of Service</a>
                  <a href="#" className={styles.emergencyLink}>Emergency Help Line</a>
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
};
