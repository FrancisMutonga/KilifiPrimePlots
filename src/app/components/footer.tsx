import React from "react";
import Image from "next/image";
import "boxicons/css/boxicons.min.css";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-kilifigreen text-white p-6 mt-1  bottom-0 w-full ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div>
          {/* Logo Section */}
          <div className="mb-4">
            <Image
              src="/logowhite.png"
              alt="Company Logo"
              className="hover:opacity-80 transition-opacity duration-300"
              height={20}
              width={20}
            />
          </div>
        </div>
        {/* Contact Us Section */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="text-xl font-bold mb-3">Contact Us</h3>
          <ul className="space-y-2">
            <li className="text-sm">
              <span className="font-semibold">Kilifi Kilifi,</span>
            </li>
            <li className="text-sm">
              <span className="font-semibold">Phone:</span> 0708091755
            </li>
            <li className="text-sm">
              <span className="font-semibold">Email:</span>{" "}
              info@kilifiprimeplot.com
            </li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-xl font-semibold wmb-3">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <Link
                href="/"
                className="text-white text-sm hover:text-blue transition-colors"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/listings"
                className="text-white text-sm hover:text-forest transition-colors"
              >
                Listings
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-white text-sm hover:text-forest transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Find Us Section */}
        <div className="w-full md:w-1/3">
          <h3 className="text-xl font-bold mb-3">Find Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/people/Kilifi-Prime-Plots/61558718026419/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/facebook-logo.png"
                alt="Facebook"
                width={24}
                height={24}
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/twitterlogo.png"
                alt="Twitter"
                width={24}
                height={24}
              />
            </a>
            <a
              href="https://www.instagram.com/kilifi_prime_plots/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/instagramlogo.png"
                alt="Instagram"
                width={24}
                height={24}
              />
            </a>
            <a
              href="https://wa.me/254708091755"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/whatsapplogo.png"
                alt="WhatsApp"
                width={24}
                height={24}
              />
            </a>
          </div>
        </div>
      </div>

      {/* Separator Line and Copyright Notice */}
      <div className="border-t border-white mt-6 pt-4">
        <div className="container mx-auto text-left">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Kilifi Prime Plots. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
