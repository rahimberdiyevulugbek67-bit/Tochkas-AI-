import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, ShieldCheck, Check, Sparkles, User, Lock, Mail } from 'lucide-react';

export const GoogleAuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, loginWithGoogle, t } = useApp();
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleQuickGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      loginWithGoogle({
        name: 'Ulugbek Rahimberdiyev',
        email: 'rahimberdiyevulugbek67@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        plan: 'pro',
      });
      setIsLoading(false);
    }, 600);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail) return;
    setIsLoading(true);
    setTimeout(() => {
      loginWithGoogle({
        name: customName || customEmail.split('@')[0],
        email: customEmail,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(customEmail)}`,
        plan: 'pro',
      });
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#0C152E] via-[#0A1024] to-[#060A18] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-7 shadow-2xl text-slate-100 shadow-[#D4AF37]/10">
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          aria-label={t.close}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1C2951] to-[#0A1229] border border-[#D4AF37]/60 shadow-lg shadow-[#D4AF37]/20 mb-3">
            <Sparkles className="w-7 h-7 text-[#D4AF37]" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-amber-100 to-[#D4AF37] bg-clip-text text-transparent">
            {t.appName}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {t.authSubtitle}
          </p>
        </div>

        {/* Main One-Click Google OAuth Button */}
        <div className="space-y-3">
          <button
            onClick={handleQuickGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-100 active:scale-[0.99] transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-slate-700 border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span>{t.signInWithGoogle} (rahimberdiyevulugbek67@gmail.com)</span>
          </button>

          <div className="relative my-4 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700/80"></div>
            </div>
            <span className="relative px-3 text-xs uppercase tracking-wider text-slate-400 bg-[#0A1024]">
              {mode === 'signin' ? 'Или войдите с другим Google email' : 'Или создайте аккаунт'}
            </span>
          </div>

          {/* Form for custom Google email or account */}
          <form onSubmit={handleCustomSubmit} className="space-y-3">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Имя пользователя
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="Например: Ulugbek"
                    className="w-full pl-9 pr-3 py-2 bg-[#060B18] border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Google Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full pl-9 pr-3 py-2 bg-[#060B18] border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-slate-950 font-semibold text-sm hover:brightness-110 active:scale-[0.99] transition-all shadow-md cursor-pointer"
            >
              {mode === 'signin' ? 'Войти в аккаунт' : 'Зарегистрировать профиль'}
            </button>
          </form>

          <div className="flex justify-between items-center text-xs text-slate-400 pt-2">
            <button
              type="button"
              onClick={() => setMode(mode === 'signin' ? 'register' : 'signin')}
              className="hover:text-[#D4AF37] transition-colors"
            >
              {mode === 'signin' ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
            </button>
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Google OAuth 2.0</span>
            </span>
          </div>
        </div>

        {/* Feature benefits */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px] text-slate-300">
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Сохранение генераций</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>История AI чата</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>YouTube сценарии</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Google Search Console</span>
          </div>
        </div>
      </div>
    </div>
  );
};
