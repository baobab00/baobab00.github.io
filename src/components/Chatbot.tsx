'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


// ── Config ────────────────────────────────────────────────
const WORKER_URL = process.env.NEXT_PUBLIC_CHATBOT_WORKER_URL || '';
const MAX_HISTORY = 20;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTED_COMMANDS = [
  { cmd: 'skills', desc: '기술 스택 조회' },
  { cmd: 'projects', desc: '프로젝트 목록' },
  { cmd: 'about', desc: '이 사람에 대해' },
];

// ── Fetch from Worker ─────────────────────────────────────
async function fetchReply(msgs: Message[]): Promise<string> {
  if (!WORKER_URL) {
    await new Promise((r) => setTimeout(r, 800));
    return 'Worker 미연결 — NEXT_PUBLIC_CHATBOT_WORKER_URL 환경변수를 설정하세요.';
  }
  const res = await fetch(WORKER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: msgs }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const reply = data.reply || '응답을 생성할 수 없습니다.';
  return reply.replace(/\*{1,2}([^*]+)\*{1,2}/g, '$1');
}

// ── Blinking cursor ───────────────────────────────────────
function BlinkCursor() {
  return (
    <span
      className="inline-block w-[7px] h-[14px] ml-0.5 align-middle terminal-blink-cursor"
      style={{ backgroundColor: 'var(--terminal-cursor, #22d3ee)' }}
    />
  );
}

// ── Typewriter effect for bot output ──────────────────────
function TypewriterOutput({ text, onDone }: { text: string; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    setDisplayed('');
    setDone(false);
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
        onDone?.();
      }
    }, 14);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <span>
      {displayed}
      {!done && <BlinkCursor />}
    </span>
  );
}

// ══════════════════════════════════════════════════════════
// ── Main Component ────────────────────────────────────────
// ══════════════════════════════════════════════════════════
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [typingIdx, setTypingIdx] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, typingIdx]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  // ── Send handler ───────────────────────────────────────
  const doSend = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;
      const userMsg: Message = { role: 'user', content: text.trim() };
      const history = [...messages, userMsg].slice(-MAX_HISTORY);
      setMessages(history);
      setInput('');
      setIsLoading(true);
      inputRef.current?.focus();
      try {
        const reply = await fetchReply(history);
        setMessages((prev) => {
          const updated = [...prev, { role: 'assistant' as const, content: reply }];
          setTypingIdx(updated.length - 1);
          return updated;
        });
      } catch {
        setMessages((prev) => {
          const updated = [
            ...prev,
            { role: 'assistant' as const, content: '이런, 박해남에게 결제 요청을 보내야겠어요. 도와주시겠어요? phn00dev@gmail.com' },
          ];
          setTypingIdx(updated.length - 1);
          return updated;
        });
      } finally {
        setIsLoading(false);
        inputRef.current?.focus();
      }
    },
    [isLoading, messages],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      doSend(input);
    }
  };

  const handleCommand = (cmd: string) => {
    const cmdMap: Record<string, string> = {
      skills: '주요 기술 스택이 궁금해요',
      projects: '대표 프로젝트를 소개해주세요',
      about: '이 분의 강점은 뭔가요?',
    };
    const text = cmdMap[cmd] || cmd;
    const userMsg: Message = { role: 'user', content: text };
    setMessages([userMsg]);
    setIsLoading(true);
    fetchReply([userMsg])
      .then((reply) => {
        setMessages((prev) => {
          const updated = [...prev, { role: 'assistant' as const, content: reply }];
          setTypingIdx(updated.length - 1);
          return updated;
        });
      })
      .catch(() => {
        setMessages((prev) => {
          const updated = [
            ...prev,
            { role: 'assistant' as const, content: '이런, 박해남에게 결제 요청을 보내야겠어요. 도와주시겠어요? phn00dev@gmail.com' },
          ];
          setTypingIdx(updated.length - 1);
          return updated;
        });
      })
      .finally(() => {
        setIsLoading(false);
        inputRef.current?.focus();
      });
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════════
       *  Recovery tab (shown when FAB is hidden on mobile)
       * ═══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isHidden && !isOpen && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsHidden(false)}
            className="fixed bottom-6 right-0 z-[9999] terminal-recovery-tab"
            aria-label="챗봇 버튼 복원"
          >
            <span className="terminal-recovery-icon">{'>'}_</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════
       *  Floating Trigger
       * ═══════════════════════════════════════════════════ */}
      <motion.button
        onClick={() => { if (!isHidden) setIsOpen(!isOpen); }}
        onTouchStart={() => {
          if (isOpen) return;
          longPressTimer.current = setTimeout(() => setIsHidden(true), 600);
        }}
        onTouchEnd={() => {
          if (longPressTimer.current) { clearTimeout(longPressTimer.current); longPressTimer.current = null; }
        }}
        onTouchMove={() => {
          if (longPressTimer.current) { clearTimeout(longPressTimer.current); longPressTimer.current = null; }
        }}
        className={`fixed bottom-6 right-6 z-[9999] group transition-all duration-300 ${
          isHidden && !isOpen ? 'pointer-events-none opacity-0 scale-75' : 'opacity-100 scale-100'
        }`}
        whileTap={{ scale: 0.92 }}
        aria-label={isOpen ? '터미널 닫기' : '터미널 열기'}
      >
        <div
          className={`terminal-fab relative flex items-center justify-center transition-all duration-300 ${
            isOpen ? 'terminal-fab--open' : ''
          }`}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-[#9aa5ce] text-lg leading-none"
                style={{ fontFamily: 'var(--font-mono-nav)' }}
              >
                &times;
              </motion.span>
            ) : (
              <motion.span
                key="prompt"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="terminal-fab-prompt"
              >
                <span className="terminal-fab-chevron">{'>'}</span>
                <span className="terminal-fab-cursor">_</span>
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Tooltip */}
        {!isOpen && (
          <span
            className="absolute right-[calc(100%+10px)] top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-md"
            style={{
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-primary)',
              fontFamily: 'var(--font-mono-nav)',
            }}
          >
            ~/haenam-bot
          </span>
        )}
      </motion.button>

      {/* ═══════════════════════════════════════════════════
       *  Terminal Panel
       * ═══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop to prevent background scroll on mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9997] sm:hidden"
              onClick={() => setIsOpen(false)}
              onTouchMove={(e) => e.preventDefault()}
            />
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed z-[9998] rounded-xl overflow-hidden flex flex-col terminal-panel sm:bottom-24 sm:right-6 sm:w-[420px] max-sm:bottom-20 max-sm:right-4 max-sm:left-4"
            style={{
              height: 'min(560px, calc(100vh - 140px))',
            }}
          >
            {/* ── Title bar (macOS-style) ────────────────── */}
            <div className="terminal-titlebar shrink-0 flex items-center px-4 py-2.5 select-none">
              {/* Traffic lights */}
              <div className="flex items-center gap-[7px]">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-[13px] h-[13px] rounded-full bg-[#ff5f57] border border-[#e0443e] hover:brightness-110 transition-all"
                  aria-label="닫기"
                />
                <button
                  className="w-[13px] h-[13px] rounded-full bg-[#febc2e] border border-[#d4a028] cursor-default"
                  aria-label="최소화"
                />
                <button
                  className="w-[13px] h-[13px] rounded-full bg-[#28c840] border border-[#1fa834] cursor-default"
                  aria-label="확대"
                />
              </div>
              {/* Spacer */}
              <div className="flex-1" />
              {/* Reset button */}
              <button
                onClick={() => { setMessages([]); setTypingIdx(null); }}
                className="terminal-reset-btn px-2 py-0.5 rounded text-[11px] font-mono transition-colors"
                title="clear"
              >
                clear
              </button>
            </div>

            {/* ── Terminal body ──────────────────────────── */}
            <div className="flex-1 overflow-y-auto px-4 py-3 terminal-body chatbot-scrollbar">
              {/* Welcome / MOTD */}
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  {/* ASCII art header */}
                  <pre className="terminal-ascii text-[14px] leading-[1.3] mb-3 select-none overflow-hidden">
{`╦ ╦╔═╗╔═╗╔╗╔╔═╗╔╦╗  ╔╗ ╔═╗╔╦╗
╠═╣╠═╣╠╣ ║║║╠═╣║║║  ╠╩╗║ ║ ║
╩ ╩╩ ╩╚═╝╝╚╝╩ ╩╩ ╩  ╚═╝╚═╝ ╩`}
                  </pre>

                  <div className="terminal-motd text-[12px] leading-relaxed mb-4 space-y-1">
                    <p className="terminal-comment"><span className="terminal-hash">#</span> Portfolio AI Assistant</p>
                    <p className="terminal-comment"><span className="terminal-hash">#</span> 이력서 · 프로젝트 정보를 기반으로 응답합니다</p>
                    <p className="terminal-comment"><span className="terminal-hash">#</span> 아래 명령어를 실행하거나 자유롭게 질문하세요</p>
                  </div>

                  {/* Command suggestions */}
                  <div className="space-y-1.5 mb-3">
                    {SUGGESTED_COMMANDS.map((item) => (
                      <motion.button
                        key={item.cmd}
                        onClick={() => handleCommand(item.cmd)}
                        className="terminal-cmd-btn flex items-center gap-2 w-full text-left text-[12px] px-2.5 py-1.5 rounded-md transition-all"
                        whileHover={{ x: 2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="terminal-prompt-symbol">$</span>
                        <span className="terminal-cmd-name">{item.cmd}</span>
                        <span className="terminal-cmd-desc ml-auto">— {item.desc}</span>
                      </motion.button>
                    ))}
                  </div>

                  <div className="terminal-divider h-px mb-3" />
                </motion.div>
              )}

              {/* Message list */}
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className="mb-3"
                >
                  {msg.role === 'user' ? (
                    /* ── User input line ─── */
                    <div className="flex items-start gap-1.5 text-[12px] leading-relaxed">
                      <span className="terminal-prompt shrink-0">
                        <span className="terminal-user">visitor</span>
                        <span className="terminal-at hidden sm:inline">@</span>
                        <span className="terminal-host hidden sm:inline">portfolio</span>
                        <span className="terminal-colon">:</span>
                        <span className="terminal-path">~</span>
                        <span className="terminal-dollar"> $</span>
                      </span>
                      <span className="terminal-user-input">{msg.content}</span>
                    </div>
                  ) : (
                    /* ── Bot output ──────── */
                    <div className="terminal-output text-[12px] leading-[1.75] whitespace-pre-wrap">
                      {typingIdx === i ? (
                        <TypewriterOutput
                          text={msg.content}
                          onDone={() => setTypingIdx(null)}
                        />
                      ) : (
                        msg.content
                      )}
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-[12px] mb-3"
                >
                  <span className="terminal-loading">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      className="inline-block"
                    >
                      ⠋
                    </motion.span>
                  </span>
                  <span className="terminal-loading-text">processing...</span>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Input line ────────────────────────────── */}
            <div className="terminal-input-area shrink-0 px-4 py-2.5">
              <div className="flex items-center gap-1.5 text-[12px]">
                <span className="terminal-prompt shrink-0">
                  <span className="terminal-user">visitor</span>
                  <span className="terminal-at hidden sm:inline">@</span>
                  <span className="terminal-host hidden sm:inline">portfolio</span>
                  <span className="terminal-colon">:</span>
                  <span className="terminal-path">~</span>
                  <span className="terminal-dollar"> $</span>
                </span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder=""
                  className="terminal-input flex-1 bg-transparent outline-none text-[13px]"
                  style={{ caretColor: 'var(--terminal-cursor, #22d3ee)' }}
                  disabled={isLoading}
                />
              </div>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
