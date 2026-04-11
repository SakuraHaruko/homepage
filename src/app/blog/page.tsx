"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchBlogList } from "@/lib/content";
import type { BlogMeta } from "@/lib/content";
import Loading from "@/components/Loading";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogMeta[]>([]);

  useEffect(() => {
    fetchBlogList().then(setPosts);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-5">📝 记事本</h2>
      {posts.length === 0 ? (
        <Loading />
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <span className="text-base text-text group-hover:text-accent transition-colors">
                {post.title}
              </span>
              <span className="text-text-faint text-sm ml-2">{post.date}</span>
              {post.summary && <p className="text-text-faint text-sm mt-0.5">{post.summary}</p>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
