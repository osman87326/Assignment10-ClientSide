"use client";

import { useState, useRef, useEffect } from "react";
import { Share2, Link as LinkIcon, Check } from "lucide-react";
import { 
  FacebookShareButton, 
  TwitterShareButton, 
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon
} from "react-share";

export default function ShareButton({ lessonId, title, direction = "up" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef(null);

  // If we are in the browser, build the full URL
  const shareUrl = typeof window !== "undefined" 
    ? `${window.location.origin}/lessons/${lessonId}` 
    : `https://yourdomain.com/lessons/${lessonId}`;

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
        setCopied(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => {
      setIsOpen(false);
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="w-9 h-9 rounded-lg border-2 border-[#1C1611] bg-white flex items-center justify-center text-[#1C1611] shadow-[2px_2px_0px_0px_#1C1611] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_0px_#1C1611] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all duration-100"
        aria-label="Share Lesson"
        title="Share"
      >
        <Share2 className="w-4 h-4 stroke-[#1C1611] stroke-[2px]" />
      </button>

      {isOpen && (
        <div 
          className={`absolute ${direction === "up" ? "bottom-full mb-2" : "top-full mt-2"} right-0 w-48 bg-white border-[2.5px] border-[#1C1611] rounded-xl p-2 shadow-[4px_4px_0px_0px_#1C1611] z-50 animate-in fade-in zoom-in-95 duration-100`}
          onClick={(e) => {
            // Stop propagation so it doesn't trigger card clicks, but let default happen
            e.stopPropagation();
          }}
        >
          <FacebookShareButton 
            url={shareUrl} 
            resetButtonStyle={false}
            onShareWindowClose={() => setIsOpen(false)}
            className="flex items-center gap-3 p-2 w-full hover:bg-[#F6F0DD] rounded-lg cursor-pointer transition-colors text-left"
          >
            <FacebookIcon size={24} round />
            <span className="text-xs font-black uppercase text-[#1C1611]">Facebook</span>
          </FacebookShareButton>
          
          <TwitterShareButton 
            url={shareUrl} 
            title={title} 
            resetButtonStyle={false}
            onShareWindowClose={() => setIsOpen(false)}
            className="flex items-center gap-3 p-2 w-full hover:bg-[#F6F0DD] rounded-lg cursor-pointer transition-colors text-left"
          >
            <TwitterIcon size={24} round />
            <span className="text-xs font-black uppercase text-[#1C1611]">Twitter</span>
          </TwitterShareButton>

          <LinkedinShareButton 
            url={shareUrl} 
            title={title} 
            resetButtonStyle={false}
            onShareWindowClose={() => setIsOpen(false)}
            className="flex items-center gap-3 p-2 w-full hover:bg-[#F6F0DD] rounded-lg cursor-pointer transition-colors text-left"
          >
            <LinkedinIcon size={24} round />
            <span className="text-xs font-black uppercase text-[#1C1611]">LinkedIn</span>
          </LinkedinShareButton>

          <div className="border-t-2 border-[#1C1611]/10 my-1"></div>

          <button 
            onClick={handleCopyLink}
            className="flex items-center gap-3 p-2 w-full hover:bg-[#F6F0DD] rounded-lg cursor-pointer transition-colors"
          >
            <div className="w-6 h-6 flex items-center justify-center bg-[#1C1611] text-white rounded-full shrink-0">
              {copied ? <Check className="w-3.5 h-3.5" /> : <LinkIcon className="w-3.5 h-3.5" />}
            </div>
            <span className="text-xs font-black uppercase text-[#1C1611]">
              {copied ? "Copied!" : "Copy Link"}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}