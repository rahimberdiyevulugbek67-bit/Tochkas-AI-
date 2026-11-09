import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Youtube, 
  Sparkles, 
  Flame, 
  Film, 
  FileText, 
  Type, 
  Tag, 
  Image as ImageIcon, 
  Repeat, 
  Copy, 
  Check, 
  Loader2,
  TrendingUp
} from 'lucide-react';

export const YouTubeSection: React.FC = () => {
  const { t, language, addYouTubeItem, showToast } = useApp();

  const [topic, setTopic] = useState('');
  const [activeTool, setActiveTool] = useState<'shorts' | 'long' | 'script' | 'titles' | 'description' | 'thumbnail' | 'continuation'>('shorts');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const tools = [
    { id: 'shorts', label: t.ytShorts, icon: Flame, desc: 'Хуки, сценарии и удержание для Shorts и Reels' },
    { id: 'long', label: t.ytLong, icon: Film, desc: 'Структура, таймкоды и драматургия для роликов 10-20 минут' },
    { id: 'script', label: t.ytScripts, icon: FileText, desc: 'Полнотекстовый сценарий с дикторским текстом' },
    { id: 'titles', label: t.ytTitles, icon: Type, desc: 'Кликбейтные названия с высоким CTR' },
    { id: 'description', label: t.ytDescription, icon: Tag, desc: 'SEO-описание, таймкоды и вирусные теги' },
    { id: 'thumbnail', label: t.ytThumbnails, icon: ImageIcon, desc: 'Композиция, эмоция лица и готовый AI-промпт' },
    { id: 'continuation', label: t.ytContinuation, icon: Repeat, desc: 'Идеи для второй части и плейлиста' },
  ];

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!topic.trim() || isGenerating) return;

    setIsGenerating(true);
    setResult('');

    try {
      const res = await fetch('/api/youtube', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topic.trim(),
          type: activeTool,
          language,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Ошибка генератора YouTube');

      setResult(data.result);
      addYouTubeItem({
        type: activeTool,
        topic: topic.trim(),
        result: data.result,
      });
      showToast('YouTube материалы успешно сгенерированы!', 'success');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Ошибка генератора';
      showToast(message, 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    showToast(t.copied, 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-[#050A18] via-[#081026] to-[#040814] text-slate-100">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-semibold mb-3">
            <Youtube className="w-3.5 h-3.5 text-rose-400" />
            <span>YouTube Creator Pro Studio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t.ytTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            {t.ytSubtitle}
          </p>
        </div>

        {/* Tools Navigator Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {tools.map((item) => {
            const Icon = item.icon;
            const isSelected = activeTool === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTool(item.id as typeof activeTool)}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#D4AF37] to-[#B38728] text-slate-950 border-[#D4AF37] font-bold shadow-lg shadow-[#D4AF37]/20 scale-102'
                    : 'bg-[#0B132B] border-slate-800 text-slate-300 hover:bg-[#121E40] hover:border-slate-700'
                }`}
              >
                <Icon className={`w-5 h-5 ${isSelected ? 'text-slate-950' : 'text-[#D4AF37]'}`} />
                <span className="text-[11px] leading-tight font-semibold line-clamp-1">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Input Form Card */}
        <div className="p-5 sm:p-7 rounded-2xl bg-gradient-to-b from-[#0B142E] to-[#080E24] border border-[#D4AF37]/35 shadow-2xl space-y-5">
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
                  Тема вашего канала или ролика
                </label>
                <span className="text-[11px] text-amber-300 font-medium">
                  {tools.find(t => t.id === activeTool)?.desc}
                </span>
              </div>

              <input
                type="text"
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={t.ytTopicPlaceholder}
                className="w-full p-4 bg-[#050A18] border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
            </div>

            {/* Quick Inspiration Chips */}
            <div className="flex flex-wrap gap-2 text-[11px]">
              <span className="text-slate-400 self-center">Популярные ниши:</span>
              <button
                type="button"
                onClick={() => setTopic('100 дней выживания в мире зомби Minecraft')}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-slate-800 transition-colors"
              >
                ⛏️ 100 дней Minecraft
              </button>
              <button
                type="button"
                onClick={() => setTopic('Топ 10 нейросетей 2026 года которые заменят дизайнеров')}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-slate-800 transition-colors"
              >
                🤖 Топ AI инструментов
              </button>
              <button
                type="button"
                onClick={() => setTopic('Как заработать школьнику на YouTube Shorts без лица')}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-slate-800 transition-colors"
              >
                📱 Заработок на Shorts
              </button>
            </div>

            <button
              type="submit"
              disabled={!topic.trim() || isGenerating}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#B38728] text-slate-950 font-extrabold text-sm tracking-wide hover:brightness-110 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xl shadow-[#D4AF37]/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{t.ytGenerating}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>{t.ytGenerateAction}</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Card */}
        {result && (
          <div className="p-6 rounded-2xl bg-[#091126] border border-[#D4AF37]/50 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-sm">
                <Youtube className="w-4 h-4 text-rose-500" />
                <span>{t.ytResultTitle}: {tools.find(t => t.id === activeTool)?.label}</span>
              </div>

              <button
                onClick={copyResult}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#D4AF37]/15 hover:bg-[#D4AF37]/30 text-amber-200 border border-[#D4AF37]/40 text-xs font-semibold transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? t.copied : t.copy}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#050A18] border border-slate-800/80 text-xs text-slate-200 leading-relaxed whitespace-pre-wrap font-sans max-h-[500px] overflow-y-auto">
              {result}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
