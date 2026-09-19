'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { damping: 28, stiffness: 350, mass: 0.1 });
  const springY = useSpring(cursorY, { damping: 28, stiffness: 350, mass: 0.1 });

  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (hasTouch || window.innerWidth < 1024) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);

      const target = (e.target as HTMLElement)?.closest('[data-cursor]');
      if (target) {
        const text = target.getAttribute('data-cursor') || '';
        setCursorText(text.toUpperCase());
        setIsHovered(true);
      } else {
        const isClickable = (e.target as HTMLElement)?.closest('a, button, input, select, textarea');
        if (isClickable) {
          setCursorText('');
          setIsHovered(true);
        } else {
          setCursorText('');
          setIsHovered(false);
        }
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [cursorX, cursorY]);

  if (!isMounted || !isVisible) return null;

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
      }}
      className="fixed top-0 left-0 pointer-events-none z-[99999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        animate={{
          scale: cursorText ? 1 : isHovered ? 1.4 : 1,
          backgroundColor: cursorText ? 'rgba(26, 25, 24, 0.92)' : isHovered ? 'rgba(191, 161, 117, 0.25)' : 'rgba(26, 25, 24, 0.65)',
          width: cursorText ? 76 : isHovered ? 36 : 10,
          height: cursorText ? 76 : isHovered ? 36 : 10,
          borderColor: isHovered ? '#BFA175' : 'transparent',
          borderWidth: isHovered && !cursorText ? 1 : 0,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="rounded-full flex items-center justify-center backdrop-blur-[2px] shadow-sm text-center px-2"
      >
        <AnimatePresence>
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-[10px] tracking-[0.16em] uppercase font-medium text-[#FAF7F2] select-none"
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
