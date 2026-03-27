import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import { authService } from '../../services/authService';
import styles from './Auth.module.css';

export const Auth: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState<'REGULAR' | 'PROFESSIONAL'>('REGULAR');
  const [isLoading, setIsLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);
  
  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pseudonym, setPseudonym] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const loginAction = useAuthStore(state => state.login);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get('role');
    if (roleParam === 'professional' || roleParam === 'seeker') {
      setRole(roleParam === 'professional' ? 'PROFESSIONAL' : 'REGULAR');
      setIsSignUp(true);
    }
  }, [location]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorInfo(null);

    try {
      let authResponse;
      if (isSignUp) {
        authResponse = await authService.register({
          email,
          password,
          pseudonym,
          role,
          kycStatus: 'PENDING',
          isBanned: false,
          dmOptIn: true
        });
      } else {
        authResponse = await authService.login({ email, password });
      }

      loginAction(authResponse.user, authResponse.access_token, authResponse.refresh_token);
      
      // If professional, go to pro-dashboard, else go to onboarding
      const navTarget = (authResponse.user.role === 'PROFESSIONAL') ? '/pro-dashboard' : '/onboarding';
      navigate(navTarget);
      
    } catch (err: any) {
      setErrorInfo(err.response?.data?.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
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
              type="button"
            >
              Sign In
            </button>
            <button 
              className={isSignUp ? styles.toggleActive : styles.toggleInactive} 
              onClick={() => setIsSignUp(true)}
              type="button"
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
          
          {errorInfo && <div style={{ color: '#d32f2f', marginBottom: '1rem', padding: '0.8rem', backgroundColor: '#ffebe9', borderRadius: '4px', fontSize: '14px' }}>{errorInfo}</div>}

          <form className={styles.authForm} onSubmit={handleAuth}>
            
            {isSignUp && (
              <>
                <div className={styles.roleSelection}>
                  <p className={styles.inputLabel}>I am joining as a:</p>
                  <div className={styles.roleButtons}>
                    <button 
                      type="button" 
                      className={role === 'REGULAR' ? styles.roleBtnActive : styles.roleBtn}
                      onClick={() => setRole('REGULAR')}
                    >
                      <span className="material-symbols-outlined">person</span> Seeker
                    </button>
                    <button 
                      type="button" 
                      className={role === 'PROFESSIONAL' ? styles.roleBtnActive : styles.roleBtn}
                      onClick={() => setRole('PROFESSIONAL')}
                    >
                      <span className="material-symbols-outlined">medical_services</span> Professional
                    </button>
                  </div>
                </div>


                <div className={styles.inputGroup}>
                  <label>Pseudonym (Public Name)</label>
                  <div className={styles.inputWrap}>
                    <span className="material-symbols-outlined">face</span>
                    <input type="text" placeholder="CoolUser" value={pseudonym} onChange={e => setPseudonym(e.target.value)} required />
                  </div>
                </div>
              </>
            )}

            <div className={styles.inputGroup}>
              <label>Email Address</label>
              <div className={styles.inputWrap}>
                <span className="material-symbols-outlined">mail</span>
                <input type="email" placeholder="hello@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Password</label>
              <div className={styles.inputWrap}>
                <span className="material-symbols-outlined">lock</span>
                <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
            </div>

            {!isSignUp && (
              <div className={styles.forgotPassword}>
                <a href="#forgot">Forgot password?</a>
              </div>
            )}

            <button type="submit" className={styles.submitBtn} disabled={isLoading}>
              {isLoading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In securely')}
              <span className="material-symbols-outlined" style={{ display: isLoading ? 'none' : 'inline-block' }}>arrow_forward</span>
            </button>
          </form>

        </div>
      </div>
      
    </div>
  );
};
