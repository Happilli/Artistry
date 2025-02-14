import React from "react";
import { NavLink } from "react-router-dom";
import {
  GithubLogo,
  InstagramLogo,
  FacebookLogo,
  TwitterLogo,
} from "@phosphor-icons/react";

const Footer: React.FC = () => {
  return (
    <div className="bg-[#ff3131] text-white py-10">
      <footer className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xl font-semibold mb-4">About Safal's Art</h4>
            <p className="text-sm text-gray-300">
              Discover unique digital art, manga-style illustrations, and more!
              Explore the creativity behind every piece.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "text-yellow-500" : "hover:text-gray-400"
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/gallery"
                  className={({ isActive }) =>
                    isActive ? "text-yellow-500" : "hover:text-gray-400"
                  }
                >
                  Gallery
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/commissions"
                  className={({ isActive }) =>
                    isActive ? "text-yellow-500" : "hover:text-gray-400"
                  }
                >
                  Commissions
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Follow Me</h4>
            <div className="flex gap-6 mt-4 justify-center md:justify-start">
              <a
                href="https://github.com/happilli"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400"
              >
                <GithubLogo size={24} />
              </a>
              <a
                href="https://www.instagram.com/happilli_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400"
              >
                <InstagramLogo size={24} />
              </a>
              <a
                href="https://www.facebook.com/safal.lama.726"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400"
              >
                <FacebookLogo size={24} />
              </a>
              <a
                href="https://x.com/yoyuehappy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400"
              >
                <TwitterLogo size={24} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <p className="text-sm text-gray-300">
              Email:{" "}
              <a
                href="mailto:yoyuehappy@gmail.com"
                className="hover:text-gray-400"
              >
                yoyuehappy@gmail.com
              </a>
            </p>
            <p className="text-sm text-gray-300">
              Phone:{" "}
              <a href="tel:+9779814202188" className="hover:text-gray-400">
                +977 9814202188
              </a>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-300">
            &copy; 2024 Safal's Art. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
