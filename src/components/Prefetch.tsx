"use client";

import { useEffect } from "react";
import { prefetchAll } from "@/lib/content";

export default function Prefetch() {
  useEffect(() => {
    prefetchAll();
  }, []);
  return null;
}
