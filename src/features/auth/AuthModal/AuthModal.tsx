import React, { useState } from 'react';
import { Modal } from '../../../components/ui/Modal/Modal';
import { Button } from '../../../components/ui/Button/Button';
import { Input } from '../../../components/ui/Input/Input';
import styles from './AuthModal.module.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      console.log('AuthModal submitted:', email);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isLogin ? 'Welcome Back' : 'Create Sanctuary'}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input 
          type="email" 
          label="Email Address" 
          placeholder="your@email.com" 
          value={email}
          onChange={e => setEmail(e.target.value)}
          required 
        />
        <Input 
          type="password" 
          label="Password" 
          placeholder="••••••••" 
          value={password}
          onChange={e => setPassword(e.target.value)}
          required 
        />
        
        {!isLogin && (
          <Input type="password" label="Confirm Password" placeholder="••••••••" required />
        )}

        <Button type="submit" variant="primary" fullWidth className={styles.submitBtn}>
          {isLogin ? 'Sign In' : 'Join SafeSpace'}
        </Button>
      </form>

      <div className={styles.toggleText}>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button type="button" className={styles.toggleBtn} onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Sign Up' : 'Log In'}
        </button>
      </div>
    </Modal>
  );
};
