'use client';

import React, { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { formatDate } from '@/lib/utils';
import {
  Inbox,
  Filter,
  CheckCircle,
  Clock,
  Trash2,
  Edit,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  User,
  X,
  Loader2,
  Save,
} from 'lucide-react';

interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  city?: string | null;
  photographyType: string;
  preferredDate?: string | null;
  preferredTime?: string | null;
  peopleCount?: string | null;
  budget?: string | null;
  message: string;
  status: string;
  followUpDate?: string | null;
  notes?: string | null;
  createdAt: string;
}

export default function EnquiriesCrmPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [activeEnquiry, setActiveEnquiry] = useState<Enquiry | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Editable fields in modal
  const [editStatus, setEditStatus] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [editFollowUp, setEditFollowUp] = useState('');

  const statuses = ['ALL', 'NEW', 'CONTACTED', 'CONSULTATION', 'BOOKED', 'COMPLETED', 'CANCELLED'];

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const url =
        selectedStatus === 'ALL'
          ? '/api/enquiries'
          : `/api/enquiries?status=${selectedStatus}`;
      const res = await fetch(url);
      const data = await res.json();
      setEnquiries(data);
    } catch (err) {
      console.error('Failed to load enquiries', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [selectedStatus]);

  const openDetails = (enq: Enquiry) => {
    setActiveEnquiry(enq);
    setEditStatus(enq.status);
    setEditNotes(enq.notes || '');
    setEditFollowUp(enq.followUpDate || '');
  };

  const handleUpdate = async () => {
    if (!activeEnquiry) return;
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/enquiries/${activeEnquiry.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: editStatus,
          notes: editNotes,
          followUpDate: editFollowUp,
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        setEnquiries((prev) =>
          prev.map((e) => (e.id === updated.id ? updated : e))
        );
        setActiveEnquiry(updated);
        alert('Enquiry updated successfully');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this inquiry?')) return;
    try {
      const res = await fetch(`/api/enquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
        if (activeEnquiry?.id === id) setActiveEnquiry(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FAF7F2]">
      <AdminHeader
        title="Enquiries & Bookings CRM"
        subtitle="Manage client inquiries, schedule consultations, and log internal notes."
      />

      <div className="p-8 space-y-6 max-w-7xl">
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-[#1A1918]/10">
          <span className="text-xs uppercase font-mono tracking-widest text-[#9E9689] mr-2">
            Status:
          </span>
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-colors ${
                selectedStatus === st
                  ? 'bg-[#1A1918] text-[#FAF7F2]'
                  : 'bg-[#F4EFE6] text-[#6A6357] hover:bg-[#1A1918]/10'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* CRM Table */}
        <div className="bg-[#FAF7F2] border border-[#1A1918]/10 overflow-x-auto shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#1A1918]/10 bg-[#F4EFE6] text-[#6A6357] uppercase tracking-wider font-mono text-[10px]">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Discipline</th>
                <th className="p-4">Preferred Date</th>
                <th className="p-4">Budget</th>
                <th className="p-4">Status</th>
                <th className="p-4">Received</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1918]/5">
              {loading ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-[#9E9689]">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />
                    Loading inquiries...
                  </td>
                </tr>
              ) : enquiries.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-[#9E9689]">
                    No inquiries found for this filter.
                  </td>
                </tr>
              ) : (
                enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-[#F4EFE6]/50 transition-colors">
                    <td className="p-4 font-medium text-[#1A1918]">
                      {enq.name}
                      {enq.city && (
                        <span className="block text-[10px] text-[#9E9689] font-normal">
                          {enq.city}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-[#6A6357]">
                      <a href={`mailto:${enq.email}`} className="hover:underline">
                        {enq.email}
                      </a>
                      <p className="font-mono text-[11px] text-[#9E9689]">{enq.phone}</p>
                    </td>
                    <td className="p-4 text-[#1A1918]">{enq.photographyType}</td>
                    <td className="p-4 text-[#6A6357]">{enq.preferredDate || 'Flexible'}</td>
                    <td className="p-4 font-mono text-[#BFA175]">{enq.budget || '—'}</td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider ${
                          enq.status === 'NEW'
                            ? 'bg-amber-100 text-amber-800'
                            : enq.status === 'BOOKED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : enq.status === 'CONTACTED'
                            ? 'bg-blue-100 text-blue-800'
                            : enq.status === 'CONSULTATION'
                            ? 'bg-purple-100 text-purple-800'
                            : enq.status === 'COMPLETED'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-neutral-100 text-neutral-800'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td className="p-4 text-[#9E9689] font-mono">{formatDate(enq.createdAt)}</td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => openDetails(enq)}
                        className="px-2.5 py-1 bg-[#1A1918] text-[#FAF7F2] text-[11px] uppercase tracking-wider hover:bg-[#BFA175] transition-colors"
                      >
                        View & Edit
                      </button>
                      <button
                        onClick={() => handleDelete(enq.id)}
                        className="p-1 text-red-500 hover:text-red-700 transition-colors"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5 inline" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enquiry Detail & Edit Drawer Modal */}
      {activeEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
          <div className="bg-[#FAF7F2] border border-[#1A1918]/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#1A1918]/10 pb-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#BFA175]">
                  Enquiry Reference #{activeEnquiry.id.slice(-6)}
                </span>
                <h3 className="font-serif text-2xl font-light text-[#1A1918]">
                  {activeEnquiry.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveEnquiry(null)}
                className="p-1 text-[#1A1918] hover:text-[#BFA175]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs bg-[#F4EFE6] p-4">
              <div>
                <span className="text-[10px] font-mono text-[#9E9689] uppercase">Email</span>
                <p className="font-medium">{activeEnquiry.email}</p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#9E9689] uppercase">Phone</span>
                <p className="font-medium font-mono">{activeEnquiry.phone}</p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#9E9689] uppercase">Discipline</span>
                <p className="font-medium">{activeEnquiry.photographyType}</p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#9E9689] uppercase">Target Date</span>
                <p className="font-medium">{activeEnquiry.preferredDate || 'Flexible'}</p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#9E9689] uppercase">Budget</span>
                <p className="font-medium text-[#BFA175] font-mono">{activeEnquiry.budget || '—'}</p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#9E9689] uppercase">Guests / Size</span>
                <p className="font-medium">{activeEnquiry.peopleCount || '—'}</p>
              </div>
            </div>

            {/* Client Narrative Message */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#9E9689]">
                Client Message & Vision
              </span>
              <p className="text-xs text-[#4A453E] bg-[#F4EFE6]/50 p-4 border border-[#1A1918]/10 leading-relaxed font-light whitespace-pre-wrap">
                {activeEnquiry.message}
              </p>
            </div>

            {/* CRM Workflow Updates */}
            <div className="space-y-4 pt-2 border-t border-[#1A1918]/10">
              <h4 className="font-serif text-lg font-light text-[#1A1918]">
                CRM Status & Internal Notes
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono tracking-wider text-[#6A6357]">
                    Lead Status
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#1A1918]/20 p-2 text-xs focus:border-[#1A1918] focus:outline-none"
                  >
                    {statuses.filter((s) => s !== 'ALL').map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono tracking-wider text-[#6A6357]">
                    Follow-Up Date
                  </label>
                  <input
                    type="date"
                    value={editFollowUp}
                    onChange={(e) => setEditFollowUp(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#1A1918]/20 p-2 text-xs focus:border-[#1A1918] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono tracking-wider text-[#6A6357]">
                  Internal Studio Notes
                </label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Record consultation notes, phone summaries, quote details..."
                  className="w-full bg-[#FAF7F2] border border-[#1A1918]/20 p-3 text-xs focus:border-[#1A1918] focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setActiveEnquiry(null)}
                  className="px-4 py-2 border border-[#1A1918]/20 text-xs uppercase tracking-wider text-[#6A6357] hover:border-[#1A1918]"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleUpdate}
                  disabled={isUpdating}
                  className="inline-flex items-center space-x-2 px-5 py-2 bg-[#1A1918] text-[#FAF7F2] text-xs uppercase tracking-wider hover:bg-[#BFA175] hover:text-[#1A1918] transition-colors"
                >
                  {isUpdating ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Save className="w-3.5 h-3.5" />
                  )}
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
