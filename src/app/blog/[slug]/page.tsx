import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/utils';
import { ArrowLeft, ArrowUpRight, Clock, User, Calendar } from 'lucide-react';

export const revalidate = 0;

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  });

  if (!post) {
    notFound();
  }

  // Fetch other posts
  const relatedPosts = await prisma.blogPost.findMany({
    where: {
      isPublished: true,
      id: { not: post.id },
    },
    take: 2,
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <article className="pt-24 sm:pt-32 pb-24 text-[#1A1918] bg-[#FAF7F2]">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.24em] text-[#9E9689] hover:text-[#1A1918] transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Journal</span>
        </Link>

        {/* Article Header */}
        <div className="space-y-6 mb-12">
          <div className="flex items-center space-x-4 text-xs font-mono uppercase tracking-widest text-[#BFA175]">
            <span>{post.category}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#1A1918] leading-[1.1] tracking-tight">
            {post.title}
          </h1>

          <div className="flex items-center space-x-6 text-xs text-[#6A6357] pt-2 border-t border-[#1A1918]/10">
            <span className="flex items-center space-x-2">
              <User className="w-3.5 h-3.5 text-[#BFA175]" />
              <span>{post.author}</span>
            </span>
            <span className="flex items-center space-x-2">
              <Calendar className="w-3.5 h-3.5 text-[#BFA175]" />
              <span>{formatDate(post.publishedAt)}</span>
            </span>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1E1D1B] mb-12 shadow-xl">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 900px"
          />
        </div>

        {/* Excerpt Lead */}
        <div className="mb-10">
          <p className="font-serif text-xl sm:text-2xl font-light italic leading-relaxed text-[#1A1918] border-l-2 border-[#BFA175] pl-6">
            &ldquo;{post.excerpt}&rdquo;
          </p>
        </div>

        {/* Article Body Content */}
        <div className="prose prose-lg max-w-none text-[#4A453E] font-light leading-relaxed whitespace-pre-line border-b border-[#1A1918]/10 pb-16 mb-16">
          {post.content}
        </div>

        {/* Related Essays */}
        {relatedPosts.length > 0 && (
          <div className="pt-8">
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#1A1918] mb-8">
              Related Essays
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {relatedPosts.map((rPost) => (
                <Link
                  key={rPost.id}
                  href={`/blog/${rPost.slug}`}
                  className="group block space-y-3"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#1E1D1B]">
                    <Image
                      src={rPost.coverImage}
                      alt={rPost.title}
                      fill
                      className="object-cover img-zoom-hover"
                      sizes="400px"
                    />
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#BFA175] block">
                    {rPost.category}
                  </span>
                  <h4 className="font-serif text-xl font-light text-[#1A1918] group-hover:text-[#BFA175] transition-colors">
                    {rPost.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
