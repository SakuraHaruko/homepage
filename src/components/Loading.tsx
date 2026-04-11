"use client";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      {/* Bouncing dots */}
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-accent-pink animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="w-2 h-2 rounded-full bg-accent-pink animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="w-2 h-2 rounded-full bg-accent-pink animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
      <p className="text-text-faint text-sm">Loading...</p>
    </div>
  );
}
