import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Download, 
  Loader2, 
  Image as ImageIcon, 
  Trash2, 
  Box, 
  Youtube, 
  Camera, 
  UserCheck,
  Maximize2
} from 'lucide-react';

export const ImageSection: React.FC = () => {
  const { t, images, addImage, deleteImage, showToast } = useApp();

  const [prompt, setPrompt] = useState('');
  const [category, setCategory] = useState<'youtube-avatar' | 'youtube-thumbnail' | 'minecraft' | 'realistic'>('youtube-thumbnail');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '9:16' | '4:3'>('16:9');
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const categories = [
    { id: 'youtube-thumbnail', label: t.categoryThumbnail, icon: Youtube, defaultRatio: '16:9' },
    { id: 'youtube-avatar', label: t.categoryAvatar, icon: UserCheck, defaultRatio: '1:1' },
    { id: 'minecraft', label: t.categoryMinecraft, icon: Box, defaultRatio: '16:9' },
    { id: 'realistic', label: t.categoryRealistic, icon: Camera, defaultRatio: '16:9' },
  ];

  const aspectRatios = [
    { id: '16:9', label: '16:9 (YouTube)', icon: 'Landscape' },
    { id: '1:1', label: '1:1 (Квадрат)', icon: 'Square' },
    { id: '9:16', label: '9:16 (Shorts/Reels)', icon: 'Portrait' },
    { id: '4:3', label: '4:3 (Классик)', icon: 'Standard' },
  ];

  const handleCategorySelect = (catId: 'youtube-avatar' | 'youtube-thumbnail' | 'minecraft' | 'realistic') => {
    setCategory(catId);
    if (catId === 'youtube-avatar') setAspectRatio('1:1');
    else if (catId === 'youtube-thumbnail') setAspectRatio('16:9');
  };

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          aspectRatio,
          category,
        }),
      });

      const data = await res.json();
      if (data.success && data.imageUrl) {
        addImage({
          prompt: prompt.trim(),
          category,
          aspectRatio,
          imageUrl: data.imageUrl,
        });
        showToast('Изображение успешно создано!', 'success');
        setPrompt('');
      } else {
        showToast(data.error || 'Не удалось создать изображение', 'error');
      }
    } catch {
      showToast('Ошибка при связи с сервером генерации изображений', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (imageUrl: string, promptText: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `tochkas-ai-${promptText.slice(0, 20).replace(/[^a-zA-Z0-9]/g, '_')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Изображение сохранено на устройство', 'success');
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-[#050A18] via-[#081026] to-[#040814] text-slate-100">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-amber-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gemini Imagen Studio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t.imageTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            {t.imageSubtitle}
          </p>
        </div>

        {/* Generator Form Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#0B142E] to-[#080E24] border border-[#D4AF37]/35 shadow-2xl space-y-5">
          
          {/* Category Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Тип изображения
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategorySelect(cat.id as typeof category)}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20 font-bold'
                        : 'bg-white/5 border-slate-800 text-slate-300 hover:bg-white/10 hover:border-slate-700'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Aspect Ratio Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              {t.aspectRatio}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {aspectRatios.map((ar) => {
                const isSelected = aspectRatio === ar.id;
                return (
                  <button
                    key={ar.id}
                    type="button"
                    onClick={() => setAspectRatio(ar.id as typeof aspectRatio)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#D4AF37]/25 text-amber-200 border-[#D4AF37]'
                        : 'bg-white/5 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {ar.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Prompt input form */}
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Описание изображения (Промпт)
              </label>
              <textarea
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={t.imagePromptPlaceholder}
                className="w-full p-3.5 bg-[#050A18] border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
              />
            </div>

            {/* Quick Inspiration Prompts */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-[11px] text-slate-400 self-center">Быстрые идеи:</span>
              <button
                type="button"
                onClick={() => setPrompt('Неоновый геймерский скин Minecraft с золотым мечом на закате')}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-slate-800 transition-colors"
              >
                🎮 Minecraft скин с мечом
              </button>
              <button
                type="button"
                onClick={() => setPrompt('Шокированное лицо блогера с красной стрелкой и ярким фоном YouTube превью')}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-slate-800 transition-colors"
              >
                🔴 Кликбейтный YouTube Thumbnail
              </button>
              <button
                type="button"
                onClick={() => setPrompt('Золотой дракон Края в пространстве космоса 8k')}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-slate-800 transition-colors"
              >
                🐉 Эпический дракон Края
              </button>
            </div>

            <button
              type="submit"
              disabled={!prompt.trim() || isGenerating}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B38728] text-slate-950 font-bold text-sm tracking-wide hover:brightness-110 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xl shadow-[#D4AF37]/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{t.generatingImage}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>{t.generateImage}</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Generated Gallery */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#D4AF37]" />
              <span>{t.imageHistory} ({images.length})</span>
            </h2>
          </div>

          {images.length === 0 ? (
            <div className="text-center py-12 rounded-2xl bg-[#091024] border border-slate-800/80">
              <ImageIcon className="w-12 h-12 text-slate-600 mx-auto mb-2" />
              <p className="text-sm text-slate-400">{t.noImagesYet}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="rounded-2xl overflow-hidden bg-[#0B132B] border border-slate-800 hover:border-[#D4AF37]/50 transition-all group flex flex-col justify-between shadow-lg"
                >
                  <div className="relative overflow-hidden aspect-video bg-black/40">
                    <img
                      src={img.imageUrl}
                      alt={img.prompt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setPreviewImage(img.imageUrl)}
                        className="p-1.5 rounded-lg bg-black/70 hover:bg-black text-white transition-colors"
                        title="Увеличить"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteImage(img.id)}
                        className="p-1.5 rounded-lg bg-black/70 hover:bg-rose-600 text-white transition-colors"
                        title="Удалить"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="absolute bottom-2 left-2">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/70 text-amber-300 backdrop-blur-sm border border-white/10 uppercase">
                        {img.category} • {img.aspectRatio}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 space-y-3 flex-1 flex flex-col justify-between">
                    <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
                      {img.prompt}
                    </p>

                    <button
                      onClick={() => handleDownload(img.imageUrl, img.prompt)}
                      className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/5 hover:bg-[#D4AF37] text-slate-200 hover:text-slate-950 text-xs font-semibold border border-slate-700 hover:border-[#D4AF37] transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{t.downloadImage}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img src={previewImage} alt="Enlarged" className="max-w-full max-h-[90vh] object-contain rounded-xl" />
          </div>
        </div>
      )}
    </div>
  );
};
