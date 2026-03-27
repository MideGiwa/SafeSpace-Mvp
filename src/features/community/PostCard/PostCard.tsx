import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../../components/ui/Card/Card';
import { communityService } from '../../../services/communityService';
import styles from './PostCard.module.css';

interface PostCardProps {
  id: string;
  authorName: string;
  authorImage?: string;
  timeAgo: string;
  category: string;
  content: string;
  initialHugs: number;
  commentsCount: number;
  tag?: string;
  isAnonymous?: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({
  id,
  authorName,
  authorImage,
  timeAgo,
  category,
  content,
  initialHugs,
  commentsCount,
  tag,
  isAnonymous = false,
}) => {
  const [hugs, setHugs] = useState(initialHugs);
  const [hasHugged, setHasHugged] = useState(false);

  const handleHug = async () => {
    if (!hasHugged) {
      setHugs(prev => prev + 1);
      setHasHugged(true);
      try {
        await communityService.supportPost(id);
      } catch (err) {
        console.error("Failed to hug post", err);
        setHugs(prev => prev - 1);
        setHasHugged(false);
      }
    }
  };

  return (
    <Card 
      variant={isAnonymous ? "flat" : "elevated"} 
      className={`${styles.postCard} ${isAnonymous ? styles.anonCard : styles.publicCard}`}
    >
      <div className={styles.header}>
        <div className={styles.authorInfo}>
          <div className={`${styles.avatar} ${isAnonymous ? styles.avatarAnon : ''}`}>
            {isAnonymous ? (
              <span className="material-symbols-outlined">visibility_off</span>
            ) : authorImage ? (
              <img src={authorImage} alt={authorName} />
            ) : null}
          </div>
          <div>
            <h4 className={`${styles.authorName} ${isAnonymous ? styles.anonymousName : ''}`}>
              {authorName}
            </h4>
            <span className={styles.metaData}>{timeAgo} • {category}</span>
          </div>
        </div>
        
        {tag && (
          <div className={styles.tag}>
            {tag}
          </div>
        )}
      </div>

      <p className={`${styles.content} ${isAnonymous ? styles.italicContent : ''}`}>
        {content}
      </p>

      <div className={styles.actions}>
        <button 
          className={`${styles.actionBtn} ${hasHugged ? styles.hugged : ''}`} 
          onClick={handleHug}
        >
          <motion.span 
            className="material-symbols-outlined"
            style={{ fontVariationSettings: hasHugged ? "'FILL' 1" : "'FILL' 0" }}
            animate={hasHugged ? { scale: [1, 1.4, 1], filter: ['blur(0px)', 'blur(4px)', 'blur(0px)'] } : {}}
            transition={{ duration: 0.6, type: "spring", stiffness: 300 }}
          >
            favorite
          </motion.span>
          <span className={styles.actionCount}>{hugs} {hasHugged ? 'Hugs' : 'Hugs'}</span>
        </button>

        <button className={styles.actionBtn}>
          <span className="material-symbols-outlined">chat_bubble</span>
          <span className={styles.actionCount}>{commentsCount} Comments</span>
        </button>
      </div>
    </Card>
  );
};
