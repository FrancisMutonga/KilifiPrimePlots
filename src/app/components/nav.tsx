"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerLinkClick = () => {
    setTimeout(() => {
      setIsDrawerOpen(false);
    }, 200);
  };

  return (
    <nav
      className=" fixed top-0 z-50 w-full flex text-kilifigreen bg-beige/60 p-4 shadow-[0_4px_4px_-2px_rgba(0,0,0,0.4)]"
      style={{ fontFamily: "SegoeUI" }}
    >
      <div className="container mx-auto flex ml-4 justify-between items-center">
                <div className="flex items-center space-x-4 -ml-4">
          <Link href="/auth/login">
            <img src="/logo.png" alt="Logo" width={80} height={80} />
          </Link>
            </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6 mx-auto">
          <li>
            <Link
              href="/"
              className="text-lg font-semi text-link hover:text-blue-900"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-lg font-semi text-link hover:text-blue-900"
            >
              About
            </Link>
          </li>

          <li>
            <Link
              href="/products"
              className="text-lg font-semi text-link hover:text-blue-900"
            >
              Listings
            </Link>
          </li>

          <li>
            <Link
              href="/blogs"
              className="text-lg font-semi text-link hover:text-blue-900"
            >
              blogs
            </Link>
          </li>

          <li>
            <Link
              href="/contact"
              className="text-lg font-semi text-link hover:text-blue-900"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        >
          {isDrawerOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div className="md:hidden fixed top-0 right-0 h-full bg-beige/80 z-40 flex flex-col items-start p-6 space-y-4 shadow-lg w-1/3 transition-transform transform">
          <button
            onClick={handleDrawerLinkClick}
            className="self-end text-lg font-bold text-dark hover:text-blue-900 mb-4"
          >
            ✖
          </button>

          <Link
            href="/"
            onClick={handleDrawerLinkClick}
            className="text-lg font-bold text-link hover:text-linkgreen"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={handleDrawerLinkClick}
            className="text-lg font-bold text-link hover:text-linkgreen"
          >
            About
          </Link>

          <Link
            href="/products"
            onClick={handleDrawerLinkClick}
            className="text-lg font-bold text-link hover:text-linkgreen"
          >
            Listings
          </Link>

          <Link
            href="/blogs"
            onClick={handleDrawerLinkClick}
            className="text-lg font-bold text-link hover:text-linkgreen"
          >
            Blogs
          </Link>

          <Link
            href="/contact"
            onClick={handleDrawerLinkClick}
            className="text-lg font-bold text-link hover:text-linkgreen"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
