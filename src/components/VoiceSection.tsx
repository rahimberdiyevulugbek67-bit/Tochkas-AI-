import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Bot, 
  User, 
  RotateCcw,
  Radio
} from 'lucide-react';

export const VoiceSection: React.FC = () => {
  const { t, language, showToast } = useApp();

  const [state, setState] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');
  const [transcript, setTranscript] = useState('');
  const [voiceHistory, setVoiceHistory] = useState<{ sender: 'user' | 'ai'; text: string }[]>([]);
  const [autoContinue, setAutoContinue] = useState(true);

  const recognitionRef = useRef<unknown>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Stop any playing audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause();
      if (recognitionRef.current) {
        // @ts-expect-error speech recognition
        recognitionRef.current.abort();
      }
    };
  }, []);

  const startListening = () => {
    const SpeechRecognition = 
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      showToast('Голосовой ввод не поддерживается в этом браузере.', 'error');
      return;
    }

    try {
      if (audioRef.current) audioRef.current.pause();

      // @ts-expect-error browser speech recognition API
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = language === 'ru' ? 'ru-RU' : language === 'uz' ? 'uz-UZ' : language === 'zh' ? 'zh-CN' : 'en-US';
      recognition.interimResults = true;
      recognition.continuous = false;

      recognition.onstart = () => {
        setState('listening');
        setTranscript('');
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        let currentText = '';
        for (let i = 0; i < event.results.length; i++) {
          currentText += event.results[i][0].transcript;
        }
        setTranscript(currentText);
      };

      recognition.onerror = () => {
        setState('idle');
      };

      recognition.onend = () => {
        setTranscript((current) => {
          if (current.trim().length > 1) {
            handleProcessVoiceInput(current.trim());
          } else {
            setState('idle');
          }
          return current;
        });
      };

      recognition.start();
    } catch {
      setState('idle');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      // @ts-expect-error speech recognition
      recognitionRef.current.stop();
    }
    if (audioRef.current) audioRef.current.pause();
    setState('idle');
  };

  const handleProcessVoiceInput = async (userText: string) => {
    setState('thinking');
    setVoiceHistory((prev) => [...prev, { sender: 'user', text: userText }]);

    try {
      // 1. Get AI response from Gemini 3.8 Flash
      const chatRes = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            ...voiceHistory.slice(-4).map((m) => ({
              role: m.sender === 'user' ? 'user' : 'assistant',
              content: m.text,
            })),
            { role: 'user', content: userText },
          ],
          language,
          category: 'voice',
        }),
      });

      const chatData = await chatRes.json();
      const aiReply = chatData.text || 'Я вас внимательно слушаю!';
      setVoiceHistory((prev) => [...prev, { sender: 'ai', text: aiReply }]);

      // 2. Synthesize audio via Gemini 3.8 Flash Lite TTS
      setState('speaking');
      const ttsRes = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: aiReply.slice(0, 350),
          voice: 'female',
          language,
        }),
      });

      const ttsData = await ttsRes.json();
      if (ttsData.audioUrl) {
        const audio = new Audio(ttsData.audioUrl);
        audioRef.current = audio;
        audio.onended = () => {
          if (autoContinue) {
            // Automatically listen again for continuous conversation
            setTimeout(() => startListening(), 500);
          } else {
            setState('idle');
          }
        };
        audio.onerror = () => {
          setState('idle');
        };
        await audio.play();
      } else {
        setState('idle');
      }
    } catch {
      setState('idle');
      showToast('Ошибка голосового диалога', 'error');
    }
  };

  const resetVoiceChat = () => {
    stopListening();
    setVoiceHistory([]);
    setTranscript('');
    setState('idle');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-[#050A18] via-[#081026] to-[#040814] text-slate-100 overflow-y-auto">
      <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col justify-between space-y-6">
        
        {/* Top Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-amber-300 text-xs font-semibold">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Tochkas Voice AI • Real-Time Conversation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t.voiceTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            {t.voiceSubtitle}
          </p>
        </div>

        {/* Central Interactive Orb / Waveform Visualizer */}
        <div className="flex flex-col items-center justify-center my-auto py-6">
          <div className="relative flex items-center justify-center">
            
            {/* Animated Ripples based on state */}
            {state === 'listening' && (
              <>
                <div className="absolute w-44 h-44 rounded-full bg-rose-500/20 animate-ping" />
                <div className="absolute w-56 h-56 rounded-full bg-rose-500/10 animate-pulse" />
              </>
            )}

            {state === 'speaking' && (
              <>
                <div className="absolute w-44 h-44 rounded-full bg-[#D4AF37]/25 animate-ping" />
                <div className="absolute w-56 h-56 rounded-full bg-[#D4AF37]/15 animate-pulse" />
              </>
            )}

            {state === 'thinking' && (
              <div className="absolute w-48 h-48 rounded-full border-2 border-dashed border-[#D4AF37] animate-spin" />
            )}

            {/* Core Mic Button */}
            <button
              onClick={state === 'idle' ? startListening : stopListening}
              className={`relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all active:scale-95 cursor-pointer ${
                state === 'listening'
                  ? 'bg-rose-600 text-white shadow-rose-600/40 border-4 border-rose-400'
                  : state === 'speaking'
                  ? 'bg-gradient-to-br from-[#D4AF37] to-[#B38728] text-slate-950 shadow-[#D4AF37]/40 border-4 border-amber-300'
                  : state === 'thinking'
                  ? 'bg-[#1C2951] text-amber-300 border-4 border-[#D4AF37]/60'
                  : 'bg-gradient-to-br from-[#1C2951] via-[#0E1A38] to-[#080E24] hover:border-[#D4AF37] text-[#D4AF37] border-2 border-[#D4AF37]/50 shadow-[#D4AF37]/20 hover:scale-105'
              }`}
              aria-label="Toggle voice dialog"
            >
              {state === 'listening' ? (
                <Mic className="w-10 h-10 animate-bounce" />
              ) : state === 'speaking' ? (
                <Volume2 className="w-10 h-10 animate-pulse" />
              ) : state === 'thinking' ? (
                <Sparkles className="w-10 h-10 animate-spin" />
              ) : (
                <Mic className="w-10 h-10" />
              )}
            </button>
          </div>

          {/* Current Status Label */}
          <div className="mt-6 text-center">
            <span className="text-sm font-bold tracking-wide uppercase text-amber-300">
              {state === 'listening' && t.voiceListeningState}
              {state === 'thinking' && 'Tochkas AI думает...'}
              {state === 'speaking' && t.voiceSpeakingState}
              {state === 'idle' && t.voiceIdleState}
            </span>

            {transcript && state === 'listening' && (
              <p className="mt-2 text-xs text-slate-300 bg-white/5 border border-slate-800 rounded-xl px-4 py-2 max-w-md mx-auto">
                "{transcript}"
              </p>
            )}
          </div>
        </div>

        {/* Live Conversation Timeline Box */}
        {voiceHistory.length > 0 && (
          <div className="p-4 rounded-2xl bg-[#091126] border border-slate-800 max-h-48 overflow-y-auto space-y-2 text-xs">
            {voiceHistory.map((item, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-xl ${
                  item.sender === 'ai'
                    ? 'bg-[#0E1B3D] text-amber-200 border border-[#D4AF37]/30'
                    : 'bg-white/5 text-slate-200'
                }`}
              >
                <span className="font-bold uppercase text-[10px] mr-1.5 opacity-70">
                  {item.sender === 'ai' ? 'Tochkas AI' : 'Вы'}:
                </span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Controls Footer */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={autoContinue}
              onChange={(e) => setAutoContinue(e.target.checked)}
              className="accent-[#D4AF37] w-4 h-4 rounded"
            />
            <span>Непрерывный режим диалога (авто-слушать после ответа)</span>
          </label>

          {voiceHistory.length > 0 && (
            <button
              onClick={resetVoiceChat}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Начать заново</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
