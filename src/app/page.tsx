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
    <div className="md text-base leading-[1.9]">
      <Markdown>{markdown}</Markdown>
    </div>
  );
}
