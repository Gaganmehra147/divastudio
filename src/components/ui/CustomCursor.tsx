'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    // Check if device supports touch
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (hasTouch || window.innerWidth < 1024) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check for cursor target
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

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-[99999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
      }}
      transition={{
        type: 'spring',
        damping: 30,
        stiffness: 350,
        mass: 0.15,
      }}
    >
      <motion.div
        animate={{
          scale: cursorText ? 1 : isHovered ? 1.5 : 1,
          backgroundColor: cursorText ? 'rgba(26, 25, 24, 0.92)' : isHovered ? 'rgba(191, 161, 117, 0.3)' : 'rgba(26, 25, 24, 0.7)',
          width: cursorText ? 80 : isHovered ? 38 : 12,
          height: cursorText ? 80 : isHovered ? 38 : 12,
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
