"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Compass, Heart } from "lucide-react";

const tabs = [
    { name: "Home", href: "/", icon: House },
    { name: "Discover", href: "/discover", icon: Compass },
    { name: "Matches", href: "/matches", icon: Heart },
];

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="shrink-0 border-t border-[#ebe7f0] bg-white px-4 pt-1.5 pb-[max(6px,env(safe-area-inset-bottom))]">
            <div className="flex items-center justify-around">
                {tabs.map(({ name, href, icon: Icon }) => {
                    const isActive = pathname === href;

                    return (
                        <Link
                            key={name}
                            href={href}
                            aria-current={isActive ? "page" : undefined}
                            className="flex flex-1 flex-col items-center gap-0.5"
                        >
                            <div
                                className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                                    isActive
                                        ? "border-[1.5px] border-[#17131f] bg-[#ff347c]"
                                        : "border-[1.5px] border-transparent"
                                }`}
                            >
                                <Icon size={19} strokeWidth={1.8} />
                            </div>

                            <span
                                className={`text-[10px] ${
                                    isActive
                                        ? "font-bold text-[#17131f]"
                                        : "font-medium text-[#797383]"
                                }`}
                            >
                                {name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}