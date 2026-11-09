import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { runSeoAudit, SeoAuditResult, generateHtmlVerificationContent } from '../utils/seo';
import { 
  Search, 
  Globe, 
  FileCode, 
  Download, 
  Copy, 
  Check, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  Server, 
  ShieldCheck,
  Smartphone,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const SeoConsoleSection: React.FC = () => {
  const { t, showToast } = useApp();

  const [domain, setDomain] = useState(() => localStorage.getItem('tochkas_domain') || 'tochkas-ai.com');
  const [verificationCode, setVerificationCode] = useState(() => localStorage.getItem('tochkas_gsc_code') || 'tochkas-ai-gsc-verification-code');
  const [copiedMeta, setCopiedMeta] = useState(false);
  const [copiedDns, setCopiedDns] = useState(false);
  const [auditResult, setAuditResult] = useState<SeoAuditResult | null>(() => runSeoAudit(domain, verificationCode));
  const [isAuditing, setIsAuditing] = useState(false);

  const handleSaveDomain = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    localStorage.setItem('tochkas_domain', domain);
    localStorage.setItem('tochkas_gsc_code', verificationCode);

    try {
      await fetch('/api/seo/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain, verificationCode }),
      });
      showToast('Домен и код верификации успешно сохранены!', 'success');
      runAuditNow();
    } catch {
      showToast('Конфигурация сохранена локально', 'info');
    }
  };

  const runAuditNow = () => {
    setIsAuditing(true);
    setTimeout(() => {
      const res = runSeoAudit(domain, verificationCode);
      setAuditResult(res);
      setIsAuditing(false);
      showToast('SEO аудит завершен!', 'success');
    }, 500);
  };

  const downloadHtmlFile = () => {
    const content = generateHtmlVerificationContent(verificationCode);
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `google${verificationCode.trim()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('HTML-файл верификации скачан!', 'success');
  };

  const copyMetaTag = () => {
    const metaTag = `<meta name="google-site-verification" content="${verificationCode.trim()}" />`;
    navigator.clipboard.writeText(metaTag);
    setCopiedMeta(true);
    showToast('Meta-тег скопирован в буфер обмена!', 'success');
    setTimeout(() => setCopiedMeta(false), 2000);
  };

  const copyDnsRecord = () => {
    const dnsValue = `google-site-verification=${verificationCode.trim()}`;
    navigator.clipboard.writeText(dnsValue);
    setCopiedDns(true);
    showToast('Значение DNS TXT скопировано!', 'success');
    setTimeout(() => setCopiedDns(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-[#050A18] via-[#081026] to-[#040814] text-slate-100">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/40 text-blue-300 text-xs font-semibold mb-3">
            <Search className="w-3.5 h-3.5" />
            <span>Google Search Console Integration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t.seoTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            {t.seoSubtitle}
          </p>
        </div>

        {/* Warning Banner */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-200/90 leading-relaxed">
            <span className="font-bold text-amber-300">Важно:</span> {t.seoImportantNote} Tochkas AI уже содержит полностью валидные sitemap.xml, robots.txt и мета-разметку, готовые для подтверждения в Google.
          </div>
        </div>

        {/* Audit Score Card */}
        {auditResult && (
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0B142E] to-[#080E24] border border-[#D4AF37]/40 shadow-2xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                  <span>{t.seoAuditTitle}</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Проверка технической оптимизации для поисковых краулеров Googlebot
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-2xl font-extrabold text-[#D4AF37]">
                    {auditResult.score}%
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">
                    Индекс готовности
                  </div>
                </div>

                <button
                  onClick={runAuditNow}
                  disabled={isAuditing}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-slate-700 text-xs font-semibold transition-all cursor-pointer"
                >
                  {isAuditing ? t.seoAuditAuditing : t.seoAuditRun}
                </button>
              </div>
            </div>

            {/* Checklist items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {auditResult.checks.map((check) => (
                <div
                  key={check.id}
                  className="p-3.5 rounded-xl bg-[#060B18] border border-slate-800 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">{check.label}</span>
                    {check.status === 'pass' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Готово</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Требует внимания</span>
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    {check.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step-by-Step Setup Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Step 1: Domain Setup */}
          <div className="p-5 rounded-2xl bg-[#0B132B] border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#D4AF37]" />
              <span>{t.seoStepDomain}</span>
            </h3>

            <div className="space-y-3">
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder={t.seoDomainPlaceholder}
                className="w-full p-3 bg-[#060B18] border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
              />

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Код верификации из Search Console (хэш):
                </label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="например: d7ab82f91c53..."
                  className="w-full p-3 bg-[#060B18] border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <button
                type="button"
                onClick={handleSaveDomain}
                className="w-full py-2.5 px-4 rounded-xl bg-[#D4AF37] text-slate-950 font-bold text-xs hover:brightness-110 transition-all cursor-pointer"
              >
                Сохранить настройки домена
              </button>
            </div>
          </div>

          {/* Step 2: Verification Methods */}
          <div className="p-5 rounded-2xl bg-[#0B132B] border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileCode className="w-4 h-4 text-[#D4AF37]" />
              <span>Способы подтверждения Google Search Console</span>
            </h3>

            <div className="space-y-3 text-xs">
              {/* Method A: HTML file */}
              <div className="p-3 rounded-xl bg-[#060B18] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200">Метод 1: HTML-файл</span>
                  <span className="text-[10px] text-emerald-400 font-mono">
                    /google{verificationCode.trim()}.html
                  </span>
                </div>
                <button
                  type="button"
                  onClick={downloadHtmlFile}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-amber-200 border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.seoDownloadHtmlFile}</span>
                </button>
              </div>

              {/* Method B: HTML Meta Tag */}
              <div className="p-3 rounded-xl bg-[#060B18] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200">Метод 2: HTML Meta Tag</span>
                </div>
                <button
                  type="button"
                  onClick={copyMetaTag}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-amber-200 border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  {copiedMeta ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedMeta ? t.copied : t.seoCopyMetaTag}</span>
                </button>
              </div>

              {/* Method C: DNS TXT Record */}
              <div className="p-3 rounded-xl bg-[#060B18] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200">Метод 3: DNS TXT Запись</span>
                </div>
                <button
                  type="button"
                  onClick={copyDnsRecord}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-amber-200 border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  {copiedDns ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedDns ? t.copied : 'Скопировать DNS TXT запись'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Live robots.txt and sitemap.xml */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-[#0B132B] border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                {t.seoRobotsTxtTitle}
              </h3>
              <a
                href="/robots.txt"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs text-[#D4AF37] hover:underline"
              >
                <span>{t.seoRobotsView}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <pre className="p-3 bg-[#060B18] border border-slate-800 rounded-xl text-[11px] text-slate-300 font-mono overflow-x-auto">
{`User-agent: *
Allow: /
Allow: /chat
Allow: /images
Allow: /video
Allow: /voice
Allow: /youtube
Allow: /minecraft
Allow: /seo
Disallow: /api/
Sitemap: https://${domain}/sitemap.xml`}
            </pre>
          </div>

          <div className="p-5 rounded-2xl bg-[#0B132B] border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                {t.seoSitemapTitle}
              </h3>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs text-[#D4AF37] hover:underline"
              >
                <span>{t.seoSitemapView}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <pre className="p-3 bg-[#060B18] border border-slate-800 rounded-xl text-[11px] text-slate-300 font-mono overflow-x-auto">
{`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://${domain}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://${domain}/chat</loc>
    <priority>0.9</priority>
  </url>
</urlset>`}
            </pre>
          </div>
        </div>

        {/* 24/7 Hosting and Replit / Custom Domain Guide */}
        <div className="p-6 rounded-2xl bg-[#091024] border border-[#D4AF37]/35 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Server className="w-5 h-5 text-[#D4AF37]" />
            <span>{t.seoReplitDeployTitle}</span>
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed">
            {t.seoReplitDeployDesc}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-white/5 border border-slate-800 space-y-1.5">
              <div className="font-bold text-amber-300">1. Круглосуточный хостинг</div>
              <p className="text-slate-400 text-[11px]">
                В Replit включите режим <span className="text-white font-mono">Always-On</span> или разверните на Cloud Run / VPS.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-slate-800 space-y-1.5">
              <div className="font-bold text-amber-300">2. Подключение домена</div>
              <p className="text-slate-400 text-[11px]">
                В панели управления доменом укажите CNAME или A-запись на адрес сервера.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-slate-800 space-y-1.5">
              <div className="font-bold text-amber-300">3. Добавление в Search Console</div>
              <p className="text-slate-400 text-[11px]">
                В кабинете <span className="text-white font-mono">search.google.com</span> нажмите «Добавить ресурс» и выберите «Префикс URL».
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
