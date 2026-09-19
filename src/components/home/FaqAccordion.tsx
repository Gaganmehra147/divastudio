'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-24 sm:py-36 bg-[#FAF7F2] text-[#1A1918]">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#9E9689] block mb-3 font-sans">
            Clarifications & Details
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#1A1918]">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-[#1A1918]/15 border-t border-b border-[#1A1918]/15">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="py-6 sm:py-8 transition-colors">
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-start justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BFA175] group min-h-[44px]"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1 pr-6">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#BFA175]">
                      {faq.category}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-light text-[#1A1918] group-hover:text-[#BFA175] transition-colors">
                      {faq.question}
                    </h3>
                  </div>

                  <span className="min-w-[40px] min-h-[40px] flex items-center justify-center text-[#1A1918] group-hover:text-[#BFA175] transition-colors shrink-0">
                    {isOpen ? <Minus className="w-5 h-5 stroke-[1.5]" /> : <Plus className="w-5 h-5 stroke-[1.5]" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-xs sm:text-sm text-[#6A6357] font-light leading-relaxed max-w-2xl">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
