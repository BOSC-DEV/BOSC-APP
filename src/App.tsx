
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from './pages/Index';
import MostWanted from './pages/MostWanted';
import CreateListing from './pages/CreateListing';
import ScammerDetail from './pages/ScammerDetail';
import EditListing from './pages/EditListing';
import NotFound from './pages/NotFound';
import { Toaster } from './components/ui/toaster';
import { Toaster as Sonner } from 'sonner';
import ProfilePage from './pages/ProfilePage';
import UserProfilePage from './pages/UserProfilePage';
import Leaderboard from './pages/Leaderboard';
import MyReportsPage from './pages/MyReportsPage';
import MyBountiesPage from './pages/MyBountiesPage';
import { WalletProvider } from './context/wallet';
import { useIsMobile } from './hooks/use-mobile';

// Create a client
const queryClient = new QueryClient();

function AppContent() {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Only apply custom padding to non-home pages
  const isHomePage = location.pathname === '/';
  const contentPadding = isHomePage 
    ? "pt-20 md:pt-24 py-[8px]" 
    : "pt-16 md:pt-28 pb-[8px]"; // Reduced top padding on mobile from 24 to 16
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className={`flex-grow ${contentPadding}`}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/most-wanted" element={<MostWanted />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/edit-listing/:id" element={<EditListing />} />
          <Route path="/scammer/:id" element={<ScammerDetail />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/:username" element={<UserProfilePage />} />
          <Route path="/user/:walletAddress" element={<UserProfilePage />} />
          <Route path="/my-reports" element={<MyReportsPage />} />
          <Route path="/my-bounties" element={<MyBountiesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Toaster />
      <Sonner position="bottom-center" expand={true} closeButton={true} />
    </div>
  );
}

function App() {
  return (
    <React.StrictMode>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <WalletProvider>
            <Router>
              <AppContent />
            </Router>
          </WalletProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </React.StrictMode>
  );
}

export default App;
