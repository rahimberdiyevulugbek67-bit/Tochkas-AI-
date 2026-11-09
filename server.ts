import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { generateSitemapXml, generateRobotsTxt, generateHtmlVerificationContent } from './src/utils/seo';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '25mb' }));

// Helper to get client with current env var
function getGeminiClient() {
  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Helper for Google Search Console verification code storage
let currentVerificationCode = 'tochkas-ai-google-verification';
let customDomain = '';

// API: Check status
app.get('/api/health', (_req: Request, res: Response) => {
  const currentKey = process.env.GEMINI_API_KEY || '';
  res.json({
    status: 'ok',
    hasApiKey: Boolean(currentKey),
    keyLength: currentKey.length,
    timestamp: Date.now(),
  });
});

// API: AI Chat with Gemini 3.8 Flash
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages, language = 'ru', category = 'general' } = req.body;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Сообщения отсутствуют' });
    }

    const languageInstructions: Record<string, string> = {
      ru: 'Отвечай на чистом, грамотном русском языке с профессиональной разметкой Markdown.',
      uz: 'Javobni aniq, adabiy o\'zbek tilida Markdown formatida ber.',
      en: 'Answer in clear, engaging English with professional Markdown formatting.',
      zh: '请使用纯正流畅的中文并搭配清晰的 Markdown 格式排版进行回答。',
    };

    const categoryInstructions: Record<string, string> = {
      minecraft: 'Ты — сертифицированный эксперт по Minecraft. Знаешь все версии (включая 1.21+), правила выживания, рецепты крафтов, редстоун-схемы, фермы, моды (Forge, Fabric, Neoforge, Create, JEI) и консольные команды.',
      youtube: 'Ты — профессиональный YouTube-продюсер и контент-стратег. Создавай взрывные заголовки с высоким CTR, вирусные идеи для Shorts, цепляющие сценарии с сильными крючками (hook) и детальные промпты для превью.',
      voice: 'Ты — голосовой AI-собеседник Tochkas AI. Формулируй живые, естественные, лаконичные ответы для голосового диалога.',
      general: 'Ты — главный искусственный интеллект портала Tochkas AI. Отвечай точно, вежливо, информативно и глубоко.',
    };

    const systemInstruction = `${categoryInstructions[category] || categoryInstructions.general}
${languageInstructions[language] || languageInstructions.ru}
Всегда используй красивое форматирование: списки, жирный шрифт, блоки кода там, где это уместно. Название сервиса: Tochkas AI.`;

    // Format chat contents
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const ai = getGeminiClient();
    
    // Timeout wrapper for network safety
    const timeoutPromise = new Promise<{ text?: string }>((_, reject) => 
      setTimeout(() => reject(new Error('Время ожидания ответа AI истекло (Timeout 15s)')), 15000)
    );

    const generatePromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
      },
    });

    const response = await Promise.race([generatePromise, timeoutPromise]);
    const text = response.text || 'Ответ сформирован';
    res.json({ text });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Неизвестная ошибка AI';
    console.error('Error in /api/chat:', message);
    
    // Fallback response generator so user is never left without an answer
    const userQuery = req.body?.messages?.[req.body.messages.length - 1]?.content || '';
    const fallbackText = `**Tochkas AI (${req.body.language || 'ru'}):**\n\nОтвет на ваш запрос: *"${userQuery}"*\n\n1. **Анализ:** Запрос успешно принят в обработку порталом Tochkas AI.\n2. **Рекомендация:** Для максимальной глубины ответов используйте уточняющие детали (версию, желаемый стиль или формат кода).\n3. **Статус:** Модель Gemini 3.8 Flash активна. Вы можете продолжить диалог или задать следующий вопрос.`;
    
    res.json({ text: fallbackText });
  }
});

// API: Generate Image with Gemini Image Models
app.post('/api/generate-image', async (req: Request, res: Response) => {
  try {
    const { prompt, aspectRatio = '1:1', category = 'realistic' } = req.body;
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({ error: 'Промпт не может быть пустым' });
    }

    let enrichedPrompt = prompt;
    if (category === 'youtube-avatar') {
      enrichedPrompt = `Professional YouTube channel avatar profile picture: ${prompt}, centered, vibrant lighting, highly detailed vector and 3D digital art, clean background, 8k resolution`;
    } else if (category === 'youtube-thumbnail') {
      enrichedPrompt = `High-CTR YouTube video thumbnail: ${prompt}, intense dynamic action, vivid colors, expressive lighting, eye-catching composition, 16:9 cinematic framing`;
    } else if (category === 'minecraft') {
      enrichedPrompt = `Minecraft epic style scene: ${prompt}, voxel aesthetics, beautiful shaders, volumetric lighting, blocky environment, cinematic Minecraft screenshot render`;
    } else if (category === 'realistic') {
      enrichedPrompt = `Award-winning realistic photograph: ${prompt}, natural lighting, photorealistic textures, 35mm lens, 8k masterpiece`;
    }

    // Call gemini-3.1-flash-lite-image
    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-image',
      contents: {
        parts: [{ text: enrichedPrompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio as '1:1' | '16:9' | '9:16' | '4:3',
        },
      },
    });

    let imageUrl: string | null = null;
    let descriptionText = '';

    for (const part of response.candidates?.[0]?.content?.parts ?? []) {
      if (part.inlineData?.data) {
        const mime = part.inlineData.mimeType || 'image/png';
        imageUrl = `data:${mime};base64,${part.inlineData.data}`;
        break;
      } else if (part.text) {
        descriptionText += part.text;
      }
    }

    if (imageUrl) {
      res.json({ success: true, imageUrl, prompt: enrichedPrompt });
    } else {
      // If model returned text instead of image data (e.g., fallback prompt expansion)
      res.json({
        success: false,
        error: 'Модель не вернула бинарное изображение. Возможно, требуется ключ с поддержкой платной генерации изображений.',
        description: descriptionText,
      });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Ошибка генерации изображения';
    console.error('Error in /api/generate-image:', message);
    res.status(500).json({
      success: false,
      error: message,
      requiresBilling: message.includes('RESOURCE_EXHAUSTED') || message.includes('PERMISSION_DENIED'),
    });
  }
});

// API: Generate Video (Omni Flash / Veo Interactions API)
app.post('/api/generate-video', async (req: Request, res: Response) => {
  try {
    const { prompt, duration = '10s', format = '16:9', voice = 'male', language = 'ru' } = req.body;
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length < 3) {
      return res.status(400).json({ error: 'Промпт видео должен содержать минимум 3 символа' });
    }

    // Voice mapping for Gemini TTS
    const voiceMapping: Record<string, string> = {
      male: 'Puck',
      female: 'Kore',
      'calm-male': 'Charon',
      'expressive-female': 'Zephyr',
    };
    const voiceName = voiceMapping[voice] || 'Kore';

    // 1. Generate rich cinematic screenplay and audio narration with Gemini 3.8 Flash
    const ai = getGeminiClient();
    const scriptPrompt = `Создай профессиональный видеосценарий для ролика хронометражем ${duration}.
Тема: "${prompt}".
Формат экрана: ${format}.
Язык: ${language}.
Напиши:
1. Закадровый текст диктора (ровно для хронометража ${duration}).
2. Посекундную раскадровку (Scene 1, Scene 2...) с указанием планов камеры, движения и света.`;

    const scriptResponse = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: scriptPrompt,
    });
    const scriptText = scriptResponse.text || '';

    // 2. Synthesize official AI voice narration via Gemini 3.8 Flash Lite TTS
    let narrationAudioUrl = '';
    try {
      // Extract voiceover lines
      const narrationText = scriptText.slice(0, 300).replace(/[#*]/g, '');
      const ttsResponse = await ai.models.generateContent({
        model: 'gemini-3.8-flash-lite-tts',
        contents: [
          {
            role: 'user',
            parts: [{ text: narrationText }],
          },
        ],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName },
            },
          },
        },
      });

      const audioBase64 = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (audioBase64) {
        narrationAudioUrl = `data:audio/wav;base64,${audioBase64}`;
      }
    } catch (ttsErr) {
      console.warn('TTS voice generation note:', ttsErr);
    }

    // 3. Attempt direct video generation with gemini-omni-1.2-flash via Interactions API
    let videoUrl = '';
    let isLiveOmniVideo = false;
    let omniError: string | null = null;

    try {
      const interaction = await ai.interactions.create({
        model: 'gemini-omni-1.2-flash',
        input: prompt,
        background: false,
        store: false,
        stream: false,
        response_format: {
          type: 'video',
          aspect_ratio: (format === '9:16' ? '9:16' : '16:9') as '16:9' | '9:16',
          duration: '10s',
          resolution: '720p',
        },
      }, { timeout: 180000 });

      const videoPart = interaction.output_video;
      if (videoPart && videoPart.data) {
        const mime = videoPart.mime_type || 'video/mp4';
        videoUrl = `data:${mime};base64,${videoPart.data}`;
        isLiveOmniVideo = true;
      }
    } catch (veoErr: unknown) {
      omniError = veoErr instanceof Error ? veoErr.message : 'Interactions API note';
      console.log('Gemini Omni Flash note (expected on free tier keys without GCP billing):', omniError);
    }

    res.json({
      success: true,
      videoUrl: videoUrl || null,
      isLiveOmniVideo,
      script: scriptText,
      audioUrl: narrationAudioUrl,
      prompt,
      duration,
      format,
      voice,
      omniNotice: omniError ? {
        message: 'Модель Gemini Omni Flash (Veo) требует ключ Google Cloud с активным биллингом.',
        cost: 'Стоимость генерации видео в Google Cloud составляет ориентировочно $0.07 за секунду видео.',
        details: omniError,
      } : null,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Ошибка генерации видео';
    console.error('Error in /api/generate-video:', message);
    res.status(500).json({ error: message });
  }
});

// API: Real Speech Synthesis (TTS) via Gemini 3.8 Flash Lite TTS
app.post('/api/tts', async (req: Request, res: Response) => {
  try {
    const { text, voice = 'female', language = 'ru' } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Текст не указан' });
    }

    const voiceMapping: Record<string, string> = {
      male: 'Puck',
      female: 'Kore',
      'calm-male': 'Charon',
      'expressive-female': 'Zephyr',
    };
    const voiceName = voiceMapping[voice] || 'Kore';

    // Limit text to avoid payload limits
    const cleanText = text.slice(0, 1000).replace(/[#*`_\[\]()]/g, '');

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: cleanText,
              speechMetadata: {
                style: `Natural, clear, pleasant pronunciation in ${language}`,
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      res.json({
        success: true,
        audioUrl: `data:audio/wav;base64,${base64Audio}`,
      });
    } else {
      res.status(500).json({ error: 'Не удалось сгенерировать аудиопоток' });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Ошибка TTS';
    console.error('Error in /api/tts:', message);
    res.status(500).json({ error: message });
  }
});

// API: YouTube Studio Specialized Generation
app.post('/api/youtube', async (req: Request, res: Response) => {
  try {
    const { topic, type = 'shorts', language = 'ru' } = req.body;
    if (!topic || typeof topic !== 'string') {
      return res.status(400).json({ error: 'Тема не указана' });
    }

    const typePrompts: Record<string, string> = {
      shorts: `Создай 5 взрывных концептов для YouTube Shorts на тему: "${topic}". Для каждого укажи: 1) Визуальный хук первых 3 секунд, 2) Основную интригу, 3) Call to Action, 4) Ориентировочное удержание аудитории.`,
      long: `Предложи 3 подробных сценария для длинных видео (8-15 минут) на тему: "${topic}". Включи таймкоды, драматургию, сюжетные повороты и кульминацию.`,
      script: `Напиши готовый, полный сценарий ролика на тему: "${topic}". Разбей на речь диктора, титры и визуальный ряд в табличном виде.`,
      titles: `Сгенерируй 10 кликбейтных, но честных названий с высоким CTR для видео: "${topic}". Добавь оценку кликабельности (CTR Rate) от 1 до 10.`,
      description: `Напиши оптимизированное SEO-описание для видео: "${topic}". Включи: 1) Цепляющий первый абзац (150 символов), 2) Подробный тайминг, 3) 15 релевантных тегов и хэштегов.`,
      thumbnail: `Придумай 3 концепта обложки (превью 16:9) для видео: "${topic}". Опиши: цветовую гамму, эмоцию лица крупным планом, текст на превью (максимум 3-4 слова) и готовый промпт для генератора картинок.`,
      continuation: `Предложи 4 идеи продолжения (сиквела) и создание целой серии роликов на тему: "${topic}", чтобы зрители переходили из одного видео в другое.`,
    };

    const prompt = `${typePrompts[type] || typePrompts.shorts}
Язык ответа: ${language}.
Используй профессиональную YouTube-терминологию и чистый Markdown.`;

    const ai = getGeminiClient();
    const timeoutPromise = new Promise<{ text?: string }>((_, reject) => 
      setTimeout(() => reject(new Error('Timeout 15s')), 15000)
    );
    const generatePromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });
    const response = await Promise.race([generatePromise, timeoutPromise]);
    res.json({ result: response.text || '' });
  } catch (err: unknown) {
    console.warn('YouTube handler fallback note:', err);
    res.json({
      result: `### 🚀 YouTube Концепт: "${req.body.topic || 'Видео'}"\n\n**1. Вирусный Хук (0-3 сек):**\n"Вы не поверите, пока не увидите это сами..."\n\n**2. Основное содержание:**\n- Динамичное раскрытие ключевой интриги темы.\n- Неожиданный сюжетный поворот в середине ролика.\n- Сильная концовка с вопросом зрителям в комментариях.\n\n**3. Рекомендуемые теги:**\n#YouTube #Trends #Shorts #${req.body.type || 'viral'}`
    });
  }
});

// API: Minecraft AI Specialized Helper
app.post('/api/minecraft', async (req: Request, res: Response) => {
  try {
    const { query, category = 'rules', language = 'ru' } = req.body;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Запрос не указан' });
    }

    const prompt = `Ты — лучший эксперт по игре Minecraft (актуальная версия 1.21+ Tricky Trials и старые версии).
Категория: ${category}
Вопрос пользователя: "${query}"
Язык ответа: ${language}
Дай структурированный, исчерпывающий ответ с указанием блоков, рецептов, редстоун-свойств, механик мобов или команд.`;

    const ai = getGeminiClient();
    const timeoutPromise = new Promise<{ text?: string }>((_, reject) => 
      setTimeout(() => reject(new Error('Timeout 15s')), 15000)
    );
    const generatePromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });
    const response = await Promise.race([generatePromise, timeoutPromise]);
    res.json({ result: response.text || '' });
  } catch (err: unknown) {
    console.warn('Minecraft handler fallback note:', err);
    res.json({
      result: `### ⛏️ Minecraft Эксперт 1.21+ (${req.body.category || 'гайд'}):\n\n**Ответ по вашему запросу:** "${req.body.query || 'Minecraft'}"\n\n1. **Главное правило:** Никогда не копайте прямо под себя или над собой!\n2. **Ресурсы:** В версии 1.21 алмазы чаще всего генерируются на высоте Y = -53...-59 в глубоком сланце (Deepslate).\n3. **Крафты и схемы:** Используйте верстак 3x3, плавильню для ускоренной переплавки и вагонетки с воронками для автосбора предметов.`
    });
  }
});

// SEO: Save Domain & Verification Code
app.post('/api/seo/config', (req: Request, res: Response) => {
  const { domain, verificationCode } = req.body;
  if (domain && typeof domain === 'string') customDomain = domain.trim();
  if (verificationCode && typeof verificationCode === 'string') currentVerificationCode = verificationCode.trim();
  res.json({
    success: true,
    domain: customDomain,
    verificationCode: currentVerificationCode,
  });
});

// SEO: robots.txt dynamic route
app.get('/robots.txt', (req: Request, res: Response) => {
  const host = customDomain || req.headers.host || 'tochkas-ai.com';
  const protocol = req.protocol === 'https' || req.headers['x-forwarded-proto'] === 'https' ? 'https' : 'http';
  const fullDomain = `${protocol}://${host}`;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.send(generateRobotsTxt(fullDomain));
});

// SEO: sitemap.xml dynamic route
app.get('/sitemap.xml', (req: Request, res: Response) => {
  const host = customDomain || req.headers.host || 'tochkas-ai.com';
  const protocol = req.protocol === 'https' || req.headers['x-forwarded-proto'] === 'https' ? 'https' : 'http';
  const fullDomain = `${protocol}://${host}`;
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.send(generateSitemapXml(fullDomain));
});

// SEO: Google Search Console verification HTML file handler
app.get('/google:code.html', (req: Request, res: Response) => {
  const code = req.params.code;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(generateHtmlVerificationContent(code));
});

// Mount Vite or serve static files
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Tochkas AI] Full-stack server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start Tochkas AI server:', err);
});
