import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import type { ReactNode } from 'react';
import { LangProvider, useLang } from '../../hooks/useLang';

const wrapper = ({ children }: { children: ReactNode }) => (
  <LangProvider>{children}</LangProvider>
);

describe('useLang', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = '';
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('defaults to "en" on first render', () => {
    const { result } = renderHook(() => useLang(), { wrapper });
    expect(result.current.lang).toBe('en');
  });

  it('persists lang to localStorage when switching to "hi"', () => {
    const { result } = renderHook(() => useLang(), { wrapper });
    act(() => {
      result.current.setLang('hi');
    });
    expect(localStorage.getItem('wedding-lang')).toBe('hi');
  });

  it('restores persisted lang from localStorage on mount', () => {
    localStorage.setItem('wedding-lang', 'hi');
    const { result } = renderHook(() => useLang(), { wrapper });
    expect(result.current.lang).toBe('hi');
  });

  it('t() returns correct English string', () => {
    const { result } = renderHook(() => useLang(), { wrapper });
    expect(result.current.t('days')).toBe('Days');
  });

  it('t() returns correct Hindi string after setLang("hi")', () => {
    const { result } = renderHook(() => useLang(), { wrapper });
    act(() => {
      result.current.setLang('hi');
    });
    expect(result.current.t('days')).toBe('दिन');
  });

  it('t() throws in dev mode for unknown key', () => {
    vi.stubEnv('DEV', true);
    const { result } = renderHook(() => useLang(), { wrapper });
    expect(() => result.current.t('nonExistentKey_xyz_abc')).toThrow(
      '[useLang] Missing string key: "nonExistentKey_xyz_abc" for lang "en"'
    );
  });

  it('sets document.documentElement.lang when lang changes', () => {
    const { result } = renderHook(() => useLang(), { wrapper });
    act(() => {
      result.current.setLang('hi');
    });
    expect(document.documentElement.lang).toBe('hi');
  });
});
