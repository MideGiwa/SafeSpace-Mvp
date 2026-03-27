import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { communityService } from '../../../services/communityService';
import { useAuthStore } from '../../../stores/useAuthStore';
import { Card } from '../../../components/ui/Card/Card';
import { Button } from '../../../components/ui/Button/Button';
import styles from './PostComposer.module.css';

export const PostComposer: React.FC = () => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [content, setContent] = useState('');
  const user = useAuthStore(state => state.user);
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: (newPost: any) => communityService.createPost(newPost),
    onSuccess: () => {
      setContent('');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error: any) => {
      alert(error?.response?.data?.message || 'Failed to share post. Please try again.');
    }
  });

  const handleSubmit = () => {
    if (!content.trim()) return;

    createPostMutation.mutate({
      content,
      destination: 'WALL', // default to WALL for now
      isAnonymous,
      commentsEnabled: true
    });
  };

  const displayName = user?.pseudonym || user?.firstName || 'User';

  return (
    <Card className={styles.composerCard}>
      <div className={styles.inputArea}>
        <div className={styles.avatar}>
          <span className="material-symbols-outlined" style={{ fontSize: '32px', color: 'var(--text-secondary)' }}>account_circle</span>
        </div>
        <textarea 
          className={styles.textarea}
          placeholder="What's on your mind today?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={createPostMutation.isPending}
        />
      </div>

      <div className={styles.actionsBar}>
        <div className={styles.toggleGroup}>
          <button 
            className={`${styles.toggleBtn} ${!isAnonymous ? styles.active : ''}`}
            onClick={() => setIsAnonymous(false)}
            disabled={createPostMutation.isPending}
          >
            Post as {displayName}
          </button>
          <button 
            className={`${styles.toggleBtn} ${isAnonymous ? styles.active : ''}`}
            onClick={() => setIsAnonymous(true)}
            disabled={createPostMutation.isPending}
          >
            Anonymously
          </button>
        </div>

        <div className={styles.submitGroup}>
          <button className={styles.iconBtn} disabled={createPostMutation.isPending}>
            <span className="material-symbols-outlined">image</span>
          </button>
          {createPostMutation.isPending ? (
             <Button variant="primary" disabled>Sharing...</Button>
          ) : (
            <Button variant="primary" disabled={!content.trim()} onClick={handleSubmit}>
              Share Moment
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
