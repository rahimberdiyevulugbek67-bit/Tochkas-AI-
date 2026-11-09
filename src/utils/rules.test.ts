import test from 'node:test';
import assert from 'node:assert/strict';
import { validateVideoParams, getVoiceConfig, formatDurationLabel } from './rules';
import { generateSitemapXml, generateRobotsTxt, generateHtmlVerificationContent } from './seo';

test('validateVideoParams succeeds with valid options', () => {
  const result = validateVideoParams({
    prompt: 'Cinematic landscape of mountains at sunset',
    duration: '20s',
    format: '16:9',
    voice: 'calm-male',
  });
  assert.equal(result.valid, true);
  assert.equal(result.error, undefined);
});

test('validateVideoParams rejects empty or too short prompt', () => {
  const result = validateVideoParams({
    prompt: '  ',
    duration: '10s',
    format: '9:16',
    voice: 'female',
  });
  assert.equal(result.valid, false);
  assert.ok(result.error?.includes('минимум 3 символа'));
});

test('validateVideoParams rejects invalid duration or format', () => {
  const badDuration = validateVideoParams({
    prompt: 'Good prompt here',
    // @ts-expect-error testing invalid duration
    duration: '500s',
    format: '16:9',
    voice: 'female',
  });
  assert.equal(badDuration.valid, false);

  const badFormat = validateVideoParams({
    prompt: 'Good prompt here',
    duration: '30s',
    // @ts-expect-error testing invalid format
    format: '4:5',
    voice: 'male',
  });
  assert.equal(badFormat.valid, false);
});

test('getVoiceConfig maps all 4 requested voices to official Gemini TTS names', () => {
  assert.equal(getVoiceConfig('male').voiceName, 'Puck');
  assert.equal(getVoiceConfig('female').voiceName, 'Kore');
  assert.equal(getVoiceConfig('calm-male').voiceName, 'Charon');
  assert.equal(getVoiceConfig('expressive-female').voiceName, 'Zephyr');
});

test('formatDurationLabel translates accurately across languages', () => {
  assert.equal(formatDurationLabel('10s', 'ru'), '10 секунд');
  assert.equal(formatDurationLabel('10s', 'uz'), '10 soniya');
  assert.equal(formatDurationLabel('10s', 'en'), '10 seconds');
  assert.equal(formatDurationLabel('10s', 'zh'), '10 秒');

  assert.equal(formatDurationLabel('100s', 'ru'), '1 мин 40 сек');
  assert.equal(formatDurationLabel('100s', 'en'), '1 min 40 sec');
});

test('generateSitemapXml produces valid XML urlset with domain', () => {
  const xml = generateSitemapXml('tochkas-ai.com');
  assert.ok(xml.includes('<?xml version="1.0" encoding="UTF-8"?>'));
  assert.ok(xml.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'));
  assert.ok(xml.includes('<loc>https://tochkas-ai.com/</loc>'));
  assert.ok(xml.includes('<loc>https://tochkas-ai.com/video</loc>'));
  assert.ok(xml.includes('<loc>https://tochkas-ai.com/minecraft</loc>'));
});

test('generateRobotsTxt produces allow directives and sitemap link', () => {
  const txt = generateRobotsTxt('https://my-domain.com');
  assert.ok(txt.includes('User-agent: *'));
  assert.ok(txt.includes('Allow: /'));
  assert.ok(txt.includes('Sitemap: https://my-domain.com/sitemap.xml'));
});

test('generateHtmlVerificationContent formats Google Search Console verification code', () => {
  const code = '12345abcdef';
  const content = generateHtmlVerificationContent(code);
  assert.equal(content, 'google-site-verification: google12345abcdef.html');
});
