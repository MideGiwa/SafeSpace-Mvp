import React from 'react';
import { PostComposer } from '../../features/community/PostComposer/PostComposer';
import { PostCard } from '../../features/community/PostCard/PostCard';
import { posts } from '../../data/posts';
import styles from './Community.module.css';

export const Community: React.FC = () => {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <h2 className={styles.title}>SafeFeed</h2>
        <p className={styles.subtitle}>A sanctuary for shared stories and silent support.</p>
      </header>

      <PostComposer />

      <div className={styles.feed}>
        {posts.map(post => (
          <PostCard
            key={post.id}
            authorName={post.authorName}
            authorImage={post.authorImage}
            isAnonymous={post.isAnonymous}
            timeAgo={post.timeAgo}
            category={post.category}
            tag={post.tag}
            content={post.content}
            initialHugs={post.initialHugs}
            commentsCount={post.commentsCount}
          />
        ))}
      </div>
    </div>
  );
};
