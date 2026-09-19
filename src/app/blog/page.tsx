import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/utils';
import { ArrowUpRight, Clock, User } from 'lucide-react';

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <div className="pt-24 sm:pt-32 pb-24 text-[#1A1918]">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mb-16 sm:mb-28">
        <div className="max-w-3xl space-y-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#9E9689] block font-sans">
            Editorial Magazine
          </span>
          <h1
            className="font-serif font-light text-[#1A1918] leading-[1.05] tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
          >
            The Journal
          </h1>
          <p className="text-base sm:text-lg text-[#6A6357] font-light leading-relaxed max-w-2xl">
            Reflections on photographic craft, styling guides for editorial sessions, and the art of unposed human connection.
          </p>
        </div>
      </section>

      {/* Featured Articles Grid */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12">
          {posts.map((post, idx) => (
            <article key={post.id} className="group flex flex-col justify-between">
              <Link
                href={`/blog/${post.slug}`}
                className="block relative aspect-[16/10] overflow-hidden bg-[#1E1D1B] mb-6 shadow-md"
                data-cursor="read"
              >
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover img-zoom-hover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </Link>

              <div className="space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-widest text-[#9E9689]">
                    <span className="text-[#BFA175]">{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#1A1918] group-hover:text-[#BFA175] transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-[#6A6357] font-light leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1A1918]/10 flex items-center justify-between text-[11px] text-[#9E9689]">
                  <span>{formatDate(post.publishedAt)}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center space-x-1 font-medium text-[#1A1918] group-hover:text-[#BFA175] transition-colors uppercase tracking-wider"
                  >
                    <span>Read Essay</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
