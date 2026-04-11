"use client";

import { useEffect, useState } from "react";
import { fetchFriendsRandom } from "@/lib/content";
import type { Friend } from "@/lib/content";
import Loading from "@/components/Loading";

export default function FriendsPage() {
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    fetchFriendsRandom().then(setFriends);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-5">💕 好朋友们</h2>
      {friends.length === 0 ? (
        <Loading />
      ) : (
        <div className="space-y-4">
          {friends.map((f) => (
            <div key={f.name} className="flex items-start gap-3">
              {f.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={f.avatar_url} alt={f.name} className="w-10 h-10 rounded-full object-cover shrink-0 border border-divider" />
              ) : (
                <span className="w-10 h-10 rounded-full bg-divider flex items-center justify-center text-lg shrink-0">{f.emoji}</span>
              )}
              <div>
                <span className="text-base font-medium">{f.name}</span>
                <span className="text-text-faint text-sm ml-1.5">— {f.bio}</span>
                <div className="flex gap-2 mt-0.5 text-sm">
                  {f.github && <a href={f.github} target="_blank" rel="noopener noreferrer" className="wavy">GitHub</a>}
                  {f.website && <a href={f.website} target="_blank" rel="noopener noreferrer" className="wavy">Website</a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <p className="text-text-faint text-sm mt-8">补充中...</p>
    </div>
  );
}
