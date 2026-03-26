import React, { type ReactNode } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import { NavLink } from 'react-router-dom';
import styles from './AppShell.module.css';

interface AppShellProps {
  children: ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  return (
    <div className={styles.appLayout}>
      <Sidebar />
      <div className={styles.contentWrapper}>
        {/* Top App Bar (Mobile & Tablet mostly, hidden on desktop if desired, but we'll adapt) */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.avatarMobile}>
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKLHPMrIn-jMvVj7UsTLDUyfLdcb0kqZkIuN67e88egirWYUrUK6lVTKh-VMC-TTfQEi3Q0qbmtzvXT78ze2hnYaqz4wzSsYuGgnS-D4upg5WgSZassq38AezTrv7nFjZi5RP6HELYxXnfScNGaTw-jZKn97LgGHH4c2hn2Z5VyUPjUY5Hl30qktOIcSwp8FsNlxWx48AU1VcGvqxb3Tc9X27Aatqj4mAq9Y5BPowefHzYchTsdimwcOxY7m1PiXuPEPD9Htosr0w0" alt="Avatar" />
            </div>
            <h1 className={styles.brandTitleMobile}>SafeSpace</h1>
          </div>
          <div className={styles.headerRight}>
            <button className={styles.iconButton}>
              <span className="material-symbols-outlined">notifications</span>
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className={styles.mainContent}>
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className={styles.bottomNav}>
          <NavLink to="/onboarding" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navItemActive : ''}`}>
            <span className="material-symbols-outlined nav-icon" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
            <span>Home</span>
          </NavLink>
          <NavLink to="/community" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navItemActive : ''}`}>
            <span className="material-symbols-outlined nav-icon">groups</span>
            <span>Community</span>
          </NavLink>
          <NavLink to="/groups" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navItemActive : ''}`}>
            <span className="material-symbols-outlined nav-icon">hub</span>
            <span>Groups</span>
          </NavLink>
          <NavLink to="/directory" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navItemActive : ''}`}>
            <span className="material-symbols-outlined nav-icon">medical_services</span>
            <span>Pros</span>
          </NavLink>
          <NavLink to="/inbox" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navItemActive : ''}`}>
            <span className="material-symbols-outlined nav-icon">mail</span>
            <span>Inbox</span>
          </NavLink>
        </nav>
        
        {/* Global FAB (for Add Post, etc.) */}
        <button className={styles.fab}>
          <span className="material-symbols-outlined">crisis_alert</span>
        </button>
      </div>
    </div>
  );
};
