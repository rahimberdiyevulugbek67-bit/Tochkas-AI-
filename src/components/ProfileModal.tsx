import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  LogOut, 
  Sparkles, 
  History, 
  Trash2, 
  Calendar, 
  Mail, 
  ShieldCheck, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  MessageSquare, 
  Youtube,
  Crown
} from 'lucide-react';

export const ProfileModal: React.FC = () => {
  const { 
    isProfileModalOpen, 
    setIsProfileModalOpen, 
    user, 
    logout, 
    t,
    chatMessages,
    images,
    videos,
    youtubeItems,
    clearAllHistory
  } = useApp();

  const [activeTab, setActiveTab] = useState<'info' | 'history'>('info');

  if (!isProfileModalOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-gradient-to-b from-[#0C152E] via-[#0A1024] to-[#060A18] border border-[#D4AF37]/40 rounded-2xl p-6 shadow-2xl text-slate-100 shadow-[#D4AF37]/10 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#D4AF37] shadow-md shadow-[#D4AF37]/20"
              />
              <span className="absolute -bottom-1 -right-1 bg-emerald-500 w-3.5 h-3.5 rounded-full border-2 border-[#0A1024]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">{user.name}</h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gradient-to-r from-amber-400 to-[#D4AF37] text-slate-950">
                  <Crown className="w-3 h-3" />
                  {t.badgePro}
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <Mail className="w-3 h-3 text-[#D4AF37]" />
                {user.email}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsProfileModalOpen(false)}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label={t.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-3 mt-4 mb-4 shrink-0">
          <button
            onClick={() => setActiveTab('info')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'info'
                ? 'bg-[#D4AF37] text-slate-950 shadow-md shadow-[#D4AF37]/20'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            Обзор профиля
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'history'
                ? 'bg-[#D4AF37] text-slate-950 shadow-md shadow-[#D4AF37]/20'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>{t.generationHistory}</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px] text-amber-200">
              {chatMessages.length + images.length + videos.length + youtubeItems.length}
            </span>
          </button>
        </div>

        {/* Modal content body */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4">
          {activeTab === 'info' ? (
            <div className="space-y-4">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-white/5 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-xs">Диалоги</span>
                    <MessageSquare className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className="text-xl font-bold text-white">{chatMessages.length}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-xs">Фотографии</span>
                    <ImageIcon className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-xl font-bold text-white">{images.length}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-xs">Видеоролики</span>
                    <VideoIcon className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-xl font-bold text-white">{videos.length}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-xs">YouTube</span>
                    <Youtube className="w-4 h-4 text-rose-400" />
                  </div>
                  <div className="text-xl font-bold text-white">{youtubeItems.length}</div>
                </div>
              </div>

              {/* Account details card */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-950 border border-slate-800 space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Детали учетной записи
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400">{t.userEmail}:</span>
                    <div className="text-slate-200 font-mono mt-0.5">{user.email}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">{t.userPlan}:</span>
                    <div className="text-emerald-400 font-semibold mt-0.5">Tochkas AI Pro (Безлимит)</div>
                  </div>
                  <div>
                    <span className="text-slate-400">{t.userJoined}:</span>
                    <div className="text-slate-200 mt-0.5 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {user.createdAt}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400">Способ входа:</span>
                    <div className="text-slate-200 mt-0.5">Google OAuth 2.0 (Безопасный)</div>
                  </div>
                </div>
              </div>

              {/* Plan Perks */}
              <div className="p-4 rounded-xl bg-[#091024] border border-[#D4AF37]/30">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-xs font-bold text-amber-200">Возможности Pro аккаунта Tochkas AI</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>Доступ к флагманской модели Gemini 3.8 Flash без задержек</li>
                  <li>Генерация высококачественных фото и YouTube превью</li>
                  <li>Голосовой ассистент с мгновенным чтением ответов</li>
                  <li>YouTube Creator Studio со сценариями и CTR аналитикой</li>
                  <li>Google Search Console SEO инструменты и верификация сайта</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Всего записей: {chatMessages.length + images.length + videos.length + youtubeItems.length}
                </span>
                <button
                  onClick={clearAllHistory}
                  className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 px-2 py-1 rounded-lg hover:bg-rose-500/10 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  {t.clearHistory}
                </button>
              </div>

              {/* Chat snippet */}
              {chatMessages.length > 0 && (
                <div className="space-y-2">
                  <h5 className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
                    Последние сообщения AI чата
                  </h5>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                    {chatMessages.slice(-5).map((msg) => (
                      <div key={msg.id} className="p-2.5 rounded-lg bg-white/5 border border-slate-800 text-xs">
                        <span className="font-semibold text-amber-300 capitalize">{msg.role}: </span>
                        <span className="text-slate-300 line-clamp-2">{msg.content}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Images snippet */}
              {images.length > 0 && (
                <div className="space-y-2">
                  <h5 className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
                    Созданные изображения ({images.length})
                  </h5>
                  <div className="grid grid-cols-3 gap-2">
                    {images.slice(0, 6).map((img) => (
                      <div key={img.id} className="relative rounded-lg overflow-hidden border border-slate-800 group">
                        <img src={img.imageUrl} alt={img.prompt} className="w-full h-20 object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 flex flex-col justify-end">
                          <p className="text-[10px] text-white line-clamp-2 leading-tight">{img.prompt}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* YouTube items snippet */}
              {youtubeItems.length > 0 && (
                <div className="space-y-2">
                  <h5 className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Youtube className="w-3.5 h-3.5 text-rose-400" />
                    YouTube материалы ({youtubeItems.length})
                  </h5>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                    {youtubeItems.slice(-4).map((yt) => (
                      <div key={yt.id} className="p-2.5 rounded-lg bg-white/5 border border-slate-800 text-xs">
                        <div className="flex items-center justify-between text-amber-300 font-semibold mb-1">
                          <span className="uppercase text-[10px]">{yt.type}</span>
                          <span className="text-slate-400 text-[10px]">{yt.topic}</span>
                        </div>
                        <p className="text-slate-300 line-clamp-2">{yt.result}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {chatMessages.length === 0 && images.length === 0 && videos.length === 0 && youtubeItems.length === 0 && (
                <div className="text-center py-10 text-slate-400 text-xs">
                  {t.noHistoryYet}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer with logout */}
        <div className="pt-4 mt-2 border-t border-slate-800 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-400">Tochkas AI • Версия 2.4</span>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>{t.signOut}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
