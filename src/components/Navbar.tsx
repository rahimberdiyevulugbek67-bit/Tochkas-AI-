import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';
import { 
  Sparkles, 
  Globe, 
  Menu, 
  X, 
  User, 
  ChevronDown, 
  Crown,
  Check
} from 'lucide-react';

interface NavbarProps {
  onMobileMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onMobileMenuToggle, isMobileMenuOpen }) => {
  const { language, setLanguage, t, user, setIsAuthModalOpen, setIsProfileModalOpen } = useApp();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'uz', label: "O'zbekcha", flag: '🇺🇿' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'zh', label: '中文 (简体)', flag: '🇨🇳' },
  ];

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#060B18]/90 backdrop-blur-md border-b border-[#D4AF37]/25 shadow-lg shadow-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Left: Brand Logo & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMobileMenuToggle}
            className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 active:bg-white/10 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-[#D4AF37]" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2.5 cursor-pointer select-none">
            {/* Hexagon Gold Crest */}
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#1C2951] via-[#0B132B] to-[#060B18] border border-[#D4AF37] shadow-md shadow-[#D4AF37]/20">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              <div className="absolute inset-0 rounded-xl bg-[#D4AF37]/10 animate-pulse pointer-events-none" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight bg-gradient-to-r from-amber-100 via-[#F3E5AB] to-[#D4AF37] bg-clip-text text-transparent">
                  {t.appName}
                </span>
                <span className="hidden xs:inline-flex items-center px-1.5 py-0.2 rounded-md bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[10px] font-bold text-amber-300 tracking-wider">
                  AI PRO
                </span>
              </div>
              <p className="hidden md:block text-[10px] text-slate-400 font-medium tracking-wide">
                Universal Artificial Intelligence
              </p>
            </div>
          </div>
        </div>

        {/* Right: Language Switcher & Google Auth / Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0B132B] hover:bg-[#131D3B] border border-[#D4AF37]/30 text-xs text-slate-200 transition-all font-medium cursor-pointer"
              aria-label="Select language"
            >
              <span className="text-sm">{currentLang.flag}</span>
              <span className="hidden sm:inline">{currentLang.label}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isLangDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setIsLangDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-44 rounded-xl bg-[#0B132B] border border-[#D4AF37]/40 shadow-2xl p-1.5 z-40 animate-in fade-in slide-in-from-top-2">
                  <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800 mb-1">
                    Язык интерфейса
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                        language === lang.code
                          ? 'bg-[#D4AF37]/20 text-amber-200 font-semibold'
                          : 'text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{lang.flag}</span>
                        <span>{lang.label}</span>
                      </div>
                      {language === lang.code && <Check className="w-3.5 h-3.5 text-[#D4AF37]" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* User Profile / Google Sign-In Button */}
          {user ? (
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-xl bg-[#0B132B] hover:bg-[#131D3B] border border-[#D4AF37]/50 transition-all group cursor-pointer"
              aria-label="Open profile cabinet"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-7 h-7 rounded-lg object-cover border border-[#D4AF37]/60"
              />
              <div className="hidden sm:block text-left">
                <div className="text-xs font-semibold text-slate-100 flex items-center gap-1 group-hover:text-amber-300 transition-colors">
                  <span>{user.name.split(' ')[0]}</span>
                  <Crown className="w-3 h-3 text-[#D4AF37]" />
                </div>
                <div className="text-[10px] text-slate-400 truncate max-w-[90px]">
                  {user.plan === 'pro' ? 'Pro Plan' : 'Free'}
                </div>
              </div>
            </button>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-slate-950 font-bold text-xs hover:brightness-110 active:scale-[0.98] transition-all shadow-md shadow-[#D4AF37]/20 cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>{t.signInWithGoogle}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
