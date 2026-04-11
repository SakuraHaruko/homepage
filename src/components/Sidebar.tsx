"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import WeatherWidget from "./WeatherWidget";

const navItems = [
  { href: "/", zh: "关于", en: "About" },
  { href: "/blog", zh: "博客", en: "Blog" },
  { href: "/gallery", zh: "相册", en: "Gallery" },
  { href: "/friends", zh: "好朋友们", en: "Friends" },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <aside className="w-72 shrink-0 flex items-center justify-center pr-12 max-lg:hidden">
      <div className="w-52">
        {/* Avatar + Name */}
        <Link href="/" className="block w-full py-5 flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-full border-2 border-accent-pink/30 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://profile-content.s4a.moe/profile-avatar.jpg" alt="Sakura" className="w-full h-full object-cover" />
          </div>
          <div className="text-center">
            <p className="text-base font-semibold text-text">Sakura</p>
            <p className="text-[11px] text-text-faint mt-0.5">Developer · Student</p>
          </div>
        </Link>

        <div className="w-full h-px bg-divider" />

        {/* Nav items */}
        {navItems.map(({ href, zh, en }) => (
          <div key={href}>
            <Link
              href={href}
              className={`block w-full py-3.5 text-center transition-colors duration-200 ${
                isActive(href)
                  ? "text-accent"
                  : "text-text-sub hover:text-text"
              }`}
            >
              <p className={`text-base ${isActive(href) ? "font-semibold" : "font-medium"}`}>{zh}</p>
              <p className="text-[11px] text-text-faint mt-0.5">{en}</p>
            </Link>
            <div className="w-full h-px bg-divider" />
          </div>
        ))}

        {/* Bottom */}
        <div className="py-4 flex items-center justify-center gap-3">
          <WeatherWidget />
          <span className="text-text-faint/30">·</span>
          <ThemeToggle />
        </div>

        {/* Footer */}
        <div className="pt-2 pb-1 text-center text-[10px] text-text-faint leading-relaxed">
          <p>&copy; 2026 Sakura &amp; NekoCafe Network.</p>
          <p>Powered by ❤️ from my friends.</p>
          <p className="mt-0.5">
            <a href="https://icp.gov.moe/?keyword=20220772" target="_blank" rel="noopener noreferrer" className="wavy">
              萌ICP备20220772号
            </a>
          </p>
        </div>
      </div>
    </aside>
  );
}
