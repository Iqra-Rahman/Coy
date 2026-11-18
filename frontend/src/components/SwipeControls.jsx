"use client";

import { Heart, X } from "lucide-react";

export default function SwipeControls({
    onSwipe,
    disabled,
}) {
    return (
        <div className="swipe-controls flex shrink-0 items-center justify-center gap-3">

            {/* Pass button */}
            <button
                type="button"
                aria-label="Pass profile"
                disabled={disabled}
                onClick={() => onSwipe("pass")}
                className="coy-button flex h-12 flex-1 items-center justify-center gap-2 bg-white px-4 text-sm font-bold hover:bg-[#f4f1f8] disabled:opacity-50"
            >
                <X
                    size={19}
                    strokeWidth={2}
                />
                Pass
            </button>

            {/* Like button */}
            <button
                type="button"
                aria-label="Like profile"
                disabled={disabled}
                onClick={() => onSwipe("like")}
                className="coy-button flex h-12 flex-1 items-center justify-center gap-2 bg-[#ff347c] px-4 text-sm font-bold hover:bg-[#ff5794] disabled:opacity-50"
            >
                <Heart
                    size={19}
                    fill="currentColor"
                    strokeWidth={2}
                />
                Like
            </button>

        </div>
    );
}
