import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 border-t border-gray-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 py-4 gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <Image src="/blog.png" alt="Blogger" width={40} height={40} />
          <span className="text-gray-800 font-semibold text-lg">Blogger</span>
        </div>

        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} Blogger. All rights reserved.
        </p>

        <div className="flex gap-3">
          <Image
            src="/whatsapp_icon.png"
            alt="WhatsApp"
            width={28}
            height={28}
            className="hover:scale-110 transition-transform"
          />
          <Image
            src="/pintester_icon.png"
            alt="Pinterest"
            width={28}
            height={28}
            className="hover:scale-110 transition-transform"
          />
          <Image
            src="/instagram_icon.png"
            alt="Instagram"
            width={28}
            height={28}
            className="hover:scale-110 transition-transform"
          />
        </div>
      </div>
    </footer>
  );
}
