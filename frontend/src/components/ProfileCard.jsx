"use client";

import {
    motion,
    useMotionValue,
    useTransform,
} from "framer-motion";

import { MapPin } from "lucide-react";

import { getProfileColor } from "@/lib/profileColors";

const interestColors = [
    "#e6dffc",
    "#c8f2e1",
    "#ffd6e4",
    "#d5eafb",
];

export default function ProfileCard({
    profile,
    onSwipe,
    disabled,
}) {
    const x = useMotionValue(0);

    const rotate = useTransform(
        x,
        [-200, 0, 200],
        [-18, 0, 18]
    );

    const likeOpacity = useTransform(
        x,
        [0, 120],
        [0, 1]
    );

    const passOpacity = useTransform(
        x,
        [-120, 0],
        [1, 0]
    );

    const handleDragEnd = (_, info) => {
        if (disabled) return;

        if (info.offset.x > 100) {
            onSwipe("like");
        } else if (info.offset.x < -100) {
            onSwipe("pass");
        } else if (info.velocity.x > 650) {
            onSwipe("like");
        } else if (info.velocity.x < -650) {
            onSwipe("pass");
        }
    };

    return (
        <motion.article
            drag={disabled ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            style={{
                x,
                rotate,
                touchAction: "pan-y",
            }}
            className="coy-card discover-profile relative flex h-full min-h-0 select-none flex-col overflow-hidden bg-white"
        >
            {/* Profile image */}
            <div
                className="profile-image relative min-h-0 flex-1 overflow-hidden"
                style={{ backgroundColor: getProfileColor(profile.id) }}
            >
                <img
                    src={profile.photo_url}
                    alt={profile.name}
                    draggable={false}
                    className="pointer-events-none absolute inset-0 h-full w-full object-contain object-bottom"
                    onError={(event) => {
                        if (
                            !event.currentTarget.src.endsWith(
                                "/avatar.svg"
                            )
                        ) {
                            event.currentTarget.src = "/avatar.svg";
                        }
                    }}
                />

                {/* Like indicator */}
                <motion.div
                    style={{ opacity: likeOpacity }}
                    className="pointer-events-none absolute left-4 top-5 z-20 -rotate-12 rounded-xl border-[3px] border-[#17131f] bg-[#c8f2e1] px-3 py-1.5 text-2xl font-extrabold"
                >
                    LIKE
                </motion.div>

                {/* Pass indicator */}
                <motion.div
                    style={{ opacity: passOpacity }}
                    className="pointer-events-none absolute right-4 top-5 z-20 rotate-12 rounded-xl border-[3px] border-[#17131f] bg-[#ffd6e4] px-3 py-1.5 text-2xl font-extrabold"
                >
                    PASS
                </motion.div>
            </div>

            {/* Profile information */}
            <div className="profile-information shrink-0 border-t border-[#17131f]/15 p-4">

                <h2 className="text-2xl font-extrabold leading-tight tracking-tight">
                    {profile.name}
                    <span className="font-semibold text-[#797383]">
                        {", "}{profile.age}
                    </span>
                </h2>

                {/* Location */}
                <div className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#686174]">
                    <MapPin
                        size={14}
                        strokeWidth={1.8}
                    />

                    {profile.city}
                </div>

                {/* Bio */}
                <p className="profile-bio mt-3 text-sm leading-relaxed text-[#17131f]">
                    {profile.bio}
                </p>

                {/* Interests */}
                <div className="profile-interests mt-3 flex flex-wrap gap-2">
                    {profile.interests?.map((interest, index) => (
                        <span
                            key={interest}
                            style={{
                                backgroundColor:
                                    interestColors[
                                        index % interestColors.length
                                    ],
                            }}
                            className="rounded-full border border-[#17131f]/10 px-3 py-1 text-xs font-semibold"
                        >
                            {interest}
                        </span>
                    ))}
                </div>

            </div>
        </motion.article>
    );
}
