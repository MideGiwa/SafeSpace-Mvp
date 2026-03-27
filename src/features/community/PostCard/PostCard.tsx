import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card } from '../../../components/ui/Card/Card';
import { communityService } from '../../../services/communityService';
import { useAuthStore } from '../../../stores/useAuthStore';
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
  const queryClient = useQueryClient();
  const { isAnonymousMode } = useAuthStore();

  const [hugs, setHugs] = useState(initialHugs);
  const [hasHugged, setHasHugged] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  // ─── Fetch comments only when panel is open ────────────────────
  const { data: comments = [], isLoading: commentsLoading } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => communityService.getComments(id),
    enabled: showComments,
  });

  // ─── Submit comment mutation ────────────────────────────────────
  const { mutate: submitComment, isPending: submitting } = useMutation({
    mutationFn: () =>
      communityService.createComment(id, {
        content: commentText.trim(),
        isAnonymous: isAnonymousMode,
      }),
    onSuccess: () => {
      setCommentText('');
      queryClient.invalidateQueries({ queryKey: ['comments', id] });
    },
    onError: (err) => {
      console.error('Failed to submit comment', err);
    },
  });

  // ─── Hug (support) ─────────────────────────────────────────────
  const handleHug = async () => {
    if (!hasHugged) {
      setHugs(prev => prev + 1);
      setHasHugged(true);
      try {
        await communityService.supportPost(id);
      } catch (err) {
        console.error('Failed to hug post', err);
        setHugs(prev => prev - 1);
        setHasHugged(false);
      }
    }
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || submitting) return;
    submitComment();
  };

  return (
    <Card
      variant={isAnonymous ? 'flat' : 'elevated'}
      className={`${styles.postCard} ${isAnonymous ? styles.anonCard : styles.publicCard}`}
    >
      {/* Header */}
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
        {tag && <div className={styles.tag}>{tag}</div>}
      </div>

      {/* Content */}
      <p className={`${styles.content} ${isAnonymous ? styles.italicContent : ''}`}>
        {content}
      </p>

      {/* Actions */}
      <div className={styles.actions}>
        <button
          className={`${styles.actionBtn} ${hasHugged ? styles.hugged : ''}`}
          onClick={handleHug}
        >
          <motion.span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: hasHugged ? "'FILL' 1" : "'FILL' 0" }}
            animate={hasHugged ? { scale: [1, 1.4, 1] } : {}}
            transition={{ duration: 0.4, type: 'spring' }}
          >
            favorite
          </motion.span>
          <span className={styles.actionCount}>{hugs} Hugs</span>
        </button>

        <button
          className={`${styles.actionBtn} ${showComments ? styles.commentsActive : ''}`}
          onClick={() => setShowComments(p => !p)}
        >
          <span className="material-symbols-outlined">chat_bubble</span>
          <span className={styles.actionCount}>
            {comments.length || commentsCount} Comments
          </span>
        </button>
      </div>

      {/* Comments Panel */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            key="comments-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.commentsPanel}
          >
            <div className={styles.commentsDivider} />

            {/* Existing comments */}
            {commentsLoading && (
              <p className={styles.commentsLoading}>Loading comments…</p>
            )}
            {!commentsLoading && comments.length === 0 && (
              <p className={styles.commentsEmpty}>Be the first to leave a comment.</p>
            )}
            <div className={styles.commentsList}>
              {comments.map((c: any) => (
                <div key={c.id} className={styles.commentItem}>
                  <div className={styles.commentAvatar}>
                    <span className="material-symbols-outlined">
                      {c.isAnonymous ? 'visibility_off' : 'account_circle'}
                    </span>
                  </div>
                  <div className={styles.commentBody}>
                    <span className={styles.commentAuthor}>
                      {c.isAnonymous ? 'Anonymous' : (c.authorName ?? 'Member')}
                    </span>
                    <p className={styles.commentContent}>{c.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* New comment form */}
            <form className={styles.commentForm} onSubmit={handleSubmitComment}>
              <input
                className={styles.commentInput}
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                placeholder="Write a supportive comment…"
                disabled={submitting}
              />
              <button
                type="submit"
                className={styles.commentSubmit}
                disabled={!commentText.trim() || submitting}
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};
