'use client';

import React from 'react';
import Link from 'next/link';
import { Bell, Plus, User } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  actionButton?: {
    label: string;
    href: string;
  };
}

export default function AdminHeader({
  title,
  subtitle,
  actionButton,
}: AdminHeaderProps) {
  return (
    <header className="py-4 sm:py-6 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] border-b border-[#1A1918]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-light text-[#1A1918]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-[#6A6357] font-light mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {actionButton && (
          <Link
            href={actionButton.href}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-[#1A1918] text-[#FAF7F2] text-xs uppercase tracking-wider font-medium hover:bg-[#BFA175] hover:text-[#1A1918] transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{actionButton.label}</span>
          </Link>
        )}
      </div>
    </header>
  );
}
