'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Upload,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Loader2,
  Save,
  ArrowLeft,
} from 'lucide-react';

interface CategoryOption {
  id: string;
  name: string;
}

interface ImageItem {
  id?: string;
  url: string;
  caption?: string | null;
  aspectRatio?: string | null;
  order?: number;
}

interface ProjectFormProps {
  categories: CategoryOption[];
  initialData?: {
    id?: string;
    title: string;
    slug: string;
    categoryId: string;
    client?: string | null;
    location?: string | null;
    date?: string | null;
    sessionType?: string | null;
    coverImage: string;
    story: string;
    featuredImage?: string | null;
    tags?: string | null;
    isFeatured: boolean;
    isPublished: boolean;
    seoTitle?: string | null;
    seoDescription?: string | null;
    images?: ImageItem[];
  };
}

export default function ProjectForm({ categories, initialData }: ProjectFormProps) {
  const router = useRouter();
  const isEdit = Boolean(initialData?.id);

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    categoryId: initialData?.categoryId || categories[0]?.id || '',
    client: initialData?.client || '',
    location: initialData?.location || '',
    date: initialData?.date || '',
    sessionType: initialData?.sessionType || '',
    coverImage: initialData?.coverImage || '',
    story: initialData?.story || '',
    tags: initialData?.tags || '',
    isFeatured: initialData?.isFeatured || false,
    isPublished: initialData?.isPublished !== undefined ? initialData.isPublished : true,
    seoTitle: initialData?.seoTitle || '',
    seoDescription: initialData?.seoDescription || '',
  });

  const [images, setImages] = useState<ImageItem[]>(initialData?.images || []);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageCaption, setNewImageCaption] = useState('');
  const [newImageAspect, setNewImageAspect] = useState('landscape');
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  // Handle local file upload via /api/upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'cover' | 'gallery') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const body = new FormData();
    body.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      if (target === 'cover') {
        setFormData((prev) => ({ ...prev, coverImage: data.url }));
      } else {
        setImages((prev) => [
          ...prev,
          {
            url: data.url,
            caption: '',
            aspectRatio: 'landscape',
            order: prev.length + 1,
          },
        ]);
      }
    } catch (err: any) {
      alert(err.message || 'Error uploading image');
    } finally {
      setIsUploading(false);
    }
  };

  const addGalleryImage = () => {
    if (!newImageUrl) return;
    setImages((prev) => [
      ...prev,
      {
        url: newImageUrl,
        caption: newImageCaption,
        aspectRatio: newImageAspect,
        order: prev.length + 1,
      },
    ]);
    setNewImageUrl('');
    setNewImageCaption('');
  };

  const removeGalleryImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const moveImage = (idx: number, dir: 'up' | 'down') => {
    const newImages = [...images];
    const targetIdx = dir === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= newImages.length) return;

    const temp = newImages[idx];
    newImages[idx] = newImages[targetIdx];
    newImages[targetIdx] = temp;
    setImages(newImages);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      const endpoint = isEdit
        ? `/api/portfolio/${initialData?.id}`
        : '/api/portfolio';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          images,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Save failed');
      }

      router.push('/admin/portfolio');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you certain you wish to delete this project?')) return;
    try {
      const res = await fetch(`/api/portfolio/${initialData?.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        router.push('/admin/portfolio');
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-5xl space-y-12">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-500 text-xs">
          {error}
        </div>
      )}

      {/* Main Metadata */}
      <div className="p-8 bg-[#FAF7F2] border border-[#1A1918]/10 space-y-6">
        <h3 className="font-serif text-2xl font-light text-[#1A1918]">
          Project Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-mono tracking-widest text-[#6A6357]">
              Project Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-[#FAF7F2] border border-[#1A1918]/20 p-2.5 text-xs text-[#1A1918] focus:border-[#1A1918] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-mono tracking-widest text-[#6A6357]">
              URL Slug (Leave blank to auto-generate)
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full bg-[#FAF7F2] border border-[#1A1918]/20 p-2.5 text-xs text-[#1A1918] focus:border-[#1A1918] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-mono tracking-widest text-[#6A6357]">
              Category *
            </label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full bg-[#FAF7F2] border border-[#1A1918]/20 p-2.5 text-xs text-[#1A1918] focus:border-[#1A1918] focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-mono tracking-widest text-[#6A6357]">
              Client / Couple Names
            </label>
            <input
              type="text"
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              className="w-full bg-[#FAF7F2] border border-[#1A1918]/20 p-2.5 text-xs text-[#1A1918] focus:border-[#1A1918] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-mono tracking-widest text-[#6A6357]">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full bg-[#FAF7F2] border border-[#1A1918]/20 p-2.5 text-xs text-[#1A1918] focus:border-[#1A1918] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-mono tracking-widest text-[#6A6357]">
              Date / Season
            </label>
            <input
              type="text"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full bg-[#FAF7F2] border border-[#1A1918]/20 p-2.5 text-xs text-[#1A1918] focus:border-[#1A1918] focus:outline-none"
            />
          </div>
        </div>

        {/* Cover Image */}
        <div className="space-y-2 pt-4 border-t border-[#1A1918]/10">
          <label className="text-[10px] uppercase font-mono tracking-widest text-[#6A6357]">
            Hero Cover Image *
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              required
              value={formData.coverImage}
              onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              placeholder="https://... or upload local file"
              className="flex-1 bg-[#FAF7F2] border border-[#1A1918]/20 p-2.5 text-xs text-[#1A1918]"
            />
            <label className="px-4 py-2.5 bg-[#1A1918] text-[#FAF7F2] text-xs uppercase tracking-wider cursor-pointer hover:bg-[#BFA175] transition-colors flex items-center space-x-1.5">
              <Upload className="w-3.5 h-3.5" />
              <span>Upload</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'cover')}
                className="hidden"
              />
            </label>
          </div>

          {formData.coverImage && (
            <div className="relative w-40 h-24 mt-2 overflow-hidden border border-[#1A1918]/15">
              <Image
                src={formData.coverImage}
                alt="Cover Preview"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* Narrative Story */}
        <div className="space-y-1.5 pt-4 border-t border-[#1A1918]/10">
          <label className="text-[10px] uppercase font-mono tracking-widest text-[#6A6357]">
            Project Editorial Narrative *
          </label>
          <textarea
            rows={5}
            required
            value={formData.story}
            onChange={(e) => setFormData({ ...formData, story: e.target.value })}
            className="w-full bg-[#FAF7F2] border border-[#1A1918]/20 p-3 text-xs text-[#1A1918] leading-relaxed resize-none"
          />
        </div>

        {/* Featured & Published Toggles */}
        <div className="flex items-center space-x-8 pt-4 border-t border-[#1A1918]/10 text-xs">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="accent-[#BFA175]"
            />
            <span>Feature on Homepage Selected Stories</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isPublished}
              onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
              className="accent-[#BFA175]"
            />
            <span>Publish Live</span>
          </label>
        </div>
      </div>

      {/* Gallery Image Manager */}
      <div className="p-8 bg-[#FAF7F2] border border-[#1A1918]/10 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-2xl font-light text-[#1A1918]">
              Project Gallery Images
            </h3>
            <p className="text-xs text-[#6A6357]">
              Add images to the story gallery, set aspect ratios, captions, and adjust display ordering.
            </p>
          </div>
          <label className="px-4 py-2 bg-[#1A1918] text-[#FAF7F2] text-xs uppercase tracking-wider cursor-pointer hover:bg-[#BFA175] transition-colors flex items-center space-x-1.5">
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'gallery')}
              className="hidden"
            />
          </label>
        </div>

        {/* Add by URL */}
        <div className="flex flex-wrap items-center gap-3 p-4 bg-[#F4EFE6] text-xs">
          <input
            type="text"
            placeholder="Or enter image URL..."
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            className="flex-1 min-w-[200px] p-2 bg-[#FAF7F2] border border-[#1A1918]/15"
          />
          <input
            type="text"
            placeholder="Caption (optional)"
            value={newImageCaption}
            onChange={(e) => setNewImageCaption(e.target.value)}
            className="w-48 p-2 bg-[#FAF7F2] border border-[#1A1918]/15"
          />
          <select
            value={newImageAspect}
            onChange={(e) => setNewImageAspect(e.target.value)}
            className="p-2 bg-[#FAF7F2] border border-[#1A1918]/15"
          >
            <option value="landscape">Landscape (16:10)</option>
            <option value="portrait">Portrait (3:4)</option>
            <option value="wide">Wide (21:9)</option>
          </select>
          <button
            type="button"
            onClick={addGalleryImage}
            className="px-4 py-2 bg-[#BFA175] text-[#141312] uppercase tracking-wider font-medium hover:bg-[#D4BC9B]"
          >
            Add
          </button>
        </div>

        {/* Current Gallery List */}
        <div className="space-y-3">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 bg-[#FAF7F2] border border-[#1A1918]/10 text-xs"
            >
              <div className="flex items-center space-x-4">
                <span className="font-mono text-[11px] text-[#9E9689]">{idx + 1}</span>
                <div className="relative w-16 h-12 bg-[#1E1D1B] overflow-hidden">
                  <Image src={img.url} alt="Gallery" fill className="object-cover" />
                </div>
                <div>
                  <p className="font-medium text-[#1A1918]">{img.caption || 'No caption'}</p>
                  <p className="font-mono text-[10px] text-[#9E9689] uppercase">
                    Ratio: {img.aspectRatio || 'landscape'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => moveImage(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1 hover:text-[#BFA175] disabled:opacity-30"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => moveImage(idx, 'down')}
                  disabled={idx === images.length - 1}
                  className="p-1 hover:text-[#BFA175] disabled:opacity-30"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => removeGalleryImage(idx)}
                  className="p-1 text-red-500 hover:text-red-700 ml-2"
                  title="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save / Delete Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-[#1A1918]/10">
        {isEdit ? (
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2.5 text-xs uppercase tracking-wider text-red-600 hover:bg-red-50 transition-colors"
          >
            Delete Project
          </button>
        ) : (
          <div />
        )}

        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => router.push('/admin/portfolio')}
            className="px-6 py-3 border border-[#1A1918]/20 text-xs uppercase tracking-wider hover:border-[#1A1918]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center space-x-2 px-8 py-3 bg-[#1A1918] text-[#FAF7F2] text-xs uppercase tracking-wider font-medium hover:bg-[#BFA175] hover:text-[#1A1918] transition-colors"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{isEdit ? 'Save Changes' : 'Create Project'}</span>
          </button>
        </div>
      </div>
    </form>
  );
}
