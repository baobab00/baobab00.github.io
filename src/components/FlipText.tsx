'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface TypewriterTextProps {
  words: string[];
  typeSpeed?: number;
  eraseSpeed?: number;
  holdTime?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function TypewriterText({
  words,
  typeSpeed = 110,
  eraseSpeed = 55,
  holdTime = 5000,
  className = '',
  style,
}: TypewriterTextProps) {
  const [display, setDisplay] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const wordIdxRef = useRef(0);
  const charIdxRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const jitter = useCallback((base: number) => {
    return base + Math.floor(Math.random() * 60) - 20; // ±20ms wobble
  }, []);

  const tick = useCallback(() => {
    const currentWord = words[wordIdxRef.current];

    if (isTyping) {
      if (charIdxRef.current <= currentWord.length) {
        setDisplay(currentWord.slice(0, charIdxRef.current));
        charIdxRef.current++;
        timeoutRef.current = setTimeout(tick, charIdxRef.current <= currentWord.length ? jitter(typeSpeed) : holdTime);
      } else {
        setIsTyping(false);
        charIdxRef.current = currentWord.length;
        timeoutRef.current = setTimeout(tick, jitter(eraseSpeed));
      }
    } else {
      if (charIdxRef.current > 0) {
        charIdxRef.current--;
        setDisplay(currentWord.slice(0, charIdxRef.current));
        timeoutRef.current = setTimeout(tick, jitter(eraseSpeed));
      } else {
        wordIdxRef.current = (wordIdxRef.current + 1) % words.length;
        charIdxRef.current = 0;
        setIsTyping(true);
        timeoutRef.current = setTimeout(tick, typeSpeed * 3);
      }
    }
  }, [words, isTyping, typeSpeed, eraseSpeed, holdTime, jitter]);

  useEffect(() => {
    timeoutRef.current = setTimeout(tick, typeSpeed);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [tick, typeSpeed]);

  const maxLen = Math.max(...words.map(w => w.length));

  return (
    <span className={`typewriter-text ${className}`} style={{ ...style, width: `${maxLen + 2}ch` }}>
      {display}
      <span className="typewriter-cursor" />
    </span>
  );
}
