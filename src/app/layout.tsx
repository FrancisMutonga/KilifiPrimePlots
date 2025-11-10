"use client";

import React from "react";
import Head from "next/head";
import FacebookPixel from "./components/fbpixel";
import "./globals.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <Head>
        <title>Kilifi Prime Plots - Your Gateway to Prime Land Ownership</title>
        <meta
          name="description"
          content="Discover prime land ownership opportunities in Kilifi. Kilifi Prime Plots offers affordable, secure, and well-located plots for your dream investment."
        />
        <meta
          name="keywords"
          content="Kilifi Prime Plots, land for sale in Kilifi, affordable plots, prime land, Kilifi real estate"
        />
        <meta name="author" content="Kilifi Prime Plots" />
        <meta
          property="og:title"
          content="Kilifi Prime Plots - Your Gateway to Prime Land Ownership"
        />
        <meta
          property="og:description"
          content="Discover prime land ownership opportunities in Kilifi. Kilifi Prime Plots offers affordable, secure, and well-located plots for your dream investment."
        />
        <meta property="og:image" content="/path-to-kilifi-image.jpg" />
        <meta property="og:url" content="https://www.kilifiprimeplots.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Kilifi Prime Plots - Your Gateway to Prime Land Ownership"
        />
        <meta
          name="twitter:description"
          content="Discover prime land ownership opportunities in Kilifi. Kilifi Prime Plots offers affordable, secure, and well-located plots for your dream investment."
        />
        <meta name="twitter:image" content="/path-to-kilifi-image.jpg" />
      </Head>

      <body className="min-h-screen flex flex-col bg-gray-50 relative">
        
        <FacebookPixel />

        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
};

export default Layout;
