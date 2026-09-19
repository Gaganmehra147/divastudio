'use client';

import React, { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { Save, Loader2, CheckCircle2 } from 'lucide-react';

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState<Record<string, string>>({
    hero_headline: 'Stories Worth\nRemembering.',
    hero_subheadline: 'Timeless photographs created with intention, emotion, and an eye for the details that make your story yours.',
    hero_image_desktop: '',
    statement_quote: 'PHOTOGRAPHS ARE NOT JUST IMAGES. THEY ARE PIECES OF TIME.',
    statement_story: '',
    instagram_handle: '@divastudio.official',
  });

  const [studio, setStudio] = useState({
    id: '',
    name: 'DIVASTUDIO Atelier',
    address: '128 Mercer Street, Floor 4, SoHo, New York',
    phone: '+1 (212) 847-9200',
    email: 'concierge@divastudio.com',
    whatsapp: '+1 (212) 847-9200',
    hours: 'Tue — Sat: 10AM — 6:30PM (By Appointment Only)',
  });

  const [profile, setProfile] = useState({
    id: '',
    name: 'Elena Vance & Julian Thorne',
    role: 'Founders & Creative Directors',
    portraitImage: '',
    philosophy: 'We do not photograph poses. We photograph the moments between them.',
    bio: '',
    specialties: 'Weddings, Fine Art Portraits, Maternity, Fashion',
    studioLocation: 'New York & Milan',
  });

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) setSettings((prev) => ({ ...prev, ...data.settings }));
        if (data.studio) setStudio(data.studio);
        if (data.profile) setProfile(data.profile);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings, studio, profile }),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-12 text-[#9E9689]">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        <span>Loading studio settings...</span>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#FAF7F2]">
      <AdminHeader
        title="Studio & Website Settings"
        subtitle="Manage studio coordinates, editorial hero statements, and artist biography."
      />

      <form onSubmit={handleSave} className="p-8 max-w-5xl space-y-10">
        {saved && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Studio settings saved successfully.</span>
          </div>
        )}

        {/* Studio Identity & Contact Info */}
        <div className="p-8 bg-[#FAF7F2] border border-[#1A1918]/10 space-y-6">
          <h3 className="font-serif text-2xl font-light text-[#1A1918]">
            Atelier Contact Coordinates
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-mono tracking-widest text-[#6A6357]">
                Atelier Physical Address
              </label>
              <input
                type="text"
                value={studio.address}
                onChange={(e) => setStudio({ ...studio, address: e.target.value })}
                className="w-full bg-[#FAF7F2] border border-[#1A1918]/20 p-2.5"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-mono tracking-widest text-[#6A6357]">
                Telephone Number
              </label>
              <input
                type="text"
                value={studio.phone}
                onChange={(e) => setStudio({ ...studio, phone: e.target.value })}
                className="w-full bg-[#FAF7F2] border border-[#1A1918]/20 p-2.5"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-mono tracking-widest text-[#6A6357]">
                Concierge Email
              </label>
              <input
                type="email"
                value={studio.email}
                onChange={(e) => setStudio({ ...studio, email: e.target.value })}
                className="w-full bg-[#FAF7F2] border border-[#1A1918]/20 p-2.5"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-mono tracking-widest text-[#6A6357]">
                Studio Consultation Hours
              </label>
              <input
                type="text"
                value={studio.hours}
                onChange={(e) => setStudio({ ...studio, hours: e.target.value })}
                className="w-full bg-[#FAF7F2] border border-[#1A1918]/20 p-2.5"
              />
            </div>
          </div>
        </div>

        {/* Hero Section Copy */}
        <div className="p-8 bg-[#FAF7F2] border border-[#1A1918]/10 space-y-6">
          <h3 className="font-serif text-2xl font-light text-[#1A1918]">
            Homepage Hero Editorial Statements
          </h3>

          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-mono tracking-widest text-[#6A6357]">
                Hero Headline
              </label>
              <textarea
                rows={2}
                value={settings.hero_headline}
                onChange={(e) => setSettings({ ...settings, hero_headline: e.target.value })}
                className="w-full bg-[#FAF7F2] border border-[#1A1918]/20 p-2.5 font-serif text-lg leading-tight"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-mono tracking-widest text-[#6A6357]">
                Hero Supporting Subheadline
              </label>
              <textarea
                rows={2}
                value={settings.hero_subheadline}
                onChange={(e) => setSettings({ ...settings, hero_subheadline: e.target.value })}
                className="w-full bg-[#FAF7F2] border border-[#1A1918]/20 p-2.5"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-mono tracking-widest text-[#6A6357]">
                Editorial Brand Statement Quote
              </label>
              <input
                type="text"
                value={settings.statement_quote}
                onChange={(e) => setSettings({ ...settings, statement_quote: e.target.value })}
                className="w-full bg-[#FAF7F2] border border-[#1A1918]/20 p-2.5 font-serif text-base"
              />
            </div>
          </div>
        </div>

        {/* Photographer Profile & Philosophy */}
        <div className="p-8 bg-[#FAF7F2] border border-[#1A1918]/10 space-y-6">
          <h3 className="font-serif text-2xl font-light text-[#1A1918]">
            Photographer Story & Philosophy
          </h3>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono tracking-widest text-[#6A6357]">
                  Artist / Founder Names
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-[#1A1918]/20 p-2.5"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono tracking-widest text-[#6A6357]">
                  Role Title
                </label>
                <input
                  type="text"
                  value={profile.role}
                  onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-[#1A1918]/20 p-2.5"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-mono tracking-widest text-[#6A6357]">
                Photographic Philosophy
              </label>
              <input
                type="text"
                value={profile.philosophy}
                onChange={(e) => setProfile({ ...profile, philosophy: e.target.value })}
                className="w-full bg-[#FAF7F2] border border-[#1A1918]/20 p-2.5 font-serif text-base italic"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-mono tracking-widest text-[#6A6357]">
                Biography Narrative
              </label>
              <textarea
                rows={4}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full bg-[#FAF7F2] border border-[#1A1918]/20 p-2.5 leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-[#1A1918] text-[#FAF7F2] text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#BFA175] hover:text-[#1A1918] transition-colors shadow-sm"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>Save All Studio Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
