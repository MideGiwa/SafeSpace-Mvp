import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import styles from './Auth.module.css';

export const Auth: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState<'seeker' | 'professional'>('seeker');
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore(state => state.login);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get('role');
    if (roleParam === 'professional' || roleParam === 'seeker') {
      setRole(roleParam);
      setIsSignUp(true);
    }
  }, [location]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    login(role);
    // If professional, go to pro-dashboard, else go to onboarding
    navigate(role === 'professional' ? '/pro-dashboard' : '/onboarding');
  };

  return (
    <div className={styles.authContainer}>
      
      {/* Left Panel: Value Proposition & Education */}
      <div className={styles.infoPanel}>
        <div className={styles.infoContent}>
          <div className={styles.brandBadge}>SafeSpace</div>
          <h1 className={styles.infoTitle}>
            Your sanctuary for<br />mental wellness.
          </h1>
          <p className={styles.infoSubtitle}>
            SafeSpace is an end-to-end encrypted platform providing clinical and peer support without judgment.
          </p>

          <div className={styles.benefitsGrid}>
            <div className={styles.benefitItem}>
              <span className="material-symbols-outlined iconBlue">verified_user</span>
              <div>
                <h3>Verified Professionals</h3>
                <p>Members gain access to boards of vetted therapists and psychiatric coaches.</p>
              </div>
            </div>
            <div className={styles.benefitItem}>
              <span className="material-symbols-outlined iconPink">forum</span>
              <div>
                <h3>Secure Peer Groups</h3>
                <p>Join encrypted, anonymous communities tailored to your exact journey.</p>
              </div>
            </div>
            <div className={styles.benefitItem}>
              <span className="material-symbols-outlined iconPurple">psychology</span>
              <div>
                <h3>Clinical Insights</h3>
                <p>Track your therapy progress, session history, and well-being through data.</p>
              </div>
            </div>
          </div>

        </div>
        
        {/* Decorative elements */}
        <div className={styles.decoCircle1}></div>
        <div className={styles.decoCircle2}></div>
      </div>

      {/* Right Panel: Auth Form */}
      <div className={styles.formPanel}>
        <div className={styles.formWrapper}>
          
          <div className={styles.formHeader}>
            <button 
              className={!isSignUp ? styles.toggleActive : styles.toggleInactive} 
              onClick={() => setIsSignUp(false)}
            >
              Sign In
            </button>
            <button 
              className={isSignUp ? styles.toggleActive : styles.toggleInactive} 
              onClick={() => setIsSignUp(true)}
            >
              Sign Up
            </button>
          </div>

          <h2 className={styles.formTitle}>
            {isSignUp ? 'Create your SafeSpace' : 'Welcome back'}
          </h2>
          <p className={styles.formDesc}>
            {isSignUp 
              ? 'Join our supportive community today.' 
              : 'Enter your credentials to access your sanctuary.'}
          </p>

          <form className={styles.authForm} onSubmit={handleAuth}>
            
            {isSignUp && (
              <div className={styles.roleSelection}>
                <p className={styles.inputLabel}>I am joining as a:</p>
                <div className={styles.roleButtons}>
                  <button 
                    type="button" 
                    className={role === 'seeker' ? styles.roleBtnActive : styles.roleBtn}
                    onClick={() => setRole('seeker')}
                  >
                    <span className="material-symbols-outlined">person</span> Seeker
                  </button>
                  <button 
                    type="button" 
                    className={role === 'professional' ? styles.roleBtnActive : styles.roleBtn}
                    onClick={() => setRole('professional')}
                  >
                    <span className="material-symbols-outlined">medical_services</span> Professional
                  </button>
                </div>
              </div>
            )}

            <div className={styles.inputGroup}>
              <label>Email Address</label>
              <div className={styles.inputWrap}>
                <span className="material-symbols-outlined">mail</span>
                <input type="email" placeholder="hello@example.com" required />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Password</label>
              <div className={styles.inputWrap}>
                <span className="material-symbols-outlined">lock</span>
                <input type="password" placeholder="••••••••" required />
              </div>
            </div>

            {!isSignUp && (
              <div className={styles.forgotPassword}>
                <a href="#">Forgot password?</a>
              </div>
            )}

            <button type="submit" className={styles.submitBtn}>
              {isSignUp ? 'Create Account' : 'Sign In securely'}
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </form>

        </div>
      </div>
      
    </div>
  );
};
