import React from "react";
import {
  GithubLogo,
  InstagramLogo,
  FacebookLogo,
  TwitterLogo,
} from "@phosphor-icons/react";

const Footer: React.FC = () => {
  return (
    <div className="bg-red-600 text-white py-10 rounded-t-lg">
      <footer className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8">
          {/* About Section */}
          <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
            <h4 className="text-2xl md:text-3xl font-semibold mb-4">
              About Safal's Art
            </h4>
            <p className="text-base md:text-lg text-gray-300 max-w-md">
              Discover a variety of art, sketches, and mangas right here!
            </p>
          </div>

          {/* Follow Section */}
          <div className="flex flex-col justify-center items-center">
            <h4 className="text-2xl md:text-3xl font-semibold mb-4">
              Follow Me
            </h4>
            <div className="flex justify-center gap-6">
              <a
                href="https://github.com/happilli"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400 transition-colors duration-300"
              >
                <GithubLogo size={32} />
              </a>
              <a
                href="https://www.instagram.com/happilli_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400 transition-colors duration-300"
              >
                <InstagramLogo size={32} />
              </a>
              <a
                href="https://www.facebook.com/safal.lama.726"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400 transition-colors duration-300"
              >
                <FacebookLogo size={32} />
              </a>
              <a
                href="https://x.com/yoyuehappy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400 transition-colors duration-300"
              >
                <TwitterLogo size={32} />
              </a>
            </div>
          </div>
        </div>

        {/* Horizontal Line */}
        <div className="w-full h-px bg-gray-300/50 my-8"></div>

        {/* Copyright Section */}
        <div className="text-center">
          <p className="text-sm text-gray-300">
            &copy; 2024 Safal's Art. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
