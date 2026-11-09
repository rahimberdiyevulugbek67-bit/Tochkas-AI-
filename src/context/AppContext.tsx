import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Language, 
  ActiveTab, 
  UserProfile, 
  ChatMessage, 
  GeneratedImage, 
  GeneratedVideo, 
  YouTubeGeneration 
} from '../types';
import { translations, Translations } from '../utils/i18n';

interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  user: UserProfile | null;
  loginWithGoogle: (customData?: Partial<UserProfile>) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
  
  // History and Creations
  chatMessages: ChatMessage[];
  addChatMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => ChatMessage;
  clearChatMessages: () => void;
  images: GeneratedImage[];
  addImage: (image: Omit<GeneratedImage, 'id' | 'createdAt'>) => void;
  deleteImage: (id: string) => void;
  videos: GeneratedVideo[];
  addVideo: (video: Omit<GeneratedVideo, 'id' | 'createdAt'>) => void;
  youtubeItems: YouTubeGeneration[];
  addYouTubeItem: (item: Omit<YouTubeGeneration, 'id' | 'createdAt'>) => void;
  clearAllHistory: () => void;

  // Toast
  toasts: ToastNotification[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Language
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('tochkas_lang') as Language;
    return saved && ['ru', 'uz', 'en', 'zh'].includes(saved) ? saved : 'ru';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('tochkas_lang', lang);
    showToast(translations[lang].success, 'success');
  };

  const t = translations[language] || translations.ru;

  // Navigation
  const [activeTab, setActiveTab] = useState<ActiveTab>('chat');

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // User
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('tochkas_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  };

  // Google Login
  const loginWithGoogle = (customData?: Partial<UserProfile>) => {
    const newUser: UserProfile = {
      id: customData?.id || 'usr_' + Math.random().toString(36).substring(2, 10),
      name: customData?.name || 'Ulugbek Rahimberdiyev',
      email: customData?.email || 'rahimberdiyevulugbek67@gmail.com',
      avatar: customData?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      provider: 'google',
      createdAt: customData?.createdAt || new Date().toLocaleDateString(),
      plan: 'pro',
      credits: 500,
    };
    setUser(newUser);
    localStorage.setItem('tochkas_user', JSON.stringify(newUser));
    setIsAuthModalOpen(false);
    showToast(t.loginSuccess, 'success');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tochkas_user');
    setIsProfileModalOpen(false);
    showToast(t.logoutSuccess, 'info');
  };

  // Chat History
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('tochkas_chat_msgs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('tochkas_chat_msgs', JSON.stringify(chatMessages));
  }, [chatMessages]);

  const addChatMessage = (msg: Omit<ChatMessage, 'id' | 'timestamp'>): ChatMessage => {
    const newMsg: ChatMessage = {
      ...msg,
      id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      timestamp: Date.now(),
    };
    setChatMessages((prev) => [...prev, newMsg]);
    return newMsg;
  };

  const clearChatMessages = () => {
    setChatMessages([]);
    localStorage.removeItem('tochkas_chat_msgs');
    showToast(t.clearChat, 'info');
  };

  // Images
  const [images, setImages] = useState<GeneratedImage[]>(() => {
    const saved = localStorage.getItem('tochkas_images');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('tochkas_images', JSON.stringify(images));
  }, [images]);

  const addImage = (img: Omit<GeneratedImage, 'id' | 'createdAt'>) => {
    const newImg: GeneratedImage = {
      ...img,
      id: 'img_' + Date.now(),
      createdAt: Date.now(),
    };
    setImages((prev) => [newImg, ...prev]);
  };

  const deleteImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  // Videos
  const [videos, setVideos] = useState<GeneratedVideo[]>(() => {
    const saved = localStorage.getItem('tochkas_videos');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('tochkas_videos', JSON.stringify(videos));
  }, [videos]);

  const addVideo = (vid: Omit<GeneratedVideo, 'id' | 'createdAt'>) => {
    const newVid: GeneratedVideo = {
      ...vid,
      id: 'vid_' + Date.now(),
      createdAt: Date.now(),
    };
    setVideos((prev) => [newVid, ...prev]);
  };

  // YouTube Items
  const [youtubeItems, setYoutubeItems] = useState<YouTubeGeneration[]>(() => {
    const saved = localStorage.getItem('tochkas_yt_items');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('tochkas_yt_items', JSON.stringify(youtubeItems));
  }, [youtubeItems]);

  const addYouTubeItem = (item: Omit<YouTubeGeneration, 'id' | 'createdAt'>) => {
    const newItem: YouTubeGeneration = {
      ...item,
      id: 'yt_' + Date.now(),
      createdAt: Date.now(),
    };
    setYoutubeItems((prev) => [newItem, ...prev]);
  };

  const clearAllHistory = () => {
    setChatMessages([]);
    setImages([]);
    setVideos([]);
    setYoutubeItems([]);
    localStorage.removeItem('tochkas_chat_msgs');
    localStorage.removeItem('tochkas_images');
    localStorage.removeItem('tochkas_videos');
    localStorage.removeItem('tochkas_yt_items');
    showToast(t.clearHistory, 'info');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        activeTab,
        setActiveTab,
        user,
        loginWithGoogle,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isProfileModalOpen,
        setIsProfileModalOpen,
        chatMessages,
        addChatMessage,
        clearChatMessages,
        images,
        addImage,
        deleteImage,
        videos,
        addVideo,
        youtubeItems,
        addYouTubeItem,
        clearAllHistory,
        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
