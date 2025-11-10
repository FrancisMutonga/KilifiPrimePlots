"use client";
import { useEffect } from "react";
import Script from "next/script";

const FacebookPixel = () => {
  useEffect(() => {
    console.log("Facebook Pixel script loaded ✅");

    if (typeof window !== "undefined") {
      if (!window.fbq) {
        window.fbq = function (event: string, ...args: unknown[]) {
          if (window.fbq.callMethod) {
            window.fbq.callMethod(...args); 
          } else {
            (window.fbq.queue ??= []).push(args);
          }
        } as typeof window.fbq;

        window.fbq.queue = [];
        window.fbq.loaded = true;
        window.fbq.version = "2.0";
        window._fbq = window.fbq;
      }

     window.fbq("init", process.env.NEXT_PUBLIC_META_PIXEL_ID!);
      window.fbq("track", "PageView");

      console.log("✅ Facebook Pixel initialized:", window.fbq);
    }
  }, []);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://connect.facebook.net/en_US/fbevents.js"
        onLoad={() => console.log("✅ Facebook script loaded successfully")}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1129494388974080&ev=PageView&noscript=1"
          alt="Facebook Pixel"
        />
      </noscript>
    </>
  );
};

export default FacebookPixel;
