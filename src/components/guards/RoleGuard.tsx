import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import type { User } from '../../services/authService';

interface RoleGuardProps {
  /** One or more roles that are permitted to access this route */
  allowedRoles: User['role'][];
  /** Where to redirect if the role check fails. Defaults to '/home' */
  redirectTo?: string;
  children: React.ReactNode;
}

/**
 * Wraps a route and only renders `children` if the logged-in user
 * has one of the `allowedRoles`. Otherwise redirects to `redirectTo`.
 *
 * Usage:
 * ```tsx
 * <Route
 *   path="/admin"
 *   element={
 *     <RoleGuard allowedRoles={['ADMIN']}>
 *       <ModerationAdmin />
 *     </RoleGuard>
 *   }
 * />
 * ```
 */
export const RoleGuard: React.FC<RoleGuardProps> = ({
  allowedRoles,
  redirectTo = '/home',
  children,
}) => {
  const { user, isAuthenticated } = useAuthStore();

  // Not logged in at all — redirect
  if (!isAuthenticated || !user) {
    return <Navigate to={redirectTo} replace />;
  }

  // Role not in the allowed list — redirect
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};
