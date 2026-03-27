import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { communityService } from '../../services/communityService';
import { PostComposer } from '../../features/community/PostComposer/PostComposer';
import { PostCard } from '../../features/community/PostCard/PostCard';
import { PostCardSkeleton } from '../../features/community/PostCard/PostCardSkeleton';
import styles from './Community.module.css';

export const Community: React.FC = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: () => communityService.getPosts(1, 20)
  });

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <h2 className={styles.title}>SafeFeed</h2>
        <p className={styles.subtitle}>A sanctuary for shared stories and silent support.</p>
      </header>

      <PostComposer />

      <div className={styles.feed}>
        <AnimatePresence mode="popLayout">
          {isLoading && (
            <motion.div
              key="loading-skeletons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              {[1, 2, 3].map((key) => (
                <PostCardSkeleton key={`skeleton-${key}`} />
              ))}
            </motion.div>
          )}

          {isError && (
            <motion.p 
              key="error-msg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: 'center', margin: '2rem 0', color: 'red' }}
            >
              There was an error loading the feed.
            </motion.p>
          )}
          
          {!isLoading && !isError && data?.data.map((post: any, index: number) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <PostCard
                id={post.id}
                authorName={post.authorName || 'Anonymous Member'}
                authorId={post.authorId}
                authorImage={post.authorImage}
                isAnonymous={post.isAnonymous}
                timeAgo={new Date(post.createdAt).toLocaleDateString()}
                category={post.destination === 'BOARD' ? 'Professional Board' : 'Community Wall'}
                content={post.content}
                initialHugs={post.supportCount || 0}
                commentsCount={post.commentsCount || 0}
              />
            </motion.div>
          ))}

          {!isLoading && !data?.data?.length && (
            <motion.p 
              key="empty-msg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: 'center', margin: '2rem 0', color: 'var(--text-secondary)' }}
            >
              No posts here yet. Be the first to share your moment!
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
