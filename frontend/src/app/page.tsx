import Link from "next/link";
import Image from "next/image";

import HomeGreeting from "@/components/HomeGreeting";

import {
    ArrowRight,
    Compass,
    Heart,
    ChevronRight,
    LockKeyhole,
    Sparkles,
} from "lucide-react";

export default function Home() {
    return (
        <section className="space-y-6">

            {/* Welcome */}
            <div>
                <HomeGreeting />

                <p className="mt-2 text-sm text-gray-500">
                    Something good might be just a swipe away.
                </p>
            </div>

            {/* Discover banner */}
            <div className="coy-card overflow-hidden bg-[#e6dffc] p-5">

                {/* Avatar illustrations */}
                <div className="relative flex items-center justify-center py-8">

                    <Sparkles
                        size={26}
                        className="absolute left-3 top-3"
                    />

                    <div className="coy-card w-32 -rotate-12 bg-white p-2">
                        <Image
                            src="/avatars/coy-1.svg"
                            alt=""
                            width={112}
                            height={112}
                            unoptimized
                            className="h-28 w-full rounded-xl bg-[#c8f2e1]"
                        />
                    </div>

                    <div className="coy-card -ml-3 w-32 rotate-12 bg-white p-2">
                        <Image
                            src="/avatars/coy-3.svg"
                            alt=""
                            width={112}
                            height={112}
                            unoptimized
                            className="h-28 w-full rounded-xl bg-[#ffd6e4]"
                        />
                    </div>

                    <div className="absolute z-10 rounded-full border-2 border-[#17131f] bg-[#ff347c] p-3">
                        <Heart
                            size={30}
                            fill="white"
                            strokeWidth={2}
                        />
                    </div>

                    <Sparkles
                        size={24}
                        className="absolute bottom-4 right-2"
                    />

                </div>

                <h2 className="text-3xl font-extrabold tracking-tight">
                    Meet your maybe.
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-[#494354]">
                    New faces, unexpected connections and
                    maybe a little something more.
                </p>

                <Link
                    href="/discover"
                    className="coy-button mt-6 flex items-center justify-center gap-3 bg-[#ff347c] px-5 py-3.5 font-bold"
                >
                    <Compass size={20} />
                    Start discovering
                    <ArrowRight size={18} />
                </Link>

            </div>

            {/* Matches shortcut */}
            <Link
                href="/matches"
                className="coy-card flex items-center gap-4 bg-[#c8f2e1] p-4 transition-transform hover:-translate-y-1"
            >
                <div className="rounded-xl bg-white p-3">
                    <Heart size={25} />
                </div>

                <div className="flex-1">
                    <h3 className="text-lg font-bold">
                        Your matches
                    </h3>

                    <p className="mt-1 text-xs text-[#494354]">
                        When the feeling is mutual.
                    </p>
                </div>

                <ChevronRight size={22} />
            </Link>

            {/* Privacy message */}
            <div className="flex items-start gap-3 rounded-2xl bg-[#fff0f5] p-4">

                <LockKeyhole
                    size={22}
                    className="mt-1 shrink-0 text-[#d91b61]"
                />

                <div>
                    <h3 className="font-bold">
                        Your likes. Your little secret.
                    </h3>

                    <p className="mt-1 text-xs leading-relaxed text-gray-600">
                        Nobody knows you liked them unless
                        they like you back.
                    </p>
                </div>

            </div>

        </section>
    );
}