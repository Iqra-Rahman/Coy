"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  HeartHandshake,
  MapPin,
  LoaderCircle,
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";

import { getMatches } from "@/lib/api";
import { getProfileColor } from "@/lib/profileColors";

export default function MatchesPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMatches = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getMatches();
      setMatches(data.matches);
    } catch {
      setError("Unable to load your matches.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const fetchInitialMatches = async () => {
      try {
        const data = await getMatches();

        if (!cancelled) {
          setMatches(data.matches);
        }
      } catch {
        if (!cancelled) {
          setError("Unable to load your matches.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchInitialMatches();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section>
      <h2 className="text-3xl font-black leading-tight">
        Your matches
        <span className="text-[#ff347c]">.</span>
      </h2>

      <p className="mt-2 text-sm text-gray-600">
        Good things happen when feelings are mutual.
      </p>

      {/* Loading state */}
      {loading && (
        <div className="flex h-80 flex-col items-center justify-center gap-3">
          <LoaderCircle
            size={36}
            className="animate-spin text-[#ff347c]"
          />

          <p className="text-sm font-semibold">
            Finding your connections...
          </p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div
          role="alert"
          className="coy-card mt-6 bg-[#ffd6e4] p-5"
        >
          <p className="text-sm font-semibold">
            {error}
          </p>

          <button
            type="button"
            onClick={loadMatches}
            className="mt-3 text-sm font-bold underline"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Match counter */}
          <div className="coy-card mt-6 flex items-center justify-between bg-[#e6dffc] p-5">
            <div>
              <p className="text-3xl font-black">
                {matches.length}
              </p>

              <p className="mt-1 text-sm font-semibold">
                Mutual connections
              </p>
            </div>

            <HeartHandshake size={36} />
          </div>

          {/* Empty matches */}
          {matches.length === 0 && (
            <div className="coy-card mt-6 bg-white p-8 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#17131f] bg-[#ffd6e4]">
                <Heart size={38} />
              </div>

              <h3 className="mt-5 text-2xl font-black">
                No matches yet
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Your next favorite person might just
                be a swipe away.
              </p>

              <Link
                href="/discover"
                className="coy-button mt-6 inline-block bg-[#ff347c] px-6 py-3 font-bold"
              >
                Start discovering
              </Link>
            </div>
          )}

          {/* Mutual matches */}
          <div className="mt-6 space-y-4">
            {matches.map((match, index) => (
              <motion.article
                key={match.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: Math.min(index * 0.06, 0.3),
                }}
                className="coy-card flex items-center gap-4 bg-white p-3"
              >
                <Image
                  src={
                    match.profile.photo_url ||
                    "/avatar.svg"
                  }
                  alt={match.profile.name}
                  width={80}
                  height={96}
                  unoptimized
                  className="h-24 w-20 shrink-0 rounded-xl border border-[#17131f] object-contain"
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

                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-black">
                    {match.profile.name}, {match.profile.age}
                  </h3>

                  <p className="mt-1 flex items-center gap-1 text-xs text-gray-600">
                    <MapPin size={13} />
                    {match.profile.city}
                  </p>

                  <p className="mt-2 text-xs font-bold text-[#b62258]">
                    It&apos;s mutual!
                  </p>
                </div>

                <Heart
                  size={24}
                  fill="#ff347c"
                  className="shrink-0 text-[#ff347c]"
                />
              </motion.article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}