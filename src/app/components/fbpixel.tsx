"use client";
import { useEffect } from "react";
import Script from "next/script";

const FacebookPixel = () => {
  useEffect(() => {
    console.log("Facebook Pixel script loaded"); // ✅ Debugging log

    if (typeof window !== "undefined") {
      (window as any).fbq = (window as any).fbq || function () {
        (window as any).fbq.callMethod
          ? (window as any).fbq.callMethod.apply((window as any).fbq, arguments)
          : (window as any).fbq.queue.push(arguments);
      };
      (window as any)._fbq = (window as any).fbq;
      (window as any).fbq.push = (window as any).fbq;
      (window as any).fbq.loaded = true;
      (window as any).fbq.version = "2.0";
      (window as any).fbq.queue = [];
      (window as any).fbq("init", "1129494388974080");
      (window as any).fbq("track", "PageView");

      console.log("fbq initialized:", (window as any).fbq); // ✅ Debugging log
    }
  }, []);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://connect.facebook.net/en_US/fbevents.js"
        onLoad={() => console.log("Facebook script loaded successfully")} // ✅ Debugging log
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1129494388974080&ev=PageView&noscript=1"
        />
      </noscript>
    </>
  );
};

export default FacebookPixel;
