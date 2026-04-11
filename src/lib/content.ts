const BASE = process.env.NEXT_PUBLIC_CONTENT_BASE_URL || "https://profile-content.s4a.moe";

export interface BlogMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
}

export interface Friend {
  name: string;
  emoji: string;
  avatar_url?: string;
  bio: string;
  github?: string;
  website?: string;
}

export interface GalleryItem {
  url: string;
  desc: string;
}

/* ─── Cache layer ─── */
const cache: Record<string, unknown> = {};

async function cached<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  if (key in cache) return cache[key] as T;
  const data = await fetcher();
  cache[key] = data;
  return data;
}

/* ─── Fetchers (with cache) ─── */
export function fetchAbout(): Promise<string> {
  return cached("about", async () => {
    const res = await fetch(`${BASE}/about.md`);
    return res.ok ? res.text() : "";
  });
}

export function fetchBlogList(): Promise<BlogMeta[]> {
  return cached("blogList", async () => {
    const res = await fetch(`${BASE}/blog.json`);
    return res.ok ? (res.json() as Promise<BlogMeta[]>) : [];
  });
}

export function fetchBlogPost(slug: string): Promise<string> {
  return cached(`blog:${slug}`, async () => {
    const res = await fetch(`${BASE}/blogs/${slug}.md`);
    return res.ok ? res.text() : "";
  });
}

export function fetchFriends(): Promise<Friend[]> {
  return cached("friends", async () => {
    const res = await fetch(`${BASE}/friends.json`);
    return res.ok ? (res.json() as Promise<Friend[]>) : [];
  });
}

export function fetchGallery(): Promise<GalleryItem[]> {
  return cached("gallery", async () => {
    const res = await fetch(`${BASE}/gallery.json`);
    return res.ok ? (res.json() as Promise<GalleryItem[]>) : [];
  });
}

/* ─── Prefetch all on first visit ─── */
let prefetched = false;
export function prefetchAll(): void {
  if (prefetched) return;
  prefetched = true;
  fetchAbout();
  fetchBlogList();
  fetchFriends();
  fetchGallery();
}
