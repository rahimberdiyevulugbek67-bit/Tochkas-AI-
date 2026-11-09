import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { ChatSection } from './components/ChatSection';
import { ImageSection } from './components/ImageSection';
import { VideoSection } from './components/VideoSection';
import { VoiceSection } from './components/VoiceSection';
import { YouTubeSection } from './components/YouTubeSection';
import { MinecraftSection } from './components/MinecraftSection';
import { SeoConsoleSection } from './components/SeoConsoleSection';
import { GoogleAuthModal } from './components/GoogleAuthModal';
import { ProfileModal } from './components/ProfileModal';
import { ToastContainer } from './components/ToastContainer';

const MainLayout: React.FC = () => {
  const { activeTab } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050A18] text-slate-100 flex flex-col font-sans selection:bg-[#D4AF37] selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* View Content */}
        <main className="flex-1 flex flex-col overflow-hidden w-full">
          {activeTab === 'chat' && <ChatSection />}
          {activeTab === 'images' && <ImageSection />}
          {activeTab === 'video' && <VideoSection />}
          {activeTab === 'voice' && <VoiceSection />}
          {activeTab === 'youtube' && <YouTubeSection />}
          {activeTab === 'minecraft' && <MinecraftSection />}
          {activeTab === 'seo' && <SeoConsoleSection />}
        </main>
      </div>

      {/* Modals & Toasts */}
      <GoogleAuthModal />
      <ProfileModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
