import { VideoDuration, VideoFormat, VideoVoice, Language } from '../types';
import { translations } from './i18n';
import { generateSitemapXml, generateRobotsTxt, generateHtmlVerificationContent } from './seo';

export function validateVideoParams(params: {
  prompt: string;
  duration: VideoDuration;
  format: VideoFormat;
  voice: VideoVoice;
}): { valid: boolean; error?: string } {
  if (!params.prompt || params.prompt.trim().length < 3) {
    return { valid: false, error: 'Описание видео должно содержать минимум 3 символа' };
  }

  const validDurations: VideoDuration[] = ['10s', '20s', '30s', '60s', '100s'];
  if (!validDurations.includes(params.duration)) {
    return { valid: false, error: 'Недопустимая продолжительность видео' };
  }

  const validFormats: VideoFormat[] = ['16:9', '9:16', '1:1'];
  if (!validFormats.includes(params.format)) {
    return { valid: false, error: 'Недопустимый формат видео' };
  }

  const validVoices: VideoVoice[] = ['male', 'female', 'calm-male', 'expressive-female'];
  if (!validVoices.includes(params.voice)) {
    return { valid: false, error: 'Недопустимый голос AI' };
  }

  return { valid: true };
}

export function getVoiceConfig(voice: VideoVoice): { voiceName: string; style: string } {
  switch (voice) {
    case 'male':
      return { voiceName: 'Puck', style: 'Dynamic, confident male narrator' };
    case 'female':
      return { voiceName: 'Kore', style: 'Clear, engaging female narrator' };
    case 'calm-male':
      return { voiceName: 'Charon', style: 'Calm, thoughtful, cinematic male voice' };
    case 'expressive-female':
      return { voiceName: 'Zephyr', style: 'Expressive, enthusiastic female voice' };
    default:
      return { voiceName: 'Kore', style: 'Standard narrator' };
  }
}

export function formatDurationLabel(duration: VideoDuration, lang: Language): string {
  const t = translations[lang] || translations.ru;
  switch (duration) {
    case '10s': return t.duration10s;
    case '20s': return t.duration20s;
    case '30s': return t.duration30s;
    case '60s': return t.duration60s;
    case '100s': return t.duration100s;
    default: return duration;
  }
}

export { generateSitemapXml, generateRobotsTxt, generateHtmlVerificationContent };
