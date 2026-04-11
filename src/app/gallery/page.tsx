"use client";

import { useEffect, useState } from "react";
import { fetchGallery } from "@/lib/content";
import type { GalleryItem } from "@/lib/content";
import Loading from "@/components/Loading";

export default function GalleryPage() {
  const [photos, setPhotos] = useState<GalleryItem[]>([]);
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  useEffect(() => {
    fetchGallery().then(setPhotos);
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

      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-6 cursor-pointer" onClick={() => setLightbox(null)}>
          <div className="max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={lightbox.url} alt={lightbox.desc} className="w-full rounded-md" />
            <p className="text-white/60 text-sm mt-2 text-center">{lightbox.desc}</p>
          </div>
        </div>
      )}
    </>
  );
}
