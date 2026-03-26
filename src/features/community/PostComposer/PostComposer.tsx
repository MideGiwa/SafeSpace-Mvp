import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card/Card';
import { Button } from '../../../components/ui/Button/Button';
import styles from './PostComposer.module.css';

export const PostComposer: React.FC = () => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [content, setContent] = useState('');

  return (
    <Card className={styles.composerCard}>
      <div className={styles.inputArea}>
        <div className={styles.avatar}>
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNSAw2uM5OVxGM6tlwlepjzuZspe3_B-dETbW0Vn6OjBsxQRU-3K9BaEkmYKcCxKq9dpYicvLCieB_THhwQOJWifyTtifl2YpG2Y3mZZQPld5Lqa71XwmjeWcUagoiPV1lfh4dJOaxMsmI8MPl1xR8s66aX7K5ejBnYXjIEsuL1XYKnEyfuFVyBK1H5XrzNCvhzRW5SXxcPQyC0haULOlMeY6k49kA7SDuT-rP175m3I5GR7Z3LjtWKzuboaLulQ8E3MahkbGQ3LDd" alt="Me" />
        </div>
        <textarea 
          className={styles.textarea}
          placeholder="What's on your mind today?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className={styles.actionsBar}>
        <div className={styles.toggleGroup}>
          <button 
            className={`${styles.toggleBtn} ${!isAnonymous ? styles.active : ''}`}
            onClick={() => setIsAnonymous(false)}
          >
            Post as Alex
          </button>
          <button 
            className={`${styles.toggleBtn} ${isAnonymous ? styles.active : ''}`}
            onClick={() => setIsAnonymous(true)}
          >
            Anonymously
          </button>
        </div>

        <div className={styles.submitGroup}>
          <button className={styles.iconBtn}>
            <span className="material-symbols-outlined">image</span>
          </button>
          <Button variant="primary" disabled={!content.trim()}>
            Share Moment
          </Button>
        </div>
      </div>
    </Card>
  );
};
