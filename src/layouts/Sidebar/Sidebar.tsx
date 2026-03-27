import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button/Button';
import { useAuthStore } from '../../stores/useAuthStore';
import { authService } from '../../services/authService';
import styles from './Sidebar.module.css';

export const Sidebar: React.FC = () => {
  const { user, refreshToken, logout } = useAuthStore();
  const navigate = useNavigate();
  
  const initials = user 
    ? (user.firstName?.[0] || '') + (user.lastName?.[0] || '')
    : '';
  
  const displayName = user?.pseudonym || user?.firstName || 'Member';
  const isProfessional = user?.role === 'PROFESSIONAL';

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to log out?')) {
      // 1. Call backend to invalidate refresh token (optional but good practice)
      if (refreshToken) {
        await authService.logout(refreshToken);
      }
      // 2. Clear local state
      logout();
      // 3. Redirect
      navigate('/auth');
    }
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <span className={styles.brandTitle}>SafeSpace</span>
      </div>

      <NavLink to="/profile" className={styles.profileSectionLink}>
        <div className={styles.profileSection}>
          <div className={styles.avatar}>
            {initials ? (
              <span className={styles.avatarInitials}>{initials.toUpperCase()}</span>
            ) : (
              <span className="material-symbols-outlined">person</span>
            )}
          </div>
          <div className={styles.profileInfo}>
            <span className={styles.profileGreeting}>Welcome back,</span>
            <span className={styles.profileName}>{displayName}</span>
          </div>
        </div>
      </NavLink>

      <nav className={styles.navMenu}>
        <NavLink to="/home" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className={styles.navLabel}>Home</span>
        </NavLink>
        
        {!isProfessional && (
          <NavLink to="/community" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
            <span className={styles.navLabel}>Community</span>
          </NavLink>
        )}

        <NavLink to="/groups" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
          <span className={styles.navLabel}>Groups</span>
        </NavLink>

        <NavLink to="/sessions" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>settings_voice</span>
          <span className={styles.navLabel}>Sessions</span>
        </NavLink>

        {!isProfessional && (
          <NavLink to="/directory" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
            <span className={styles.navLabel}>Professionals</span>
          </NavLink>
        )}

      </nav>

      <div className={styles.bottomSection}>
        {!isProfessional && (
          <Button 
            variant="primary" 
            fullWidth 
            className={styles.bookBtn}
            onClick={() => navigate('/directory')}
          >
            Book Session
          </Button>
        )}
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <span className="material-symbols-outlined">logout</span>
          Logout
        </button>
      </div>
    </aside>
  );
};
