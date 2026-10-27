"use client";

import Script from "next/script";
import { useRef, useState } from "react";

declare global {
  interface Window {
    adsbygoogle?: { push: (request: Record<string, never>) => void };
  }
}

const publisherId = "ca-pub-2748368742566442";

export function SongBanner() {
  const requested = useRef(false);
  const [failed, setFailed] = useState(false);

  function requestBanner() {
    if (
      requested.current ||
      !["barnvistexter.se", "www.barnvistexter.se"].includes(
        window.location.hostname,
      )
    ) {
      return;
    }

    requested.current = true;
    try {
      const queue: Record<string, never>[] = [];
      (window.adsbygoogle ??= queue).push({});
    } catch {
      setFailed(true);
    }
  }

  if (failed) return null;

  return (
    <>
      <aside
        aria-label="Annons"
        className="song-banner mt-10 border-t pt-6 print:hidden"
      >
        <div className="mb-2 text-xs text-muted-foreground">Annons</div>
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: 90 }}
          data-ad-client={publisherId}
          data-ad-slot="7022851068"
        />
      </aside>
      {process.env.NODE_ENV === "production" ? (
        <Script
          id="adsense"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
          crossOrigin="anonymous"
          onReady={requestBanner}
          onError={() => setFailed(true)}
        />
      ) : null}
    </>
  );
}
