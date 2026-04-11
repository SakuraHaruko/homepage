"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { href: "/", zh: "关于" },
  { href: "/blog", zh: "博客" },
  { href: "/gallery", zh: "相册" },
  { href: "/friends", zh: "好朋友们" },
];

export default function MobileNav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-bg/90 backdrop-blur-sm border-t border-divider">
      <div className="flex items-center justify-around py-2.5">
        {navItems.map(({ href, zh }) => (
          <Link
            key={href}
            href={href}
            className={`text-xs transition-colors ${
              isActive(href) ? "text-accent font-medium" : "text-text-faint"
            }`}
          >
            {zh}
          </Link>
        ))}
        <ThemeToggle />
      </div>
    </nav>
  );
}
