"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";

import ProfileCard from "@/components/ProfileCard";
import SwipeControls from "@/components/SwipeControls";
import EmptyState from "@/components/EmptyState";
import MatchModal from "@/components/MatchModal";

import { getFeed, recordSwipe } from "@/lib/api";

const cardVariants = {
    enter: {
        opacity: 0,
        scale: 0.94,
    },

    visible: {
        opacity: 1,
        scale: 1,
        x: 0,
        rotate: 0,
    },

    exit: (direction) => ({
        x: direction * 450,
        rotate: direction * 20,
        opacity: 0,
    }),
};

export default function DiscoverPage() {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [swiping, setSwiping] = useState(false);
    const [error, setError] = useState("");
    const [direction, setDirection] = useState(0);
    const [match, setMatch] = useState(null);
    const [animating, setAnimating] = useState(false);

    const swipeLock = useRef(false);

    const currentProfile = profiles[0];

    const isDisabled = loading || swiping || !!match || animating;

    const loadFeed = async () => {
        setLoading(true);
        setError("");

        try {
            const data = await getFeed();
            setProfiles(data.profiles);
        } catch {
            setError("Unable to load profiles. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFeed();
    }, []);

    const handleSwipe = async (action) => {
        if (
            !currentProfile ||
            swipeLock.current ||
            isDisabled
        ) {
            return;
        }

        swipeLock.current = true;

        setSwiping(true);
        setError("");

        try {
            const result = await recordSwipe(
                currentProfile.id,
                action
            );

            setDirection(action === "like" ? 1 : -1);
            setAnimating(true);

            // Remove profile
            setProfiles((previous) => previous.slice(1));

            if (result.matched) {
                setMatch(result.match);
            }

        } catch (err) {
            if (err.response?.status === 409) {
                await loadFeed();
            } else {
                setError(
                    "Couldn't save your swipe. Please try again."
                );
            }
        } finally {
            setSwiping(false);
            swipeLock.current = false;
        }
    };

    return (
        <section className="discover-page">

            {/* Page heading */}
            <div className="discover-heading shrink-0">

                <h2 className="text-3xl font-extrabold leading-tight tracking-tight">
                    Discover
                    <span className="text-[#ff347c]">.</span>
                </h2>

                <p className="mt-1 text-sm text-[#797383]">
                    Someone new, maybe?
                </p>

            </div>

            {/* Error state */}
            {error && (
                <div
                    role="alert"
                    className="mt-3 shrink-0 rounded-xl border border-[#17131f] bg-[#ffd6e4] p-3"
                >
                    <p className="text-xs font-medium">
                        {error}
                    </p>

                    <button
                        onClick={loadFeed}
                        disabled={isDisabled}
                        className="mt-1 text-xs font-bold underline"
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* Main discover area */}
            <div className="discover-card-area">

                {/* Loading state */}
                {loading && (
                    <div className="flex flex-1 flex-col items-center justify-center gap-3">

                        <LoaderCircle
                            size={32}
                            className="animate-spin text-[#ff347c]"
                        />

                        <p className="text-sm font-semibold">
                            Finding new people...
                        </p>

                    </div>
                )}

                {/* Profile card */}
                <AnimatePresence
                    mode="wait"
                    custom={direction}
                    onExitComplete={() => setAnimating(false)}
                >
                    {!loading && currentProfile && (
                        <motion.div
                            key={currentProfile.id}
                            custom={direction}
                            variants={cardVariants}
                            initial="enter"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.25 }}
                            className="discover-card-wrapper"
                            style={{ height: 0 }}
                        >
                            <ProfileCard
                                profile={currentProfile}
                                onSwipe={handleSwipe}
                                disabled={isDisabled}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Empty state */}
                {!loading &&
                    !error &&
                    !currentProfile &&
                    !animating && (
                        <div className="flex flex-1 items-center justify-center">
                            <EmptyState />
                        </div>
                    )}

            </div>

            {/* Swipe controls */}
            {!loading && (currentProfile || animating) && (
                <div className="discover-actions shrink-0">

                    <SwipeControls
                        onSwipe={handleSwipe}
                        disabled={isDisabled || !currentProfile}
                    />

                    <p
                        role="status"
                        aria-live="polite"
                        className="swipe-hint text-center text-[11px] text-[#797383]"
                    >
                        {swiping
                            ? "Saving your swipe..."
                            : "Swipe left to pass · Swipe right to like"}
                    </p>

                </div>
            )}

            {/* Match celebration */}
            <AnimatePresence>
                {match && (
                    <MatchModal
                        key={match.id}
                        match={match}
                        onClose={() => setMatch(null)}
                    />
                )}
            </AnimatePresence>

        </section>
    );
}
