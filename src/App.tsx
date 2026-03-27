
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/useAuthStore';

// Layouts
import { AppShell } from './layouts/AppShell/AppShell';
import { PublicLayout } from './layouts/PublicLayout/PublicLayout';

import { LandingDraft } from './pages/LandingDraft/LandingDraft';
import { Community } from './pages/Community/Community';
import { Onboarding } from './pages/Onboarding/Onboarding';
import { Auth } from './pages/Auth/Auth';
import { Directory } from './pages/Directory/Directory';
import { ProfessionalProfile } from './pages/ProfessionalProfile/ProfessionalProfile';
import { Groups } from './pages/Groups/Groups';
import { GroupDetail } from './pages/GroupDetail/GroupDetail';
import { VoiceSession } from './pages/VoiceSession/VoiceSession';
import { ProfessionalDashboard } from './pages/ProfessionalDashboard/ProfessionalDashboard';
import { KYC } from './pages/KYC/KYC';
import { GroupLeader } from './pages/GroupLeader/GroupLeader';
import { ModerationAdmin } from './pages/ModerationAdmin/ModerationAdmin';
import { RoleGuard } from './components/guards/RoleGuard';
import { UpcomingSessions } from './pages/UpcomingSessions/UpcomingSessions';
import { SessionDetails } from './pages/SessionDetails/SessionDetails';
import { SessionHistory } from './pages/SessionHistory/SessionHistory';
import { ComingSoon } from './pages/ComingSoon/ComingSoon';
import { Home } from './pages/Home/Home';
import { Tokens } from './pages/Tokens/Tokens';
import { Profile } from './pages/Profile/Profile';
import { Toaster } from 'sonner';

function App() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <BrowserRouter>
      <Toaster 
        position="top-right" 
        expand={false} 
        richColors 
        closeButton
        toastOptions={{
          style: {
            fontFamily: 'var(--font-body)',
            borderRadius: 'var(--radius-md)',
          },
        }}
      />
      {isAuthenticated ? (
        <AppShell>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/community" element={<Community />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/groups/:id" element={<GroupDetail />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/directory/:id" element={<ProfessionalProfile />} />
            <Route path="/pro-dashboard" element={<ProfessionalDashboard />} />
            <Route 
              path="/kyc" 
              element={
                <RoleGuard allowedRoles={['PROFESSIONAL', 'VERIFIED_PERSON', 'ADMIN']}>
                  <KYC />
                </RoleGuard>
              } 
            />
            <Route path="/call" element={<VoiceSession />} />
            <Route path="/sessions" element={<UpcomingSessions />} />
            <Route path="/session-details" element={<SessionDetails />} />
            <Route path="/history" element={<SessionHistory />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/leader"
              element={
                <RoleGuard allowedRoles={['LEADER', 'ADMIN']}>
                  <GroupLeader />
                </RoleGuard>
              }
            />
            <Route
              path="/admin"
              element={
                <RoleGuard allowedRoles={['ADMIN']}>
                  <ModerationAdmin />
                </RoleGuard>
              }
            />
            <Route path="/inbox" element={<ComingSoon title="Inbox" />} />
            <Route path="/tokens" element={<Tokens />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </AppShell>
      ) : (
        <PublicLayout>
          <Routes>
            <Route path="/" element={<LandingDraft />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PublicLayout>
      )}
    </BrowserRouter>
  );
}

export default App;
