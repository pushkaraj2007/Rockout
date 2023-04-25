import { useState, useRef, useEffect } from "react";
import {
  FaShareAlt,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaClipboard,
} from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ShareButton = ({ roomId }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dropdownRef]);

  // Open dropdown
  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };

  const shareUrl = `https://rockout.vercel.app/join-room/?roomId=${roomId}`;
  const shareTitle = `Join my room: ${roomId}`;
  const [copyLink, setCopyLink] = useState(shareUrl);
  const [linkCopied, setLinkCopied] = useState(false);

  const copyLinkTimeout = () => {
    setTimeout(() => {
      setLinkCopied(false);
    }, 3000);
  };

  return (
    <div className="relative inline-block text-left w-36">
      <div>
        <button
          type="button"
          className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          id="options-menu"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <FaShareAlt className="mr-2" />
          Share Room
        </button>
      </div>
      {showDropdown && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          ref={dropdownRef}
        >
          <div className="py-1" role="none">
            <a
              href={`https://api.whatsapp.com/send?text=(${shareUrl})`}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              <IoLogoWhatsapp className="inline-block mr-2" />
              Whatsapp
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              <FaFacebook className="inline-block mr-2" />
              Facebook
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              <FaTwitter className="inline-block mr-2" />
              Twitter
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?url=${shareUrl}&title=${shareTitle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              <FaLinkedin className="inline-block mr-2" />
              LinkedIn
            </a>
            <a
              onClick={copyLinkTimeout}
              rel="noopener noreferrer"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              <FaClipboard className="inline-block mr-2" />
              <CopyToClipboard
                text={copyLink}
                onCopy={() => setLinkCopied(true)}
              >
                {linkCopied ? (
                  <button>Copied</button>
                ) : (
                  <button>Copy to clipboard</button>
                )}
              </CopyToClipboard>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
