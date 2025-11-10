"use client";

import { useState, useEffect } from "react";
import { FaHome, FaSignOutAlt, FaBars } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { FaBlog, FaNewspaper, FaSignHanging } from "react-icons/fa6";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  link: string;
  isOpen: boolean;
  onClick?: () => void;
}

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

   const handleSidebarLinkClick = () => setIsSidebarOpen(false);

  if (isMobile) {
    // For mobile, use overlay
    return (
      <>
        {/* Mobile top nav */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-beige/70 shadow-md px-4 py-3 flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <Image src="/logo.png" alt="Logo" width={32} height={32} />
            <span className="text-kilifigreen text-xl font-bold"> Admin</span>
          </div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-teal-700 text-xl">
            <FaBars />
          </button>
        </div>

        {isSidebarOpen && (
          <div className="fixed top-0 left-0 h-full w-40 bg-beige/60 shadow-xl flex flex-col transition-all duration-300 z-40 rounded-r-xl overflow-hidden">
            <button
              onClick={handleSidebarLinkClick}
              className="text-teal-700 mb-6 text-right w-full"
            >
              ✕
            </button>
            <nav className="flex flex-col gap-4">
              <SidebarItem icon={<FaHome />} label="Home" link="/admin/dashboard" onClick={handleSidebarLinkClick} isOpen />
              <SidebarItem icon={<FaSignHanging />} label="Listings" link="/admin/products" onClick={handleSidebarLinkClick} isOpen />
              <SidebarItem icon={<FaBlog />} label="Blogs" link="/admin/blogs" onClick={handleSidebarLinkClick} isOpen />
              <SidebarItem icon={<FaNewspaper />} label="News" link="/admin/news" onClick={handleSidebarLinkClick} isOpen />
              <SidebarItem icon={<FaSignOutAlt />} label="Logout" link="/" onClick={handleSidebarLinkClick} isOpen />
            </nav>
          </div>
        )}
      </>
    );
  }

  // For desktop: part of flex flow
  return (
    <div
      className={clsx(
        "sticky top-0  h-screen bg-beige/85 shadow-md transition-all duration-300 overflow-hidden rounded-r-xl",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="p-4 text-kilifigreen">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-kilifigreen flex items-center gap-3 mb-8 focus:outline-none"
        >
          <Image src="/logo.png" alt="Logo" width={60} height={60} />
          {isOpen && <span className=" text-3xl font-bold"> Admin</span>}
        </button>

        <nav className="flex flex-col gap-6 mt-4">
          <SidebarItem icon={<FaHome />} label="Home" link="/admin/dashboard" isOpen={isOpen} />
          <SidebarItem icon={<FaSignHanging />} label="Listings" link="/admin/products" isOpen={isOpen} />
          <SidebarItem icon={<FaNewspaper />} label="News" link="/admin/news" isOpen={isOpen} />
          <SidebarItem icon={<FaBlog />} label="Blogs" link="/admin/blogs" isOpen={isOpen} />
          <SidebarItem icon={<FaSignOutAlt />} label="Logout" link="/" isOpen={isOpen} />
        </nav>
      </div>
    </div>
  );
};

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, link, isOpen, onClick }) => {
  return (
    <Link
      href={link}
      onClick={onClick}
      className={clsx(
        "flex items-center text-kilifigreen  text-bold p-3 rounded-lg hover:bg-white/20 transition-all duration-200",
        isOpen ? "gap-4 justify-start" : "justify-center"
      )}
    >
      {icon}
      {isOpen && <span className="text-sm">{label}</span>}
    </Link>
  );
};

export default Sidebar;
