"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    adsbygoogle?: { push: (request: Record<string, never>) => void };
  }
}

const publisherId = "ca-pub-2748368742566442";
let adSenseScript: Promise<void> | undefined;

function loadAdSenseScript() {
  adSenseScript ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`;
    script.crossOrigin = "anonymous";
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("AdSense script could not be loaded"));
    document.head.appendChild(script);
  });
  return adSenseScript;
}

export function SongBanner() {
  const requested = useRef(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (
      process.env.NODE_ENV !== "production" ||
      !["barnvistexter.se", "www.barnvistexter.se"].includes(
        window.location.hostname,
      )
    ) {
      return;
    }

    let active = true;
    void loadAdSenseScript().then(
      () => {
        if (!active || requested.current) return;
        requested.current = true;
        try {
          const queue: Record<string, never>[] = [];
          (window.adsbygoogle ??= queue).push({});
        } catch {
          setFailed(true);
        }
      },
      () => {
        if (active) setFailed(true);
      },
    );
    return () => {
      active = false;
    };
  }, []);

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
    </>
  );
}
