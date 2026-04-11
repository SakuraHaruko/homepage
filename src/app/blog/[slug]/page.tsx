"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { fetchBlogList, fetchBlogPost } from "@/lib/content";
import type { BlogMeta } from "@/lib/content";
import Markdown from "@/components/Markdown";
import Loading from "@/components/Loading";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [meta, setMeta] = useState<BlogMeta | null>(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchBlogList(), fetchBlogPost(slug)]).then(([posts, md]) => {
      setMeta(posts.find((p) => p.slug === slug) ?? null);
      setContent(md);
      setLoading(false);
    });
  }, [slug]);

  if (loading) return <Loading />;

  if (!meta || !content) {
    return (
      <>
        <Link href="/blog" className="text-sm text-text-faint hover:text-accent transition-colors">← back</Link>
        <p className="mt-6 text-text-faint">Post not found.</p>
      </>
    );
  }

  return (
    <>
      <Link href="/blog" className="text-sm text-text-faint hover:text-accent transition-colors">
        ← back
      </Link>

      <article className="mt-6">
        <h1 className="text-xl font-bold mb-1.5">{meta.title}</h1>
        <div className="flex items-center gap-3 text-xs text-text-faint mb-6">
          <span>{meta.date}</span>
          {meta.tags.map((tag) => (
            <span key={tag} className="px-1.5 py-0.5 rounded bg-tag-bg text-tag-text">{tag}</span>
          ))}
        </div>
        <div className="md">
          <Markdown>{content}</Markdown>
        </div>
      </article>
    </>
  );
}
