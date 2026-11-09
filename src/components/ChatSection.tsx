import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  Copy, 
  Check, 
  Trash2, 
  Sparkles, 
  Bot, 
  User, 
  Loader2,
  Box,
  Youtube,
  Code
} from 'lucide-react';

export const ChatSection: React.FC = () => {
  const { 
    t, 
    language, 
    chatMessages, 
    addChatMessage, 
    clearChatMessages, 
    showToast 
  } = useApp();

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isLoading]);

  // Voice speech-to-text recognition
  const toggleRecording = () => {
    const SpeechRecognition = 
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      showToast('Голосовой ввод не поддерживается в этом браузере. Используйте клавиатуру.', 'error');
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
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsRecording(true);
        showToast(t.voiceListeningState, 'info');
      };

      // @ts-expect-error browser event
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch {
      setIsRecording(false);
    }
  };

  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText || input).trim();
    if (!textToSend || isLoading) return;

    // Add user message
    addChatMessage({
      role: 'user',
      content: textToSend,
    });

    if (!messageText) setInput('');
    setIsLoading(true);

    try {
      const historyToSend = [
        ...chatMessages.slice(-6).map((m) => ({ role: m.role, content: m.content })),
        { role: 'user', content: textToSend },
      ];

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: historyToSend,
          language,
          category: 'general',
        }),
      });

      if (!res.ok) {
        throw new Error('Ошибка сервера AI');
      }

      const data = await res.json();
      addChatMessage({
        role: 'assistant',
        content: data.text || 'Извините, ответ пуст',
      });
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : t.error;
      addChatMessage({
        role: 'assistant',
        content: `⚠️ ${errMsg}. Проверьте подключение к серверу.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast(t.copied, 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const playTTS = async (text: string, id: string) => {
    if (playingAudioId === id && audioRef.current) {
      audioRef.current.pause();
      setPlayingAudioId(null);
      return;
    }

    try {
      setPlayingAudioId(id);
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.slice(0, 400), voice: 'female', language }),
      });
      const data = await res.json();

      if (data.audioUrl) {
        if (audioRef.current) audioRef.current.pause();
        const audio = new Audio(data.audioUrl);
        audioRef.current = audio;
        audio.onended = () => setPlayingAudioId(null);
        audio.onerror = () => setPlayingAudioId(null);
        await audio.play();
      } else {
        setPlayingAudioId(null);
        showToast('Не удалось воспроизвести аудио', 'error');
      }
    } catch {
      setPlayingAudioId(null);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-gradient-to-b from-[#050A18] via-[#081026] to-[#040814] text-slate-100">
      
      {/* Top Banner & Title */}
      <div className="p-4 sm:px-6 border-b border-slate-800/80 bg-[#060B18]/70 backdrop-blur-sm flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1C2951] to-[#0B132B] border border-[#D4AF37]/50 flex items-center justify-center">
            <Bot className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>{t.navChat}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                Gemini 3.8 Flash
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Быстрые ответы, код, YouTube сценарии и Minecraft правила
            </p>
          </div>
        </div>

        {chatMessages.length > 0 && (
          <button
            onClick={clearChatMessages}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-rose-300 hover:text-white bg-rose-500/10 hover:bg-rose-500/20 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.clearChat}</span>
          </button>
        )}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {chatMessages.length === 0 ? (
          <div className="max-w-2xl mx-auto py-8 text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1C2951] to-[#0B132B] border border-[#D4AF37] shadow-xl shadow-[#D4AF37]/20">
              <Sparkles className="w-8 h-8 text-[#D4AF37]" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {t.chatWelcomeTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
                {t.chatWelcomeDesc}
              </p>
            </div>

            {/* Quick Prompts */}
            <div className="space-y-2 pt-2 text-left">
              <div className="text-xs font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {t.quickPromptsTitle}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={() => handleSend(t.promptMinecraftSurvival)}
                  className="p-3 rounded-xl bg-white/5 hover:bg-[#0E1A38] border border-slate-800 hover:border-[#D4AF37]/50 text-left text-xs text-slate-200 transition-all flex items-start gap-2.5 group cursor-pointer"
                >
                  <Box className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="group-hover:text-amber-200 transition-colors">
                    {t.promptMinecraftSurvival}
                  </span>
                </button>

                <button
                  onClick={() => handleSend(t.promptYouTubeIdea)}
                  className="p-3 rounded-xl bg-white/5 hover:bg-[#0E1A38] border border-slate-800 hover:border-[#D4AF37]/50 text-left text-xs text-slate-200 transition-all flex items-start gap-2.5 group cursor-pointer"
                >
                  <Youtube className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span className="group-hover:text-amber-200 transition-colors">
                    {t.promptYouTubeIdea}
                  </span>
                </button>

                <button
                  onClick={() => handleSend(t.promptPythonScript)}
                  className="p-3 rounded-xl bg-white/5 hover:bg-[#0E1A38] border border-slate-800 hover:border-[#D4AF37]/50 text-left text-xs text-slate-200 transition-all flex items-start gap-2.5 group cursor-pointer"
                >
                  <Code className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span className="group-hover:text-amber-200 transition-colors">
                    {t.promptPythonScript}
                  </span>
                </button>

                <button
                  onClick={() => handleSend(t.promptAiFuture)}
                  className="p-3 rounded-xl bg-white/5 hover:bg-[#0E1A38] border border-slate-800 hover:border-[#D4AF37]/50 text-left text-xs text-slate-200 transition-all flex items-start gap-2.5 group cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="group-hover:text-amber-200 transition-colors">
                    {t.promptAiFuture}
                  </span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-4">
            {chatMessages.map((msg) => {
              const isAssistant = msg.role === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 animate-in fade-in slide-in-from-bottom-1 ${
                    isAssistant ? 'justify-start' : 'justify-end'
                  }`}
                >
                  {isAssistant && (
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1C2951] to-[#0A1229] border border-[#D4AF37]/60 flex items-center justify-center shrink-0 shadow-md">
                      <Bot className="w-4 h-4 text-[#D4AF37]" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-4 shadow-md text-sm leading-relaxed ${
                      isAssistant
                        ? 'bg-[#0B142E] border border-[#D4AF37]/30 text-slate-100'
                        : 'bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-slate-950 font-medium'
                    }`}
                  >
                    <div className="whitespace-pre-wrap break-words">{msg.content}</div>

                    {isAssistant && (
                      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                        <span className="text-[10px] text-amber-300/70 font-mono">
                          Tochkas AI 3.8
                        </span>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => playTTS(msg.content, msg.id)}
                            className={`p-1.5 rounded-lg hover:bg-white/10 transition-colors ${
                              playingAudioId === msg.id ? 'text-[#D4AF37] bg-white/10' : ''
                            }`}
                            title={t.playAudio}
                            aria-label={t.playAudio}
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => copyToClipboard(msg.content, msg.id)}
                            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                            title={t.copy}
                            aria-label={t.copy}
                          >
                            {copiedId === msg.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {!isAssistant && (
                    <div className="w-8 h-8 rounded-xl bg-[#D4AF37] text-slate-950 flex items-center justify-center shrink-0 font-bold shadow-md">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-3 justify-start items-center">
                <div className="w-8 h-8 rounded-xl bg-[#0B142E] border border-[#D4AF37]/50 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div className="p-3.5 rounded-2xl bg-[#0B142E] border border-slate-800 flex items-center gap-2 text-xs text-slate-300">
                  <Loader2 className="w-4 h-4 text-[#D4AF37] animate-spin" />
                  <span>Tochkas AI генерирует ответ...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="p-3 sm:p-4 bg-[#060B18]/90 backdrop-blur-md border-t border-slate-800/80 shrink-0">
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 p-1.5 sm:p-2 rounded-2xl bg-[#0B132B] border border-[#D4AF37]/40 shadow-xl focus-within:border-[#D4AF37] transition-all"
          >
            {/* Mic button */}
            <button
              type="button"
              onClick={toggleRecording}
              className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                isRecording
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
              title={isRecording ? 'Остановить запись' : 'Голосовой ввод'}
              aria-label="Toggle voice input"
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.chatPlaceholder}
              disabled={isLoading}
              className="flex-1 bg-transparent px-2 text-sm text-slate-100 placeholder-slate-400 focus:outline-none"
            />

            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-slate-950 font-bold hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md cursor-pointer"
              aria-label={t.send}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="text-[10px] text-center text-slate-400 mt-1.5">
            Tochkas AI • Поддерживает 4 языка (RU, UZ, EN, ZH) с мгновенным переводом
          </div>
        </div>
      </div>
    </div>
  );
};
