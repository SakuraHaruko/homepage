"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { fetchGallery } from "@/lib/content";
import type { GalleryItem } from "@/lib/content";
import Loading from "@/components/Loading";

export default function GalleryPage() {
  const [photos, setPhotos] = useState<GalleryItem[]>([]);
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchGallery().then(setPhotos);
  }, []);

  // Open animation
  useEffect(() => {
    if (!lightbox || !overlayRef.current || !contentRef.current) return;
    setVisible(true);
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power2.out" });
    gsap.fromTo(contentRef.current, { opacity: 0, scale: 0.92, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power2.out" });
  }, [lightbox]);

  // Close with animation
  const closeLightbox = useCallback(() => {
    if (!overlayRef.current || !contentRef.current) {
      setLightbox(null);
      return;
    }
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: "power2.in" });
    gsap.to(contentRef.current, {
      opacity: 0, scale: 0.95, y: 10, duration: 0.2, ease: "power2.in",
      onComplete: () => { setLightbox(null); setVisible(false); },
    });
  }, []);

  return (
    <>
      <div>
        <h2 className="text-xl font-semibold mb-5">📷 相册</h2>
        {photos.length === 0 ? (
          <Loading />
        ) : (
          <div className="columns-2 gap-3 space-y-3">
            {photos.map((photo, i) => (
              <div key={i} className="break-inside-avoid cursor-pointer group" onClick={() => setLightbox(photo)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.url} alt={photo.desc}
                  className="w-full rounded-md opacity-85 group-hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                />
                <p className="text-[11px] text-text-faint mt-1">{photo.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {(lightbox || visible) && createPortal(
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[200] bg-black/70 flex items-center justify-center p-6 cursor-pointer"
          onClick={closeLightbox}
        >
          <div
            ref={contentRef}
            className="max-w-3xl max-h-[90vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {lightbox && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={lightbox.url} alt={lightbox.desc} className="max-h-[80vh] w-auto rounded-md object-contain" />
                <div className="flex items-center justify-between mt-3 w-full max-w-lg">
                  <p className="text-white/60 text-sm">{lightbox.desc}</p>
                  <a
                    href={lightbox.original_url || lightbox.url}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 text-xs hover:text-white/80 transition-colors px-2 py-1 rounded border border-white/20 hover:border-white/40 shrink-0 ml-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Download
                  </a>
                </div>
              </>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
