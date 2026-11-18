"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { getProfileColor } from "@/lib/profileColors";

const decorations = [
  { left: "8%", top: "12%", rotate: -25 },
  { left: "80%", top: "15%", rotate: 20 },
  { left: "15%", top: "75%", rotate: 15 },
  { left: "85%", top: "70%", rotate: -20 },
  { left: "48%", top: "5%", rotate: 10 },
];

export default function MatchModal({ match, onClose }) {
  const router = useRouter();
  const closeButton = useRef(null);

  useEffect(() => {
    const previousFocus = document.activeElement;

    closeButton.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="match-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-5"
    >
      <motion.div
        initial={{ scale: 0.7, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 240,
          damping: 18,
        }}
        className="coy-card relative w-full max-w-sm overflow-hidden bg-[#ff347c] px-6 py-10 text-center"
      >
        <button
          type="button"
          ref={closeButton}
          onClick={onClose}
          aria-label="Close match celebration"
          className="absolute right-4 top-4 z-20 rounded-full border-2 border-[#17131f] bg-white p-2"
        >
          <X size={20} />
        </button>

        {/* Floating hearts */}
        {decorations.map((item, index) => (
          <motion.div
            key={index}
            className="pointer-events-none absolute text-[#ffc8dd]"
            style={{
              left: item.left,
              top: item.top,
              rotate: item.rotate,
            }}
            animate={{
              y: [0, -12, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: index * 0.2,
            }}
          >
            <Heart size={28} fill="currentColor" />
          </motion.div>
        ))}

        {/* Matched avatars */}
        <div className="relative z-10 flex items-center justify-center py-10">

          <motion.div
            initial={{ x: -60, rotate: -25 }}
            animate={{ x: 8, rotate: -12 }}
            className="coy-card w-32 bg-white p-2"
          >
            <Image
              src="/avatars/coy-1.svg"
              alt="Your avatar"
              width={112}
              height={128}
              unoptimized
              className="h-32 w-full rounded-xl bg-[#e6dffc] object-contain"
              onError={(e) => {
                if (
                  !e.currentTarget.src.endsWith(
                    "/avatar.svg"
                  )
                ) {
                  e.currentTarget.src = "/avatar.svg";
                }
              }}
            />

            <p className="mt-2 text-sm font-bold">
              You
            </p>
          </motion.div>

          <motion.div
            initial={{ x: 60, rotate: 25 }}
            animate={{ x: -8, rotate: 12 }}
            className="coy-card w-32 bg-white p-2"
          >
            <Image
              src={
                match.profile.photo_url ||
                "/avatar.svg"
              }
              alt={match.profile.name}
              width={112}
              height={128}
              unoptimized
              className="h-32 w-full rounded-xl object-contain"
              style={{
                backgroundColor: getProfileColor(
                  match.profile.id
                ),
              }}
              onError={(e) => {
                if (
                  !e.currentTarget.src.endsWith(
                    "/avatar.svg"
                  )
                ) {
                  e.currentTarget.src = "/avatar.svg";
                }
              }}
            />

            <p className="mt-2 text-sm font-bold">
              {match.profile.name}
            </p>

          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.3,
              type: "spring",
            }}
            className="absolute bottom-8 z-20 rounded-full border-2 border-[#17131f] bg-white p-3"
          >
            <Heart size={28} fill="#ff347c" />
          </motion.div>

        </div>

        <div className="relative z-10">
          <Sparkles className="mx-auto mb-3" size={30} />

          <h2
            id="match-title"
            className="text-4xl font-black tracking-tight"
          >
            IT&apos;S A MATCH!
          </h2>

          <p className="mt-4 text-sm font-medium leading-relaxed">
            You and {match.profile.name} liked each other.
            Looks like the feeling is mutual!
          </p>

          <button
            type="button"
            onClick={onClose}
            className="coy-button mt-8 w-full bg-white py-4 font-black"
          >
            Keep discovering
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              router.push("/matches");
            }}
            className="mt-5 text-sm font-bold underline"
          >
            View my matches
          </button>

        </div>
      </motion.div>
    </motion.div>
  );
}