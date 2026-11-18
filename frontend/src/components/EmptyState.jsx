import { Compass } from "lucide-react";
import Link from "next/link";

export default function EmptyState() {
  return (
    <div className="coy-card mt-8 flex flex-col items-center bg-[#e6dffc] px-6 py-10 text-center">

      <div className="rounded-full border-2 border-[#17131f] bg-white p-5">
        <Compass size={48} strokeWidth={1.8} />
      </div>

      <h2 className="mt-5 text-2xl font-black">
        You&apos;re all caught up!
      </h2>

      <p className="mt-3 text-sm leading-relaxed">
        You&apos;ve discovered everyone for now.
        Good things take time.
      </p>

      <Link
        href="/matches"
        className="coy-button mt-6 bg-[#ff347c] px-6 py-3 font-bold"
      >
        View your matches
      </Link>

    </div>
  );
}