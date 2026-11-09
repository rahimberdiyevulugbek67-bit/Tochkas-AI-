import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { VideoDuration, VideoFormat, VideoVoice } from '../types';
import { 
  Video, 
  Mic, 
  MicOff, 
  Sparkles, 
  Loader2, 
  Volume2, 
  Play, 
  Pause, 
  Download, 
  Info, 
  ExternalLink,
  Film,
  FileText,
  Clock,
  Layers,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';

export const VideoSection: React.FC = () => {
  const { t, language, videos, addVideo, showToast } = useApp();

  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState<VideoDuration>('10s');
  const [format, setFormat] = useState<VideoFormat>('16:9');
  const [voice, setVoice] = useState<VideoVoice>('female');
  const [isRecording, setIsRecording] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPaidInfoModal, setShowPaidInfoModal] = useState(false);
  const [currentResult, setCurrentResult] = useState<{
    videoUrl?: string;
    script?: string;
    audioUrl?: string;
    isLiveOmniVideo?: boolean;
    omniNotice?: { message: string; cost: string; details?: string };
  } | null>(null);

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // Duration options
  const durations: { id: VideoDuration; label: string }[] = [
    { id: '10s', label: t.duration10s },
    { id: '20s', label: t.duration20s },
    { id: '30s', label: t.duration30s },
    { id: '60s', label: t.duration60s },
    { id: '100s', label: t.duration100s },
  ];

  // Format options
  const formats: { id: VideoFormat; label: string; aspect: string }[] = [
    { id: '16:9', label: t.formatLandscape, aspect: 'aspect-video' },
    { id: '9:16', label: t.formatPortrait, aspect: 'aspect-[9/16]' },
    { id: '1:1', label: t.formatSquare, aspect: 'aspect-square' },
  ];

  // 4 Voices requested
  const voices: { id: VideoVoice; label: string; name: string; desc: string }[] = [
    { id: 'male', label: t.voiceMale, name: 'Puck', desc: 'Уверенный, энергичный мужской тембр' },
    { id: 'female', label: t.voiceFemale, name: 'Kore', desc: 'Четкий, профессиональный женский голос' },
    { id: 'calm-male', label: t.voiceCalmMale, name: 'Charon', desc: 'Спокойный, кинематографичный бас' },
    { id: 'expressive-female', label: t.voiceExpressiveFemale, name: 'Zephyr', desc: 'Выразительный, эмоциональный голос' },
  ];

  // Voice speech-to-text for prompt
  const toggleRecording = () => {
    const SpeechRecognition = 
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      showToast('Голосовой ввод не поддерживается в этом браузере.', 'error');
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    try {
      // @ts-expect-error browser speech recognition API
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'ru' ? 'ru-RU' : language === 'uz' ? 'uz-UZ' : language === 'zh' ? 'zh-CN' : 'en-US';
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsRecording(true);
        showToast(t.voiceListeningState, 'info');
      };

      // @ts-expect-error browser event
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setPrompt((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsRecording(false);
      };

      recognition.onerror = () => setIsRecording(false);
      recognition.onend = () => setIsRecording(false);

      recognition.start();
    } catch {
      setIsRecording(false);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setCurrentResult(null);

    try {
      const res = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          duration,
          format,
          voice,
          language,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Ошибка видеогенератора');
      }

      setCurrentResult({
        videoUrl: data.videoUrl || undefined,
        script: data.script,
        audioUrl: data.audioUrl,
        isLiveOmniVideo: data.isLiveOmniVideo,
        omniNotice: data.omniNotice,
      });

      addVideo({
        prompt: prompt.trim(),
        duration,
        format,
        voice,
        videoUrl: data.videoUrl || undefined,
        status: 'completed',
      });

      showToast('Сценарий и медиаматериалы успешно сгенерированы!', 'success');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Ошибка генерации видео';
      showToast(message, 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleAudio = (audioUrl: string) => {
    if (isPlayingAudio && audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      if (audioPlayerRef.current) audioPlayerRef.current.pause();
      const audio = new Audio(audioUrl);
      audioPlayerRef.current = audio;
      audio.onended = () => setIsPlayingAudio(false);
      audio.onerror = () => setIsPlayingAudio(false);
      audio.play();
      setIsPlayingAudio(true);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-[#050A18] via-[#081026] to-[#040814] text-slate-100">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-amber-300 text-xs font-semibold mb-3">
              <Film className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Gemini Omni Flash (Veo) Interactions API</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.videoTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              {t.videoSubtitle}
            </p>
          </div>

          <button
            onClick={() => setShowPaidInfoModal(true)}
            className="self-start sm:self-center flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-medium transition-colors cursor-pointer"
          >
            <Info className="w-4 h-4" />
            <span>О тарифах и API видео</span>
          </button>
        </div>

        {/* Video Creator Form */}
        <form onSubmit={handleGenerate} className="p-5 sm:p-7 rounded-2xl bg-gradient-to-b from-[#0B142E] to-[#080E24] border border-[#D4AF37]/35 shadow-2xl space-y-6">
          
          {/* Prompt field with mic button */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#D4AF37]" />
                {t.videoPromptLabel}
              </label>
              <span className="text-[11px] text-slate-400">
                Поддерживаются любые сюжеты, движения камеры и стили
              </span>
            </div>

            <div className="relative">
              <textarea
                rows={3}
                required
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={t.videoPromptPlaceholder}
                className="w-full p-4 pr-14 bg-[#050A18] border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
              />

              <button
                type="button"
                onClick={toggleRecording}
                className={`absolute right-3 top-3 p-2.5 rounded-xl transition-all cursor-pointer ${
                  isRecording
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'text-slate-400 hover:text-[#D4AF37] hover:bg-white/5'
                }`}
                title={t.micButton}
                aria-label={t.micButton}
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* 1. Duration Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              {t.durationLabel}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {durations.map((d) => {
                const isSelected = duration === d.id;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDuration(d.id)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37] font-bold shadow-md shadow-[#D4AF37]/20'
                        : 'bg-white/5 border-slate-800 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Format Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#D4AF37]" />
              {t.formatLabel}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {formats.map((f) => {
                const isSelected = format === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFormat(f.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-amber-200'
                        : 'bg-white/5 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div
                      className={`w-7 h-5 rounded border ${
                        f.id === '16:9'
                          ? 'w-7 h-4'
                          : f.id === '9:16'
                          ? 'w-4 h-7'
                          : 'w-6 h-6'
                      } ${isSelected ? 'border-[#D4AF37] bg-[#D4AF37]/30' : 'border-slate-600'}`}
                    />
                    <div className="text-left">
                      <div className="font-bold">{f.id}</div>
                      <div className="text-[10px] text-slate-400">{f.label}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Voice Selection (4 Voices) */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-[#D4AF37]" />
              {t.voiceLabel}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {voices.map((v) => {
                const isSelected = voice === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVoice(v.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-amber-200 shadow-sm'
                        : 'bg-white/5 border-slate-800 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span>{v.label}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-amber-300 font-mono">
                        {v.name}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{v.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={!prompt.trim() || isGenerating}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#B38728] text-slate-950 font-extrabold text-sm tracking-wide hover:brightness-110 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xl shadow-[#D4AF37]/25 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{t.generatingVideo}</span>
              </>
            ) : (
              <>
                <Video className="w-5 h-5" />
                <span>{t.generateVideo}</span>
              </>
            )}
          </button>
        </form>

        {/* Current Result Showcase */}
        {currentResult && (
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0B1530] to-[#070D20] border border-[#D4AF37]/60 shadow-2xl space-y-5 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-base">
                <CheckCircle2 className="w-5 h-5" />
                <span>Результат видеогенерации</span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium">
                {currentResult.isLiveOmniVideo ? 'Omni Video MP4' : 'Сценарий + AI Диктор'}
              </span>
            </div>

            {/* Video Player if video data returned */}
            {currentResult.videoUrl && (
              <div className="space-y-2">
                <div className="relative rounded-xl overflow-hidden bg-black/80 aspect-video flex items-center justify-center border border-slate-700">
                  <video
                    src={currentResult.videoUrl}
                    controls
                    className="w-full h-full object-contain"
                  />
                </div>
                <a
                  href={currentResult.videoUrl}
                  download="tochkas-ai-generated-video.mp4"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D4AF37] text-slate-950 text-xs font-bold hover:brightness-110 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Скачать видеоролик (MP4)</span>
                </a>
              </div>
            )}

            {/* Voiceover Player */}
            {currentResult.audioUrl && (
              <div className="p-4 rounded-xl bg-[#060B18] border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleAudio(currentResult.audioUrl!)}
                    className="w-10 h-10 rounded-xl bg-[#D4AF37] text-slate-950 flex items-center justify-center shadow-md hover:brightness-110 transition-all cursor-pointer"
                  >
                    {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                  </button>
                  <div>
                    <div className="text-xs font-bold text-white">Озвучка диктора (Gemini TTS)</div>
                    <div className="text-[11px] text-slate-400">Синтез голоса {voices.find(v => v.id === voice)?.label}</div>
                  </div>
                </div>

                <a
                  href={currentResult.audioUrl}
                  download="tochkas-ai-narration.wav"
                  className="flex items-center gap-1.5 text-xs text-[#D4AF37] hover:underline"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Скачать WAV</span>
                </a>
              </div>
            )}

            {/* Script & Storyboard text */}
            {currentResult.script && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Режиссерский сценарий и раскадровка:
                </h4>
                <div className="p-4 rounded-xl bg-[#060B18] border border-slate-800 text-xs text-slate-200 whitespace-pre-wrap font-sans max-h-60 overflow-y-auto leading-relaxed">
                  {currentResult.script}
                </div>
              </div>
            )}

            {/* Notice regarding Google Cloud Video API */}
            {currentResult.omniNotice && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-1.5">
                <div className="font-bold flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-amber-400" />
                  <span>Подключение Google Cloud Video Model</span>
                </div>
                <p>{currentResult.omniNotice.message}</p>
                <p className="text-amber-300/80 font-mono text-[11px]">{currentResult.omniNotice.cost}</p>
              </div>
            )}
          </div>
        )}

        {/* Video History Gallery */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Video className="w-5 h-5 text-[#D4AF37]" />
              <span>{t.videoHistory} ({videos.length})</span>
            </h2>
          </div>

          {videos.length === 0 ? (
            <div className="text-center py-12 rounded-2xl bg-[#091024] border border-slate-800/80">
              <Video className="w-12 h-12 text-slate-600 mx-auto mb-2" />
              <p className="text-sm text-slate-400">{t.noVideosYet}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {videos.map((vid) => (
                <div
                  key={vid.id}
                  className="p-4 rounded-2xl bg-[#0B132B] border border-slate-800 hover:border-[#D4AF37]/50 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-amber-300 uppercase">
                      {vid.duration} • {vid.format}
                    </span>
                    <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded">
                      Голос: {vid.voice}
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 line-clamp-2">
                    {vid.prompt}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* External Paid API Pricing Guide Modal */}
      {showPaidInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-xl bg-gradient-to-b from-[#0C152E] via-[#0A1024] to-[#060A18] border border-[#D4AF37]/50 rounded-2xl p-6 sm:p-7 shadow-2xl text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-base">
                <HelpCircle className="w-5 h-5" />
                <span>{t.paidApiNoticeTitle}</span>
              </div>
              <button
                onClick={() => setShowPaidInfoModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-200 leading-relaxed">
              <p>
                Tochkas AI разработан как полноценная продакшн-платформа. Мы используем официальные серверные вызовы через <span className="font-mono text-amber-300">@google/genai</span> и Interactions API.
              </p>

              <div className="p-4 rounded-xl bg-white/5 border border-slate-800 space-y-2">
                <div className="font-bold text-white text-sm">Стоимость и подключение Veo / Omni Flash:</div>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  <li><span className="text-amber-200 font-semibold">Модель:</span> gemini-omni-1.2-flash (Veo)</li>
                  <li><span className="text-amber-200 font-semibold">Ориентировочная цена:</span> ~$0.07 за 1 секунду готового 720p/1080p видео</li>
                  <li><span className="text-amber-200 font-semibold">Для подключения:</span> Привяжите Google Cloud проект с активным биллингом в панели Secrets AI Studio.</li>
                </ul>
              </div>

              <p className="text-slate-300">
                В базовом режиме Tochkas AI автоматически генерирует полный сценарий, тайминги сцен, визуальную раскадровку и синтезирует чистый дикторский голос через Gemini 3.8 Flash Lite TTS без дополнительных затрат.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowPaidInfoModal(false)}
                className="px-4 py-2 rounded-xl bg-[#D4AF37] text-slate-950 font-bold text-xs hover:brightness-110"
              >
                Понятно
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
