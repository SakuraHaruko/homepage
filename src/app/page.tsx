"use client";

import { useEffect, useState } from "react";
import { fetchAbout } from "@/lib/content";
import Markdown from "@/components/Markdown";
import Loading from "@/components/Loading";

export default function AboutPage() {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetchAbout().then(setMarkdown);
  }, []);

  if (!markdown) return <Loading />;

  return (
    <div>
      {/* Mobile avatar */}
      <div className="flex flex-col items-center mb-6 lg:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://profile-content.s4a.moe/profile-avatar.jpg"
          alt="Sakura"
          className="w-24 h-24 rounded-full border-2 border-accent-pink/30 object-cover"
        />
        <p className="text-base font-semibold mt-2">Sakura</p>
        <p className="text-[11px] text-text-faint">Developer · Student</p>
      </div>

      <div className="md text-base leading-[1.9]">
        <Markdown>{markdown}</Markdown>
      </div>
    </div>
  );
}
