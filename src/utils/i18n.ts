import { Language } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  badgePro: string;
  
  // Navigation
  navChat: string;
  navImages: string;
  navVideo: string;
  navVoice: string;
  navYouTube: string;
  navMinecraft: string;
  navSEO: string;
  navProfile: string;
  navSettings: string;
  
  // Auth
  authTitle: string;
  authSubtitle: string;
  signInWithGoogle: string;
  signOut: string;
  profileCabinet: string;
  userEmail: string;
  userJoined: string;
  userPlan: string;
  planFree: string;
  planPro: string;
  generationHistory: string;
  noHistoryYet: string;
  clearHistory: string;
  loginSuccess: string;
  logoutSuccess: string;
  guestUser: string;
  loginToSave: string;
  
  // Chat
  chatPlaceholder: string;
  send: string;
  stop: string;
  copy: string;
  copied: string;
  playAudio: string;
  chatWelcomeTitle: string;
  chatWelcomeDesc: string;
  quickPromptsTitle: string;
  promptMinecraftSurvival: string;
  promptYouTubeIdea: string;
  promptPythonScript: string;
  promptAiFuture: string;
  clearChat: string;
  
  // Images
  imageTitle: string;
  imageSubtitle: string;
  imagePromptPlaceholder: string;
  categoryAvatar: string;
  categoryThumbnail: string;
  categoryMinecraft: string;
  categoryRealistic: string;
  aspectRatio: string;
  generateImage: string;
  generatingImage: string;
  downloadImage: string;
  imageHistory: string;
  noImagesYet: string;
  
  // Video
  videoTitle: string;
  videoSubtitle: string;
  videoPromptLabel: string;
  videoPromptPlaceholder: string;
  micButton: string;
  durationLabel: string;
  duration10s: string;
  duration20s: string;
  duration30s: string;
  duration60s: string;
  duration100s: string;
  formatLabel: string;
  formatLandscape: string;
  formatPortrait: string;
  formatSquare: string;
  voiceLabel: string;
  voiceMale: string;
  voiceFemale: string;
  voiceCalmMale: string;
  voiceExpressiveFemale: string;
  generateVideo: string;
  generatingVideo: string;
  videoStatusProcessing: string;
  videoStatusCompleted: string;
  videoStatusFailed: string;
  videoHistory: string;
  noVideosYet: string;
  paidApiNoticeTitle: string;
  paidApiNoticeDesc: string;
  paidApiLearnMore: string;
  
  // Voice AI
  voiceTitle: string;
  voiceSubtitle: string;
  voiceStartListening: string;
  voiceStopListening: string;
  voiceListeningState: string;
  voiceSpeakingState: string;
  voiceIdleState: string;
  voiceSpeakNow: string;
  voiceResponsesNote: string;
  
  // YouTube Hub
  ytTitle: string;
  ytSubtitle: string;
  ytShorts: string;
  ytLong: string;
  ytScripts: string;
  ytTitles: string;
  ytDescription: string;
  ytThumbnails: string;
  ytContinuation: string;
  ytTopicPlaceholder: string;
  ytGenerateAction: string;
  ytGenerating: string;
  ytResultTitle: string;
  
  // Minecraft Guide
  mcTitle: string;
  mcSubtitle: string;
  mcSurvivalRules: string;
  mcCrafting: string;
  mcRedstone: string;
  mcModsGuide: string;
  mcCommands: string;
  mcAskGuide: string;
  mcAskPlaceholder: string;
  mcAskButton: string;
  
  // Google Search Console & SEO
  seoTitle: string;
  seoSubtitle: string;
  seoStepDomain: string;
  seoDomainPlaceholder: string;
  seoStepHtmlVerification: string;
  seoDownloadHtmlFile: string;
  seoStepMetaTag: string;
  seoCopyMetaTag: string;
  seoRobotsTxtTitle: string;
  seoRobotsView: string;
  seoSitemapTitle: string;
  seoSitemapView: string;
  seoAuditTitle: string;
  seoAuditRun: string;
  seoAuditAuditing: string;
  seoReplitDeployTitle: string;
  seoReplitDeployDesc: string;
  seoImportantNote: string;
  
  // Common
  loading: string;
  error: string;
  success: string;
  close: string;
  save: string;
}

export const translations: Record<Language, Translations> = {
  ru: {
    appName: 'Tochkas AI',
    tagline: 'Современный портал искусственного интеллекта нового поколения',
    badgePro: 'PREMIUM',
    navChat: 'AI Чат',
    navImages: 'Создать фото',
    navVideo: 'Создать видео',
    navVoice: 'Голосовой AI',
    navYouTube: 'YouTube Идеи',
    navMinecraft: 'Minecraft AI',
    navSEO: 'Google Console & SEO',
    navProfile: 'Личный кабинет',
    navSettings: 'Настройки',
    authTitle: 'Google Авторизация',
    authSubtitle: 'Безопасный вход в Tochkas AI для сохранения генераций и доступа ко всем моделям',
    signInWithGoogle: 'Войти через Google',
    signOut: 'Выйти из аккаунта',
    profileCabinet: 'Личный кабинет пользователя',
    userEmail: 'Почта аккаунта',
    userJoined: 'Дата регистрации',
    userPlan: 'Тарифный план',
    planFree: 'Базовый (AI Free)',
    planPro: 'Tochkas AI Pro',
    generationHistory: 'История генераций и чатов',
    noHistoryYet: 'У вас пока нет сохранённых генераций',
    clearHistory: 'Очистить историю',
    loginSuccess: 'Вы успешно авторизованы через Google!',
    logoutSuccess: 'Вы вышли из системы',
    guestUser: 'Гость (Авторизуйтесь для синхронизации)',
    loginToSave: 'Войдите через Google, чтобы сохранять историю генераций навсегда',
    chatPlaceholder: 'Спросите что угодно у Tochkas AI...',
    send: 'Отправить',
    stop: 'Остановить',
    copy: 'Копировать',
    copied: 'Скопировано!',
    playAudio: 'Озвучить ответ',
    chatWelcomeTitle: 'Добро пожаловать в Tochkas AI',
    chatWelcomeDesc: 'Я ваш универсальный искусственный интеллект. Помогаю писать тексты, код, сценарии для YouTube, правила Minecraft и отвечать на любые вопросы на 4 языках.',
    quickPromptsTitle: 'Популярные запросы:',
    promptMinecraftSurvival: 'Расскажи 10 главных правил выживания в Minecraft для новичков',
    promptYouTubeIdea: 'Предложи 5 вирусных идей для YouTube Shorts в 2026 году',
    promptPythonScript: 'Напиши скрипт автоматизации на Python с подробными комментариями',
    promptAiFuture: 'Как технологии искусственного интеллекта изменят контент-креаторов?',
    clearChat: 'Очистить чат',
    imageTitle: 'Студия генерации изображений',
    imageSubtitle: 'Создавайте аватарки, превью для YouTube, реалистичные арты и Minecraft-изображения',
    imagePromptPlaceholder: 'Опишите изображение в деталях (например: неоновый киберпанк город с золотыми лучами)...',
    categoryAvatar: 'Аватарка YouTube',
    categoryThumbnail: 'Превью YouTube (16:9)',
    categoryMinecraft: 'Minecraft арт',
    categoryRealistic: 'Реалистичное фото',
    aspectRatio: 'Соотношение сторон',
    generateImage: 'Сгенерировать изображение',
    generatingImage: 'AI генерирует изображение...',
    downloadImage: 'Скачать изображение',
    imageHistory: 'Галерея генераций',
    noImagesYet: 'Сгенерируйте своё первое изображение выше',
    videoTitle: 'Создать видео',
    videoSubtitle: 'Профессиональная генерация видеороликов с выбором формата, хронометража и голоса AI',
    videoPromptLabel: 'Опишите видео',
    videoPromptPlaceholder: 'Опишите сюжет видео, динамику камеры, объекты и атмосферу ролики...',
    micButton: 'Голосовой ввод описания',
    durationLabel: 'Выбор продолжительности',
    duration10s: '10 секунд',
    duration20s: '20 секунд',
    duration30s: '30 секунд',
    duration60s: '60 секунд',
    duration100s: '1 мин 40 сек',
    formatLabel: 'Выбор формата',
    formatLandscape: '16:9 (YouTube)',
    formatPortrait: '9:16 (Shorts/TikTok)',
    formatSquare: '1:1 (Квадрат)',
    voiceLabel: 'Выбор голоса AI',
    voiceMale: '1. Мужской (Puck)',
    voiceFemale: '2. Женский (Kore)',
    voiceCalmMale: '3. Мужской спокойный (Charon)',
    voiceExpressiveFemale: '4. Женский выразительный (Zephyr)',
    generateVideo: 'Создать видео',
    generatingVideo: 'Генерация видеоролика через Gemini Omni Flash...',
    videoStatusProcessing: 'Обработка видео...',
    videoStatusCompleted: 'Видео готово к просмотру',
    videoStatusFailed: 'Ошибка генерации видео',
    videoHistory: 'Созданные видеоролики',
    noVideosYet: 'Вы ещё не создали ни одного видео',
    paidApiNoticeTitle: 'Официальный сервис видеогенерации',
    paidApiNoticeDesc: 'Tochkas AI напрямую подключен к видеомодели Gemini Omni Flash (Veo) через Interactions API. Для безлимитного создания высококачественных видео требуется активный API-ключ с биллингом Google Cloud (~$0.07/сек). Бесплатный тестовый режим генерирует раскадровку и сценарий с синтезом голоса.',
    paidApiLearnMore: 'Тарифы и подключение Google Cloud',
    voiceTitle: 'Голосовой AI Собеседник',
    voiceSubtitle: 'Живое голосовое общение с искусственным интеллектом в реальном времени на четырёх языках',
    voiceStartListening: 'Включить микрофон',
    voiceStopListening: 'Остановить разговор',
    voiceListeningState: 'Слушаю вас... Говорите в микрофон',
    voiceSpeakingState: 'Tochkas AI говорит...',
    voiceIdleState: 'Нажмите на микрофон, чтобы начать разговор',
    voiceSpeakNow: 'Говорите сейчас...',
    voiceResponsesNote: 'Поддерживает русский, узбекский, английский и китайский языки с естественным синтезом речи.',
    ytTitle: 'YouTube Студия Креатора',
    ytSubtitle: 'Генератор вирусных идей, кликбейтных названий, сценариев, тегов и превью для блогеров',
    ytShorts: 'Идеи для Shorts',
    ytLong: 'Идеи для длинных роликов',
    ytScripts: 'Сценарии',
    ytTitles: 'Названия (CTR)',
    ytDescription: 'Описания и теги',
    ytThumbnails: 'Идеи превью',
    ytContinuation: 'Продолжения видео',
    ytTopicPlaceholder: 'Введите тему вашего канала или видео (например: выживание на одном блоке или обзор новинок AI)...',
    ytGenerateAction: 'Создать материалы для YouTube',
    ytGenerating: 'Искусственный интеллект создаёт контент...',
    ytResultTitle: 'Готовые материалы',
    mcTitle: 'Minecraft AI Эксперт',
    mcSubtitle: 'Интерактивный помощник по правилам игры, редстоуну, рецептам крафта и модам',
    mcSurvivalRules: 'Правила выживания',
    mcCrafting: 'Рецепты и зелья',
    mcRedstone: 'Редстоун-схемы',
    mcModsGuide: 'Гайд по модам (Forge/Fabric)',
    mcCommands: 'Команды и читы',
    mcAskGuide: 'Задать вопрос по Minecraft',
    mcAskPlaceholder: 'Спросите о механике, мобах, фермах опыта или модах (например: как работает ферма железа в 1.21)...',
    mcAskButton: 'Получить ответ эксперта',
    seoTitle: 'Google Search Console & SEO Подготовка',
    seoSubtitle: 'Полный комплекс для индексации сайта Tochkas AI в поисковой системе Google',
    seoStepDomain: '1. Укажите домен вашего сайта',
    seoDomainPlaceholder: 'например: tochkas-ai.com или my-app.replit.app',
    seoStepHtmlVerification: '2. Подтверждение владения через HTML-файл',
    seoDownloadHtmlFile: 'Скачать HTML-файл верификации',
    seoStepMetaTag: '3. Подтверждение через HTML-тег (meta)',
    seoCopyMetaTag: 'Скопировать meta-тег',
    seoRobotsTxtTitle: '4. Файл robots.txt для поисковых роботов Googlebot',
    seoRobotsView: 'Открыть robots.txt',
    seoSitemapTitle: '5. Карта сайта sitemap.xml',
    seoSitemapView: 'Открыть sitemap.xml',
    seoAuditTitle: '6. Автоматическая проверка индексации и SEO аудита',
    seoAuditRun: 'Проверить готовность к индексации',
    seoAuditAuditing: 'Проверяем параметры страницы...',
    seoReplitDeployTitle: '7. Публикация 24/7 и настройка через Replit / Собственный домен',
    seoReplitDeployDesc: 'Как развернуть сайт круглосуточно с постоянным адресом и поддержкой HTTPS',
    seoImportantNote: 'Важно: Google Search Console требует ручной отправки sitemap.xml в кабинете веб-мастера. Появление в выдаче обычно занимает от 1 до 7 дней.',
    loading: 'Загрузка...',
    error: 'Произошла ошибка при выполнении запроса',
    success: 'Успешно выполнено',
    close: 'Закрыть',
    save: 'Сохранить',
  },
  uz: {
    appName: 'Tochkas AI',
    tagline: 'Yangi avlod zamonaviy sun\'iy intellekt portali',
    badgePro: 'PREMIUM',
    navChat: 'AI Chat',
    navImages: 'Rasm yaratish',
    navVideo: 'Video yaratish',
    navVoice: 'Ovozli AI',
    navYouTube: 'YouTube G\'oyalar',
    navMinecraft: 'Minecraft AI',
    navSEO: 'Google Console & SEO',
    navProfile: 'Shaxsiy kabinet',
    navSettings: 'Sozlamalar',
    authTitle: 'Google orqali kirish',
    authSubtitle: 'Avlodlar tarixini saqlash va barcha modellardan to\'liq foydalanish uchun xavfsiz Google kirish',
    signInWithGoogle: 'Google orqali kirish',
    signOut: 'Akkauntdan chiqish',
    profileCabinet: 'Foydalanuvchi shaxsiy kabineti',
    userEmail: 'Akkaunt pochtasi',
    userJoined: 'Ro\'yxatdan o\'tgan sana',
    userPlan: 'Tarif rejasi',
    planFree: 'Asosiy (AI Bepul)',
    planPro: 'Tochkas AI Pro',
    generationHistory: 'Yaratilganlar va chatlar tarixi',
    noHistoryYet: 'Hali saqlangan generatsiyalar mavjud emas',
    clearHistory: 'Tarixni tozalash',
    loginSuccess: 'Google orqali muvaffaqiyatli kirdingiz!',
    logoutSuccess: 'Tizimdan chiqildi',
    guestUser: 'Mehmon (Sinxronlash uchun tizimga kiring)',
    loginToSave: 'Tarixni doimiy saqlash uchun Google orqali kiring',
    chatPlaceholder: 'Tochkas AI dan istalgan narsani so\'rang...',
    send: 'Yuborish',
    stop: 'To\'xtatish',
    copy: 'Nusxalash',
    copied: 'Nusxalandi!',
    playAudio: 'Ovoz chiqarib o\'qish',
    chatWelcomeTitle: 'Tochkas AI ga xush kelibsiz',
    chatWelcomeDesc: 'Men sizning universal sun\'iy intellektingizman. Matn, kod, YouTube ssenariylari, Minecraft qoidalari va 4 tildagi savollaringizga yordam beraman.',
    quickPromptsTitle: 'Ommabop so\'rovlar:',
    promptMinecraftSurvival: 'Yangi boshlanuvchilar uchun Minecraftda tirik qolishning 10 ta asosiy qoidasi',
    promptYouTubeIdea: '2026 yil uchun YouTube Shorts bo\'yicha 5 ta virusli g\'oya',
    promptPythonScript: 'Python dasturlash tilida tushuntirishlar bilan avtomatlashtirish skripti yozing',
    promptAiFuture: 'Sun\'iy intellekt texnologiyalari kontent yaratuvchilarga qanday ta\'sir qiladi?',
    clearChat: 'Chatni tozalash',
    imageTitle: 'Rasmlar yaratish studiyasi',
    imageSubtitle: 'YouTube avatarlari, prevyulari, realistik tasvirlar va Minecraft rasmlarini yarating',
    imagePromptPlaceholder: 'Rasm tavsifini batafsil yozing (masalan: oltin nurlar tushgan kiberpank shahar)...',
    categoryAvatar: 'YouTube Avatar',
    categoryThumbnail: 'YouTube Prevyu (16:9)',
    categoryMinecraft: 'Minecraft San\'ati',
    categoryRealistic: 'Realistik foto',
    aspectRatio: 'Tomonlar nisbati',
    generateImage: 'Rasm yaratish',
    generatingImage: 'AI rasm yaratmoqda...',
    downloadImage: 'Rasmni yuklab olish',
    imageHistory: 'Yaratilgan rasmlar galereyasi',
    noImagesYet: 'Yuqorida birinchi rasmingizni yarating',
    videoTitle: 'Video yaratish',
    videoSubtitle: 'Format, davomiylik va AI ovozini tanlash bilan professional video yaratish',
    videoPromptLabel: 'Videoni tasvirlang',
    videoPromptPlaceholder: 'Video syujeti, kamera harakati, obyektlar va muhit haqida yozing...',
    micButton: 'Ovoz orqali kiritish',
    durationLabel: 'Davomiylikni tanlang',
    duration10s: '10 soniya',
    duration20s: '20 soniya',
    duration30s: '30 soniya',
    duration60s: '60 soniya',
    duration100s: '1 daqiqa 40 soniya',
    formatLabel: 'Formatni tanlang',
    formatLandscape: '16:9 (YouTube)',
    formatPortrait: '9:16 (Shorts/Reels)',
    formatSquare: '1:1 (Kvadrat)',
    voiceLabel: 'AI Ovozini tanlang',
    voiceMale: '1. Erkak ovozi (Puck)',
    voiceFemale: '2. Ayol ovozi (Kore)',
    voiceCalmMale: '3. Xotirjam erkak (Charon)',
    voiceExpressiveFemale: '4. Ta\'sirchan ayol (Zephyr)',
    generateVideo: 'Video yaratish',
    generatingVideo: 'Gemini Omni Flash orqali video yaratilmoqda...',
    videoStatusProcessing: 'Video qayta ishlanmoqda...',
    videoStatusCompleted: 'Video tayyor',
    videoStatusFailed: 'Video yaratishda xatolik',
    videoHistory: 'Yaratilgan videolar',
    noVideosYet: 'Siz hali video yaratmadingiz',
    paidApiNoticeTitle: 'Haqiqiy video generatsiyasi servisi',
    paidApiNoticeDesc: 'Tochkas AI to\'g\'ridan-to\'g\'ri Gemini Omni Flash (Veo) modeliga ulangan. Yuqori sifatli videolarni cheklovsiz yaratish uchun Google Cloud billingli API kalit kerak (~$0.07/soniya). Bepul rejimda ovoz va ssenariy generatsiya qilinadi.',
    paidApiLearnMore: 'Google Cloud tariflari',
    voiceTitle: 'Ovozli AI Suhbatdosh',
    voiceSubtitle: 'To\'rt tilda real vaqt rejimida sun\'iy intellekt bilan jonli ovozli suhbat',
    voiceStartListening: 'Mikrofonni yoqish',
    voiceStopListening: 'Suhbatni to\'xtatish',
    voiceListeningState: 'Sizni eshityapman... Mikrofonga gapiring',
    voiceSpeakingState: 'Tochkas AI gapirmoqda...',
    voiceIdleState: 'Suhbatni boshlash uchun mikrofonga bosing',
    voiceSpeakNow: 'Hozir gapiring...',
    voiceResponsesNote: 'Tabiiy nutq sintezi bilan o\'zbek, rus, ingliz va xitoy tillarini qo\'llab-quvvatlaydi.',
    ytTitle: 'YouTube Ijodkorlar Studiyasi',
    ytSubtitle: 'Blogerlar uchun virusli g\'oyalar, sarlavhalar, ssenariy va prevyular generatori',
    ytShorts: 'Shorts uchun g\'oyalar',
    ytLong: 'Katta videolar uchun g\'oyalar',
    ytScripts: 'Ssenariylar',
    ytTitles: 'Sarlavhalar (CTR)',
    ytDescription: 'Tavsif va teglar',
    ytThumbnails: 'Prevyu g\'oyalari',
    ytContinuation: 'Video davomi g\'oyalari',
    ytTopicPlaceholder: 'Kanal yoki video mavzusini kiriting (masalan: bitta blokda omon qolish)...',
    ytGenerateAction: 'YouTube materiallarini yaratish',
    ytGenerating: 'AI kontent yaratmoqda...',
    ytResultTitle: 'Tayyor materiallar',
    mcTitle: 'Minecraft AI Eksperti',
    mcSubtitle: 'O\'yin qoidalari, redstoun, kraft retseptlari va modlar bo\'yicha yordamchi',
    mcSurvivalRules: 'Omon qolish qoidalari',
    mcCrafting: 'Retseptlar va damlamalar',
    mcRedstone: 'Redstoun sxemalari',
    mcModsGuide: 'Modlar bo\'yicha qo\'llanma (Forge/Fabric)',
    mcCommands: 'Buyruqlar va kodlar',
    mcAskGuide: 'Minecraft bo\'yicha savol berish',
    mcAskPlaceholder: 'O\'yin mexanikasi yoki modlar haqida so\'rang (masalan: temir fermasi qanday ishlaydi)...',
    mcAskButton: 'Ekspert javobini olish',
    seoTitle: 'Google Search Console & SEO Tayyorgarligi',
    seoSubtitle: 'Tochkas AI saytini Google qidiruv tizimida indeksatsiya qilish uchun to\'liq tizim',
    seoStepDomain: '1. Saytingiz domenini kiriting',
    seoDomainPlaceholder: 'masalan: tochkas-ai.com yoki sizning-sayt.replit.app',
    seoStepHtmlVerification: '2. HTML-fayl orqali tasdiqlash',
    seoDownloadHtmlFile: 'HTML tasdiqlash faylini yuklab olish',
    seoStepMetaTag: '3. Meta-teg orqali tasdiqlash',
    seoCopyMetaTag: 'Meta-tegni nusxalash',
    seoRobotsTxtTitle: '4. Googlebot uchun robots.txt fayli',
    seoRobotsView: 'robots.txt ni ko\'rish',
    seoSitemapTitle: '5. Sayt xaritasi sitemap.xml',
    seoSitemapView: 'sitemap.xml ni ko\'rish',
    seoAuditTitle: '6. Avtomatik SEO audit va indeksatsiya tekshiruvi',
    seoAuditRun: 'Indeksatsiyaga tayyorgarlikni tekshirish',
    seoAuditAuditing: 'Sahifa parametrlari tekshirilmoqda...',
    seoReplitDeployTitle: '7. Replit va shaxsiy domen orqali 24/7 nashr qilish',
    seoReplitDeployDesc: 'Saytni doimiy HTTPS va shaxsiy domen bilan kechayu-kunduz ishlashini ta\'minlash',
    seoImportantNote: 'Muhim: Google Search Console kabinetida sitemap.xml manzilini qo\'lda kiritish kerak. Qidiruvda chiqish odatda 1-7 kun oladi.',
    loading: 'Yuklanmoqda...',
    error: 'So\'rovni bajarishda xatolik yuz berdi',
    success: 'Muvaffaqiyatli bajarildi',
    close: 'Yopish',
    save: 'Saqlash',
  },
  en: {
    appName: 'Tochkas AI',
    tagline: 'Next-Generation Modern Artificial Intelligence Portal',
    badgePro: 'PREMIUM',
    navChat: 'AI Chat',
    navImages: 'Image Studio',
    navVideo: 'Video Studio',
    navVoice: 'Voice AI',
    navYouTube: 'YouTube Hub',
    navMinecraft: 'Minecraft AI',
    navSEO: 'Google Console & SEO',
    navProfile: 'Dashboard',
    navSettings: 'Settings',
    authTitle: 'Google Authentication',
    authSubtitle: 'Secure Google login to preserve your creations history and access all AI models',
    signInWithGoogle: 'Sign in with Google',
    signOut: 'Sign out',
    profileCabinet: 'User Personal Dashboard',
    userEmail: 'Account Email',
    userJoined: 'Registration Date',
    userPlan: 'Subscription Plan',
    planFree: 'Standard (AI Free)',
    planPro: 'Tochkas AI Pro',
    generationHistory: 'Generations & Chat History',
    noHistoryYet: 'No saved creations yet',
    clearHistory: 'Clear History',
    loginSuccess: 'Successfully authenticated with Google!',
    logoutSuccess: 'Signed out of system',
    guestUser: 'Guest (Sign in to sync your history)',
    loginToSave: 'Sign in with Google to permanently save your generation history',
    chatPlaceholder: 'Ask Tochkas AI anything...',
    send: 'Send',
    stop: 'Stop',
    copy: 'Copy',
    copied: 'Copied!',
    playAudio: 'Read aloud',
    chatWelcomeTitle: 'Welcome to Tochkas AI',
    chatWelcomeDesc: 'I am your versatile AI partner. I help craft articles, code, YouTube scripts, Minecraft survival guides, and answer inquiries across 4 languages.',
    quickPromptsTitle: 'Popular queries:',
    promptMinecraftSurvival: 'Explain the 10 golden rules of survival in Minecraft for beginners',
    promptYouTubeIdea: 'Give 5 viral YouTube Shorts ideas for 2026',
    promptPythonScript: 'Write an automated Python script with clean modular documentation',
    promptAiFuture: 'How will artificial intelligence revolutionize digital creators?',
    clearChat: 'Clear chat',
    imageTitle: 'AI Image Studio',
    imageSubtitle: 'Create YouTube avatars, thumbnails, Minecraft graphics, and realistic digital art',
    imagePromptPlaceholder: 'Describe your image in rich detail (e.g., cyberpunk futuristic city bathed in golden twilight)...',
    categoryAvatar: 'YouTube Avatar',
    categoryThumbnail: 'YouTube Thumbnail (16:9)',
    categoryMinecraft: 'Minecraft Art',
    categoryRealistic: 'Realistic Photo',
    aspectRatio: 'Aspect Ratio',
    generateImage: 'Generate Image',
    generatingImage: 'AI is generating image...',
    downloadImage: 'Download Image',
    imageHistory: 'Generations Gallery',
    noImagesYet: 'Generate your first visual asset above',
    videoTitle: 'Create Video',
    videoSubtitle: 'Professional AI video generator with custom duration, aspect ratio, and AI voice',
    videoPromptLabel: 'Describe the video',
    videoPromptPlaceholder: 'Detail the scene, camera movement, lighting, subjects, and cinematic mood...',
    micButton: 'Voice input description',
    durationLabel: 'Select Duration',
    duration10s: '10 seconds',
    duration20s: '20 seconds',
    duration30s: '30 seconds',
    duration60s: '60 seconds',
    duration100s: '1 min 40 sec',
    formatLabel: 'Select Format',
    formatLandscape: '16:9 (YouTube)',
    formatPortrait: '9:16 (Shorts/TikTok)',
    formatSquare: '1:1 (Square)',
    voiceLabel: 'Select AI Voice',
    voiceMale: '1. Male (Puck)',
    voiceFemale: '2. Female (Kore)',
    voiceCalmMale: '3. Calm Male (Charon)',
    voiceExpressiveFemale: '4. Expressive Female (Zephyr)',
    generateVideo: 'Generate Video',
    generatingVideo: 'Generating video via Gemini Omni Flash...',
    videoStatusProcessing: 'Processing video...',
    videoStatusCompleted: 'Video is ready to view',
    videoStatusFailed: 'Failed to generate video',
    videoHistory: 'Generated Videos',
    noVideosYet: 'You have not generated any videos yet',
    paidApiNoticeTitle: 'Official Video Generation Service',
    paidApiNoticeDesc: 'Tochkas AI integrates directly with the Gemini Omni Flash (Veo) video model via the Interactions API. Unlimited high-definition video generation requires a billing-enabled Google Cloud API key (~$0.07/sec). Free preview mode generates voice, script, and storyboard.',
    paidApiLearnMore: 'Google Cloud Pricing & Setup',
    voiceTitle: 'Voice AI Assistant',
    voiceSubtitle: 'Real-time conversational voice dialogue with AI across four supported languages',
    voiceStartListening: 'Start Microphone',
    voiceStopListening: 'End Conversation',
    voiceListeningState: 'Listening to you... Speak into your microphone',
    voiceSpeakingState: 'Tochkas AI is speaking...',
    voiceIdleState: 'Click the microphone to start talking',
    voiceSpeakNow: 'Speak now...',
    voiceResponsesNote: 'Supports Russian, Uzbek, English, and Chinese with natural vocal synthesis.',
    ytTitle: 'YouTube Creator Studio',
    ytSubtitle: 'Viral ideas, high-CTR titles, scripts, SEO tags, and thumbnail concepts for creators',
    ytShorts: 'Shorts Ideas',
    ytLong: 'Long Video Ideas',
    ytScripts: 'Video Scripts',
    ytTitles: 'High-CTR Titles',
    ytDescription: 'Descriptions & Tags',
    ytThumbnails: 'Thumbnail Prompts',
    ytContinuation: 'Video Continuations',
    ytTopicPlaceholder: 'Enter your channel topic or video theme (e.g., 100 days hardcore survival)...',
    ytGenerateAction: 'Generate YouTube Package',
    ytGenerating: 'AI is generating creative materials...',
    ytResultTitle: 'Generated Content',
    mcTitle: 'Minecraft AI Expert',
    mcSubtitle: 'Interactive guide for gameplay rules, redstone farms, crafting recipes, and mods',
    mcSurvivalRules: 'Survival Rules',
    mcCrafting: 'Crafts & Potions',
    mcRedstone: 'Redstone Circuits',
    mcModsGuide: 'Mods Guide (Forge/Fabric)',
    mcCommands: 'Commands & Cheats',
    mcAskGuide: 'Ask Minecraft Expert',
    mcAskPlaceholder: 'Ask about mechanics, mob farms, nether highways, or mods...',
    mcAskButton: 'Get Expert Answer',
    seoTitle: 'Google Search Console & SEO Readiness',
    seoSubtitle: 'End-to-end suite to index Tochkas AI into Google Search and verify site ownership',
    seoStepDomain: '1. Specify your custom or production domain',
    seoDomainPlaceholder: 'e.g., tochkas-ai.com or my-app.replit.app',
    seoStepHtmlVerification: '2. Ownership verification via HTML file',
    seoDownloadHtmlFile: 'Download HTML Verification File',
    seoStepMetaTag: '3. Ownership verification via Meta Tag',
    seoCopyMetaTag: 'Copy Meta Tag',
    seoRobotsTxtTitle: '4. robots.txt file for Googlebot crawler',
    seoRobotsView: 'View robots.txt',
    seoSitemapTitle: '5. sitemap.xml site index',
    seoSitemapView: 'View sitemap.xml',
    seoAuditTitle: '6. Automated SEO & Indexing Readiness Audit',
    seoAuditRun: 'Run Indexing Audit',
    seoAuditAuditing: 'Evaluating page attributes and mobile viewport...',
    seoReplitDeployTitle: '7. 24/7 Hosting & Deployment via Replit / Custom Domain',
    seoReplitDeployDesc: 'Deploying with 24/7 uptime, permanent address, and HTTPS encryption',
    seoImportantNote: 'Important: Submit your sitemap.xml manually in Google Search Console dashboard. Google indexing typically takes 1 to 7 business days.',
    loading: 'Loading...',
    error: 'An error occurred during request',
    success: 'Operation completed successfully',
    close: 'Close',
    save: 'Save',
  },
  zh: {
    appName: 'Tochkas AI',
    tagline: '新一代现代化人工智能全能门户',
    badgePro: '高级版',
    navChat: 'AI 对话',
    navImages: '图像工坊',
    navVideo: '视频制作',
    navVoice: '语音 AI',
    navYouTube: 'YouTube 创意',
    navMinecraft: '我的世界 AI',
    navSEO: 'Google 站长与 SEO',
    navProfile: '个人中心',
    navSettings: '设置',
    authTitle: 'Google 登录与认证',
    authSubtitle: '安全便捷的 Google 登录，随时保存生成历史并解锁全套模型',
    signInWithGoogle: '使用 Google 账号登录',
    signOut: '退出登录',
    profileCabinet: '用户个人中心',
    userEmail: '账户邮箱',
    userJoined: '注册时间',
    userPlan: '订阅计划',
    planFree: '基础版 (免费 AI)',
    planPro: 'Tochkas AI 专业版',
    generationHistory: '历史生成与对话记录',
    noHistoryYet: '暂无保存的历史记录',
    clearHistory: '清空历史',
    loginSuccess: '已成功通过 Google 授权登录！',
    logoutSuccess: '已安全退出登录',
    guestUser: '访客模式（登录以同步历史）',
    loginToSave: '使用 Google 登录即可永久云端保存生成历史',
    chatPlaceholder: '向 Tochkas AI 提出任何问题...',
    send: '发送',
    stop: '停止',
    copy: '复制',
    copied: '已复制！',
    playAudio: '朗读回答',
    chatWelcomeTitle: '欢迎体验 Tochkas AI',
    chatWelcomeDesc: '我是您的全能人工智能助手。擅长创作文章、编写代码、生成 YouTube 脚本、解答 Minecraft 规则，支持 4 种语言。',
    quickPromptsTitle: '常用提示词：',
    promptMinecraftSurvival: '向初学者介绍 Minecraft 生存模式的 10 大核心准则',
    promptYouTubeIdea: '提供 2026 年 5 个爆款 YouTube Shorts 短视频创意',
    promptPythonScript: '编写带有详细中文注释的自动化 Python 脚本',
    promptAiFuture: '人工智能未来将如何变革数字内容创作者的工作？',
    clearChat: '清空对话',
    imageTitle: 'AI 图像生成工坊',
    imageSubtitle: '生成 YouTube 头像、视频封面、Minecraft 游戏原画及逼真写实插画',
    imagePromptPlaceholder: '详细描述画面（例如：赛博朋克风格的金色晨曦未来都市）...',
    categoryAvatar: 'YouTube 头像',
    categoryThumbnail: 'YouTube 封面 (16:9)',
    categoryMinecraft: 'Minecraft 艺术画',
    categoryRealistic: '超逼真摄影',
    aspectRatio: '画面比例',
    generateImage: '生成图像',
    generatingImage: 'AI 正在渲染图像...',
    downloadImage: '下载高清原图',
    imageHistory: '生成历史图库',
    noImagesYet: '请在上方输入提示词开始创作',
    videoTitle: '创建视频',
    videoSubtitle: '专业 AI 视频生成：自定义时长、视频比例与多重 AI 拟真配音',
    videoPromptLabel: '描述视频内容',
    videoPromptPlaceholder: '详细描述场景镜头、运镜轨迹、光影质感与环境氛围...',
    micButton: '语音输入描述',
    durationLabel: '视频时长选择',
    duration10s: '10 秒',
    duration20s: '20 秒',
    duration30s: '30 秒',
    duration60s: '60 秒',
    duration100s: '1 分 40 秒',
    formatLabel: '画面规格选择',
    formatLandscape: '16:9 (横屏视频)',
    formatPortrait: '9:16 (竖屏短视频)',
    formatSquare: '1:1 (方形)',
    voiceLabel: '选择 AI 拟真声音',
    voiceMale: '1. 男声 (Puck)',
    voiceFemale: '2. 女声 (Kore)',
    voiceCalmMale: '3. 沉稳男声 (Charon)',
    voiceExpressiveFemale: '4. 抑扬女声 (Zephyr)',
    generateVideo: '开始生成视频',
    generatingVideo: '正在调用 Gemini Omni Flash 渲染视频...',
    videoStatusProcessing: '视频处理中...',
    videoStatusCompleted: '视频已生成完毕',
    videoStatusFailed: '视频生成出现异常',
    videoHistory: '已生成的视频作品',
    noVideosYet: '您尚未创建任何视频作品',
    paidApiNoticeTitle: '真实视频生成服务说明',
    paidApiNoticeDesc: 'Tochkas AI 真实对接 Gemini Omni Flash (Veo) 视频大模型。无限制高清视频生成需启用 Google Cloud 计费 API 密钥（约 $0.07/秒）。免费预览模式将提供分镜头构思与语音合成。',
    paidApiLearnMore: 'Google Cloud 价格说明',
    voiceTitle: '语音 AI 实时对谈',
    voiceSubtitle: '自然流畅的多语言实时语音对话助手',
    voiceStartListening: '开启麦克风',
    voiceStopListening: '结束通话',
    voiceListeningState: '正在聆听... 请对麦克风说话',
    voiceSpeakingState: 'Tochkas AI 正在发声...',
    voiceIdleState: '点击麦克风图标即可开始语音对话',
    voiceSpeakNow: '请开始说话...',
    voiceResponsesNote: '支持中文、俄语、乌兹别克语及英语的自然语音交互。',
    ytTitle: 'YouTube 创作者灵感工坊',
    ytSubtitle: '短视频创意、高点击率标题、脚本大纲、SEO 标签与封面灵感',
    ytShorts: 'Shorts 短视频创意',
    ytLong: '长视频选题',
    ytScripts: '文案与脚本',
    ytTitles: '爆款标题 (CTR)',
    ytDescription: '视频简介与标签',
    ytThumbnails: '封面设计构思',
    ytContinuation: '系列视频续集创意',
    ytTopicPlaceholder: '输入您的频道定位或视频主题（例如：100天极限生存挑战）...',
    ytGenerateAction: '一键生成创作者物料',
    ytGenerating: 'AI 正在全力构思内容...',
    ytResultTitle: '生成结果展示',
    mcTitle: '我的世界 (Minecraft) AI 导师',
    mcSubtitle: '涵盖生存法则、红石机械、合成配方及 Mod 模组的专业助手',
    mcSurvivalRules: '生存核心法则',
    mcCrafting: '合成表与药水配方',
    mcRedstone: '红石机械与全自动农场',
    mcModsGuide: '模组指南 (Forge/Fabric)',
    mcCommands: '指令与管理员代码',
    mcAskGuide: '咨询 Minecraft 问题',
    mcAskPlaceholder: '询问机制细节（例如：1.21 刷铁机最高效搭建原理）...',
    mcAskButton: '获取权威解答',
    seoTitle: 'Google Search Console 站长平台与 SEO',
    seoSubtitle: '全套技术方案，助力 Tochkas AI 快速被 Google 搜索引擎收录',
    seoStepDomain: '1. 配置您的独立域名或运行域名',
    seoDomainPlaceholder: '例如：tochkas-ai.com 或 app.replit.app',
    seoStepHtmlVerification: '2. 通过 HTML 文件验证网站所有权',
    seoDownloadHtmlFile: '下载 HTML 站长验证文件',
    seoStepMetaTag: '3. 通过 HTML Meta 标签验证',
    seoCopyMetaTag: '复制站长 Meta 标签',
    seoRobotsTxtTitle: '4. 面向 Googlebot 蜘蛛的 robots.txt',
    seoRobotsView: '在线查看 robots.txt',
    seoSitemapTitle: '5. 网站地图 sitemap.xml',
    seoSitemapView: '在线查看 sitemap.xml',
    seoAuditTitle: '6. 搜索引擎收录与移动端优化诊断',
    seoAuditRun: '一键运行 SEO 诊断',
    seoAuditAuditing: '正在检测页面结构与移动端适配...',
    seoReplitDeployTitle: '7. 24/7 全天候部署运行与 Replit / 自定义域名配置',
    seoReplitDeployDesc: '保持服务全天候在线、HTTPS 加密及域名解析完整指南',
    seoImportantNote: '重要提醒：完成配置后需登录 Google Search Console 提交 sitemap.xml。Google 收录审核通常需要 1 至 7 个工作日。',
    loading: '加载中...',
    error: '处理请求时发生错误',
    success: '操作成功完成',
    close: '关闭',
    save: '保存',
  }
};
