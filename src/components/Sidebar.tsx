import React from 'react';
import { useApp } from '../context/AppContext';
import { ActiveTab } from '../types';
import { 
  MessageSquare, 
  Image as ImageIcon, 
  Video, 
  Mic, 
  Youtube, 
  Box, 
  Search, 
  User, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const { activeTab, setActiveTab, t, user, setIsAuthModalOpen, setIsProfileModalOpen } = useApp();

  const menuItems: { id: ActiveTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'chat', label: t.navChat, icon: MessageSquare },
    { id: 'images', label: t.navImages, icon: ImageIcon, badge: 'HD' },
    { id: 'video', label: t.navVideo, icon: Video, badge: 'VEO' },
    { id: 'voice', label: t.navVoice, icon: Mic, badge: 'LIVE' },
    { id: 'youtube', label: t.navYouTube, icon: Youtube, badge: 'PRO' },
    { id: 'minecraft', label: t.navMinecraft, icon: Box },
    { id: 'seo', label: t.navSEO, icon: Search, badge: 'GSC' },
  ];

  const handleTabClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    onCloseMobile();
  };

  const handleProfileClick = () => {
    if (user) {
      setIsProfileModalOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 md:hidden animate-in fade-in"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-16 left-0 z-30 h-[calc(100vh-4rem)] w-64 bg-gradient-to-b from-[#060B18] via-[#0A1024] to-[#040814] border-r border-[#D4AF37]/20 flex flex-col justify-between p-3.5 transition-transform duration-300 md:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Navigation list */}
        <div className="space-y-1.5 overflow-y-auto pr-1">
          <div className="px-3 py-1.5 text-[10px] font-bold tracking-widest text-[#D4AF37]/80 uppercase">
            Модули Tochkas AI
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#D4AF37]/25 to-[#D4AF37]/10 text-amber-200 border border-[#D4AF37]/60 shadow-lg shadow-[#D4AF37]/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-1.5 rounded-lg ${
                      isActive ? 'bg-[#D4AF37] text-slate-950 shadow-sm' : 'bg-white/5 text-slate-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md ${
                        isActive
                          ? 'bg-[#D4AF37] text-slate-950'
                          : 'bg-white/10 text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer info & Account summary */}
        <div className="pt-3 border-t border-slate-800/80 space-y-2">
          <button
            onClick={handleProfileClick}
            className="w-full flex items-center gap-2.5 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-slate-800 text-left transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1C2951] to-[#0A1229] border border-[#D4AF37]/50 flex items-center justify-center shrink-0">
              {user ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-lg object-cover" />
              ) : (
                <User className="w-4 h-4 text-[#D4AF37]" />
              )}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-semibold text-slate-200 truncate">
                {user ? user.name : t.guestUser}
              </div>
              <div className="text-[10px] text-amber-400 font-medium">
                {user ? 'Управление аккаунтом' : 'Нажмите для входа'}
              </div>
            </div>
          </button>

          <div className="px-2 text-[10px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>Tochkas AI 2.4</span>
            </span>
            <span className="text-emerald-400 font-medium">Онлайн 24/7</span>
          </div>
        </div>
      </aside>
    </>
  );
};
