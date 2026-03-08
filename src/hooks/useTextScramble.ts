'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

const MIN_SCRAMBLE_CYCLES = 8; // minimum full-scramble ticks before resolving

interface UseTextScrambleOptions {
  text: string;
  speed?: number;      // ms per character resolve
}

export function useTextScramble({ text, speed = 30 }: UseTextScrambleOptions) {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const len = text.length;
    let tick = 0;

    intervalRef.current = setInterval(() => {
      // How many characters are resolved so far
      // Don't start resolving until we've done MIN_SCRAMBLE_CYCLES of pure chaos
      const resolvedCount = tick < MIN_SCRAMBLE_CYCLES ? 0 : Math.max(0, tick - MIN_SCRAMBLE_CYCLES);

      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < resolvedCount) return text[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      tick += 1;
      if (resolvedCount > len) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplay(text);
      }
    }, speed);
  }, [text, speed]);

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDisplay(text);
  }, [text]);

  // Update display when text changes
  useEffect(() => {
    setDisplay(text);
  }, [text]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { display, scramble, reset };
}
