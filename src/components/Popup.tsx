"use client";

import { useState } from "react";
import Image from "next/image";

export default function Popup() {
  const [isOpen, setIsOpen] = useState(true);

  const closePopup = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-xl p-2 max-w-lg w-[90%]">
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
        >
          ✕
        </button>

        <Image
          src="/popup/banner.png"
          alt="Popup"
          width={600}
          height={400}
          className="rounded-lg object-contain w-full h-auto"
          priority
        />
      </div>
    </div>
  );
}
