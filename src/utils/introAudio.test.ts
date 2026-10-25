import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getIntroVoiceScript,
  sanitizeVoicePrompt,
  INTRO_VOICE_SCRIPTS,
} from './introAudio';

test('getIntroVoiceScript returns English intro containing Mehdipur Balaji Automobile', () => {
  const scriptEn = getIntroVoiceScript('en');
  assert.equal(scriptEn.lang, 'en');
  assert.ok(scriptEn.text.includes('Welcome to Mehdipur Balaji Automobile'));
  assert.ok(scriptEn.voiceName, 'Kore');
});

test('getIntroVoiceScript returns Hindi intro when requested', () => {
  const scriptHi = getIntroVoiceScript('hi');
  assert.equal(scriptHi.lang, 'hi');
  assert.ok(scriptHi.text.includes('मेंहदीपुर बालाजी ऑटोमोबाइल'));
  assert.ok(scriptHi.text.includes('स्वागत'));
});

test('getIntroVoiceScript defaults to English on unknown lang', () => {
  // @ts-ignore
  const scriptFallback = getIntroVoiceScript('fr');
  assert.equal(scriptFallback.lang, 'en');
  assert.ok(scriptFallback.text.includes('Welcome to Mehdipur Balaji Automobile'));
});

test('sanitizeVoicePrompt strips markdown formatting and normalizes whitespace', () => {
  const input = '  **Welcome** to _Mehdipur Balaji_ Automobile!   [HP Fuel]  ';
  const sanitized = sanitizeVoicePrompt(input);
  assert.equal(sanitized, 'Welcome to Mehdipur Balaji Automobile! HP Fuel');
});

test('sanitizeVoicePrompt handles empty strings cleanly', () => {
  assert.equal(sanitizeVoicePrompt(''), '');
  assert.equal(sanitizeVoicePrompt('   '), '');
});
