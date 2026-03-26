import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './KYC.module.css';

type Step = 'intro' | 'verifying' | 'success';

export const KYC: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>('intro');
  const [idType, setIdType] = useState<'bvn' | 'nin'>('bvn');
  const [idNumber, setIdNumber] = useState('');

  // Auto-advance from verifying to success
  useEffect(() => {
    if (currentStep === 'verifying') {
      const timer = setTimeout(() => {
        setCurrentStep('success');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const handleVerify = () => {
    if (idNumber.length >= 10) {
      setCurrentStep('verifying');
    } else {
      alert('Please enter a valid ID number');
    }
  };

  const renderIntro = () => (
    <div className={styles.introContainer}>
      <div className={styles.heroSection}>
        <h1 className={styles.title}>Secure Identity <br /><span className={styles.titleHighlight}>Verification.</span></h1>
        <p className={styles.subtitle}>
          To maintain the integrity of our professional sanctuary, please provide your government-issued identification. Your data is encrypted and verified through Interswitch systems.
        </p>
      </div>

      <div className={styles.gridContainer}>
        {/* Form Side */}
        <div className={styles.formCard}>
          <label className={styles.label}>Select Identification Type</label>
          <div className={styles.radioGroup}>
            <label className={`${styles.radioCard} ${idType === 'bvn' ? styles.radioActive : ''}`}>
              <input type="radio" name="idType" value="bvn" checked={idType === 'bvn'} onChange={() => setIdType('bvn')} className={styles.srOnly} />
              <div className={styles.radioHeader}>
                <span className="material-symbols-outlined iconPrimary">account_balance</span>
                <div className={`${styles.radioCircle} ${idType === 'bvn' ? styles.circleActive : ''}`}></div>
              </div>
              <h4>BVN</h4>
              <p>Bank Verification Number</p>
            </label>
            <label className={`${styles.radioCard} ${idType === 'nin' ? styles.radioActive : ''}`}>
              <input type="radio" name="idType" value="nin" checked={idType === 'nin'} onChange={() => setIdType('nin')} className={styles.srOnly} />
              <div className={styles.radioHeader}>
                <span className="material-symbols-outlined iconPrimary">fingerprint</span>
                <div className={`${styles.radioCircle} ${idType === 'nin' ? styles.circleActive : ''}`}></div>
              </div>
              <h4>NIN</h4>
              <p>National Identity Number</p>
            </label>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="idNumber">Identification Number</label>
            <div className={styles.inputWrapper}>
              <input 
                id="idNumber"
                type="text" 
                placeholder="Enter 11-digit number" 
                className={styles.input}
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
              />
              <span className="material-symbols-outlined iconLock">lock</span>
            </div>
            <p className={styles.inputNote}>
              <span className="material-symbols-outlined">info</span>
              We will never share this number with third parties or other members.
            </p>
          </div>

          <button className={styles.btnVerify} onClick={handleVerify}>
            Verify My Identity <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>

        {/* Info Side */}
        <div className={styles.infoCol}>
          <div className={styles.securityBadge}>
            <div className={styles.securityBadgeHeader}>
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>security</span>
              <span>Security Protocol</span>
            </div>
            <h3>Institutional Grade Verification</h3>
            <p>Verification is processed in real-time via Interswitch's secure API. Your biometric data remains within the government infrastructure.</p>
            <span className="material-symbols-outlined iconBg">shield</span>
          </div>

          <div className={styles.trustMarkers}>
            <h4>Why verify?</h4>
            <ul>
              <li>
                <div className={styles.trustIcon}><span className="material-symbols-outlined">military_tech</span></div>
                <div>
                  <h5>Professional Status</h5>
                  <p>Unlocks senior leadership tools and restricted groups.</p>
                </div>
              </li>
              <li>
                <div className={styles.trustIcon}><span className="material-symbols-outlined">hub</span></div>
                <div>
                  <h5>Network Integrity</h5>
                  <p>Ensures every profile represents a verified person.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVerifying = () => (
    <div className={styles.verifyingContainer}>
      <div className={styles.pulseLayout}>
        <div className={styles.pulseOuter}></div>
        <div className={styles.pulseInner}>
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
        </div>
        <div className={styles.secureBadge}>
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>lock</span> SECURE
        </div>
      </div>

      <h1 className={styles.verifyTitle}>Verifying with Interswitch...</h1>
      <p className={styles.verifySubtitle}>We are securely connecting to the verification gateway to validate your credentials.</p>

      <div className={styles.progressBarBg}>
        <div className={styles.progressBarFill}></div>
      </div>

      <div className={styles.verifyChips}>
        <div className={styles.chipNeutral}>
          <span className="material-symbols-outlined">timer</span> Usually takes <strong style={{color: 'var(--primary)', marginLeft: '4px'}}>less than 60s</strong>
        </div>
        <div className={styles.chipSuccess}>
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>shield_with_heart</span> Data Encryption Active
        </div>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className={styles.verifyingContainer}>
      <div className={styles.pulseLayout}>
        <div className={`${styles.pulseInner} ${styles.pulseSuccess}`}>
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
        </div>
      </div>
      
      <h1 className={styles.verifyTitle}>Identity Verified!</h1>
      <p className={styles.verifySubtitle}>Your professional profile is now verified. Welcome to the sanctuary.</p>
      
      <div style={{marginTop: '2rem'}}>
        <button className={styles.btnVerify} onClick={() => navigate('/pro-dashboard')}>
          Continue to Dashboard <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.page}>
      <div className={styles.headerBar}>
        <div className={styles.breadcrumbs}>
          <span>Verification Center</span>
          <span className="material-symbols-outlined iconSm">chevron_right</span>
          <strong>Identity Submission</strong>
        </div>
        <div className={styles.activeBadge}>
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>verified_user</span>
          <span>Identity Security Active</span>
        </div>
      </div>

      <main className={styles.mainContent}>
        {currentStep === 'intro' && renderIntro()}
        {currentStep === 'verifying' && renderVerifying()}
        {currentStep === 'success' && renderSuccess()}
      </main>
    </div>
  );
};
