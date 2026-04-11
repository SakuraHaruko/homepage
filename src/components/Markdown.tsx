"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";

const remarkPlugins = [remarkGfm, remarkMath];
const rehypePlugins = [rehypeRaw, rehypeHighlight, rehypeSlug, rehypeKatex];

export default function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown remarkPlugins={remarkPlugins} rehypePlugins={rehypePlugins}>
      {children}
    </ReactMarkdown>
  );
}
