'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoginPage) {
    return <div className="min-h-screen bg-[#141312] text-[#FAF7F2]">{children}</div>;
  }

  return (
    <div className="min-h-screen flex bg-[#FAF7F2] text-[#1A1918]">
      {/* Sidebar — desktop persistent, mobile/tablet drawer */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Mobile Top Bar — visible only below lg */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#141312] text-[#FAF7F2] border-b border-[#FAF7F2]/10 sticky top-0 z-40">
          <div>
            <span className="font-serif text-xl tracking-[0.2em] uppercase font-light">
              DIVASTUDIO
            </span>
            <span className="block text-[9px] uppercase tracking-[0.3em] text-[#BFA175]">
              Atelier CMS
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#FAF7F2] hover:text-[#BFA175] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BFA175] rounded-sm transition-colors"
            aria-label="Open admin navigation"
            aria-expanded={sidebarOpen}
            aria-haspopup="dialog"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Page Content */}
        {children}
      </div>
    </div>
  );
}
