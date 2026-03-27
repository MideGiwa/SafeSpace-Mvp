import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '../../components/ui/Button/Button';
import { useAuthStore } from '../../stores/useAuthStore';
import styles from './Sidebar.module.css';

export const Sidebar: React.FC = () => {
  const { user } = useAuthStore();
  
  const initials = user 
    ? (user.firstName?.[0] || '') + (user.lastName?.[0] || '')
    : '';
  
  const displayName = user?.pseudonym || user?.firstName || 'Member';

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
        <NavLink to="/community" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
          <span className={styles.navLabel}>Community</span>
        </NavLink>
        <NavLink to="/groups" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
          <span className={styles.navLabel}>Groups</span>
        </NavLink>
        <NavLink to="/sessions" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>settings_voice</span>
          <span className={styles.navLabel}>Sessions</span>
        </NavLink>
        <NavLink to="/directory" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
          <span className={styles.navLabel}>Professionals</span>
        </NavLink>
        <NavLink to="/tokens" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>toll</span>
          <span className={styles.navLabel}>Tokens</span>
        </NavLink>
      </nav>

      <div className={styles.bottomSection}>
        <Button variant="primary" fullWidth className={styles.bookBtn}>
          Book Session
        </Button>
      </div>
    </aside>
  );
};
