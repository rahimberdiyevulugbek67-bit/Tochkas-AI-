import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Box, 
  ShieldAlert, 
  Wrench, 
  Cpu, 
  Layers, 
  Terminal, 
  Sparkles, 
  Send, 
  Loader2, 
  Copy, 
  Check,
  HelpCircle
} from 'lucide-react';

export const MinecraftSection: React.FC = () => {
  const { t, language, showToast } = useApp();

  const [activeCategory, setActiveCategory] = useState<'rules' | 'crafting' | 'redstone' | 'mods' | 'commands'>('rules');
  const [query, setQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [response, setResponse] = useState('');
  const [copied, setCopied] = useState(false);

  const categories = [
    { id: 'rules', label: t.mcSurvivalRules, icon: ShieldAlert, prompt: 'Расскажи исчерпывающие правила выживания первой ночи, защите от мобов, добыче еды и поиску алмазов в Minecraft 1.21' },
    { id: 'crafting', label: t.mcCrafting, icon: Wrench, prompt: 'Приведи рецепты создания верстака, печи, алмазной брони, стола зачарований, маяка и зельеварения' },
    { id: 'redstone', label: t.mcRedstone, icon: Cpu, prompt: 'Объясни основы редстоуна: повторители, компараторы, схемы бесконечных таймеров, авто-печки и ферму тростника' },
    { id: 'mods', label: t.mcModsGuide, icon: Layers, prompt: 'Как установить моды Minecraft? Разница между Fabric, Forge и Neoforge. Рекомендации модов: Create, JEI, JourneyMap, Sodium, Iris' },
    { id: 'commands', label: t.mcCommands, icon: Terminal, prompt: 'Топ самых полезных команд Minecraft для администраторов и креатива: /give, /locate, /effect, /fill, /gamemode' },
  ];

  const handleAsk = async (textToAsk?: string) => {
    const q = (textToAsk || query).trim();
    if (!q || isGenerating) return;

    setIsGenerating(true);
    setResponse('');

    try {
      const res = await fetch('/api/minecraft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          category: activeCategory,
          language,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Ошибка Minecraft AI');

      setResponse(data.result);
      showToast('Ответ эксперта Minecraft получен!', 'success');
      if (!textToAsk) setQuery('');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Ошибка Minecraft AI';
      showToast(message, 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyResponse = () => {
    if (!response) return;
    navigator.clipboard.writeText(response);
    setCopied(true);
    showToast(t.copied, 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-[#050A18] via-[#081026] to-[#040814] text-slate-100">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-semibold mb-3">
            <Box className="w-3.5 h-3.5 text-emerald-400" />
            <span>Minecraft Survival & Modding Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t.mcTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            {t.mcSubtitle}
          </p>
        </div>

        {/* Categories Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id as typeof activeCategory);
                  handleAsk(cat.prompt);
                }}
                className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37] font-bold shadow-lg shadow-[#D4AF37]/20 scale-102'
                    : 'bg-[#0B132B] border-slate-800 text-slate-300 hover:bg-[#121E40] hover:border-slate-700'
                }`}
              >
                <Icon className={`w-5 h-5 ${isSelected ? 'text-slate-950' : 'text-emerald-400'}`} />
                <span className="text-xs font-semibold">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Query Box */}
        <div className="p-5 sm:p-7 rounded-2xl bg-gradient-to-b from-[#0B142E] to-[#080E24] border border-[#D4AF37]/35 shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#D4AF37]" />
              {t.mcAskGuide}
            </label>
            <span className="text-[11px] text-emerald-400 font-mono">
              Minecraft Java & Bedrock 1.21+
            </span>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk();
            }}
            className="flex flex-col sm:flex-row gap-2.5"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.mcAskPlaceholder}
              className="flex-1 p-3.5 bg-[#050A18] border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-[#D4AF37] transition-colors"
            />

            <button
              type="submit"
              disabled={!query.trim() || isGenerating}
              className="py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-slate-950 font-bold text-xs tracking-wide hover:brightness-110 active:scale-[0.99] disabled:opacity-40 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>{t.mcAskButton}</span>
            </button>
          </form>

          {/* Quick Minecraft Questions */}
          <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
            <span className="text-slate-400 self-center">Частые вопросы:</span>
            <button
              onClick={() => handleAsk('Как работает новый спавнер испытаний в 1.21 Tricky Trials?')}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-slate-800 transition-colors"
            >
              🗝️ Спавнер испытаний 1.21
            </button>
            <button
              onClick={() => handleAsk('Как правильно варить зелье невидимости и огнестойкости?')}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-slate-800 transition-colors"
            >
              🧪 Зелья огнестойкости
            </button>
            <button
              onClick={() => handleAsk('Как установить мод Create на Fabric и оптимизировать Sodium?')}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-slate-800 transition-colors"
            >
              ⚙️ Мод Create + Sodium
            </button>
          </div>
        </div>

        {/* Answer Viewer */}
        {response && (
          <div className="p-6 rounded-2xl bg-[#091126] border border-[#D4AF37]/50 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Box className="w-4 h-4" />
                <span>Гайд от эксперта Tochkas AI</span>
              </div>

              <button
                onClick={copyResponse}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#D4AF37]/15 hover:bg-[#D4AF37]/30 text-amber-200 border border-[#D4AF37]/40 text-xs font-semibold transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? t.copied : t.copy}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#050A18] border border-slate-800/80 text-xs text-slate-200 leading-relaxed whitespace-pre-wrap font-sans max-h-[500px] overflow-y-auto">
              {response}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
