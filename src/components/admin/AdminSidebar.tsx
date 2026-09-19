'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { X, ExternalLink, LogOut,
  LayoutDashboard,
  Inbox,
  Image as ImageIcon,
  FolderTree,
  Briefcase,
  Layers,
  Quote,
  HelpCircle,
  BookOpen,
  Settings,
} from 'lucide-react';

interface AdminSidebarProps {
  /** Mobile: whether the drawer is open */
  isOpen?: boolean;
  /** Mobile: call to close the drawer */
  onClose?: () => void;
}

export default function AdminSidebar({ isOpen = true, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Enquiries CRM', href: '/admin/enquiries', icon: Inbox },
    { name: 'Portfolio Projects', href: '/admin/portfolio', icon: ImageIcon },
    { name: 'Categories', href: '/admin/categories', icon: FolderTree },
    { name: 'Services', href: '/admin/services', icon: Briefcase },
    { name: 'Pricing & Packages', href: '/admin/packages', icon: Layers },
    { name: 'Testimonials', href: '/admin/testimonials', icon: Quote },
    { name: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
    { name: 'Journal / Blog', href: '/admin/blog', icon: BookOpen },
    { name: 'Studio & Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleNavClick = () => {
    // On mobile, close drawer after navigation
    onClose?.();
  };

  const sidebarContent = (
    <aside className="w-64 bg-[#141312] text-[#FAF7F2] flex flex-col justify-between h-full">
      {/* Brand & Studio Title */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 border-b border-[#FAF7F2]/10 flex items-center justify-between">
          <Link href="/admin" onClick={handleNavClick} className="block">
            <span className="font-serif text-2xl tracking-[0.2em] uppercase font-light text-[#FAF7F2]">
              DIVASTUDIO
            </span>
            <span className="block text-[9px] uppercase tracking-[0.3em] text-[#BFA175] mt-0.5">
              Atelier CMS & CRM
            </span>
          </Link>
          {/* Close button — only shown on mobile */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden min-w-[40px] min-h-[40px] flex items-center justify-center text-[#9E9689] hover:text-[#FAF7F2] transition-colors focus:outline-none"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1" aria-label="Admin navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleNavClick}
                className={`flex items-center space-x-3 px-3.5 py-3 rounded-sm text-xs tracking-wider transition-colors min-h-[44px] ${
                  isActive
                    ? 'bg-[#BFA175] text-[#141312] font-medium'
                    : 'text-[#9E9689] hover:bg-[#FAF7F2]/5 hover:text-[#FAF7F2]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0 stroke-[1.5]" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Controls: View Public Site & Logout */}
      <div className="p-4 border-t border-[#FAF7F2]/10 space-y-1 text-xs shrink-0">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-3 text-[#9E9689] hover:text-[#FAF7F2] transition-colors min-h-[44px]"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3.5 py-3 text-red-400 hover:bg-red-500/10 transition-colors rounded-sm text-left min-h-[44px]"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Admin</span>
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop: persistent sidebar */}
      <div className="hidden lg:flex shrink-0 min-h-screen">
        {sidebarContent}
      </div>

      {/* Mobile/Tablet: overlay drawer */}
      <div className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${isOpen ? 'visible' : 'invisible'}`}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={onClose}
          aria-hidden="true"
        />
        {/* Drawer — slides in from left */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-64 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {sidebarContent}
        </div>
      </div>
    </>
  );
}
