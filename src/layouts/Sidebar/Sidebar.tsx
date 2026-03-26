import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '../../components/ui/Button/Button';
import styles from './Sidebar.module.css';

export const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <span className={styles.brandTitle}>SafeSpace</span>
      </div>

      <div className={styles.profileSection}>
        <div className={styles.avatar}>
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKLHPMrIn-jMvVj7UsTLDUyfLdcb0kqZkIuN67e88egirWYUrUK6lVTKh-VMC-TTfQEi3Q0qbmtzvXT78ze2hnYaqz4wzSsYuGgnS-D4upg5WgSZassq38AezTrv7nFjZi5RP6HELYxXnfScNGaTw-jZKn97LgGHH4c2hn2Z5VyUPjUY5Hl30qktOIcSwp8FsNlxWx48AU1VcGvqxb3Tc9X27Aatqj4mAq9Y5BPowefHzYchTsdimwcOxY7m1PiXuPEPD9Htosr0w0" alt="Profile" />
        </div>
        <div className={styles.profileInfo}>
          <span className={styles.profileGreeting}>Welcome back</span>
          <span className={styles.profileSubtitle}>Your sanctuary is ready</span>
        </div>
      </div>

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
        <NavLink to="/tokens" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>toll</span>
          <span className={styles.navLabel}>Tokens</span>
        </NavLink>
        <NavLink to="/directory" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
          <span className={styles.navLabel}>Professionals</span>
        </NavLink>
        <NavLink to="/leader" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>supervised_user_circle</span>
          <span className={styles.navLabel}>Lead Demo</span>
        </NavLink>
        <NavLink to="/admin" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>admin_panel_settings</span>
          <span className={styles.navLabel}>Admin Demo</span>
        </NavLink>
        <NavLink to="/pro-dashboard" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>health_and_safety</span>
          <span className={styles.navLabel}>Pro Demo</span>
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
