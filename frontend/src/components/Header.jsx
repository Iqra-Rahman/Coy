import Image from "next/image";

export default function Header() {
    return (
        <header className="flex shrink-0 items-center justify-between bg-white px-4 py-3">

            <h1 className="text-[28px] font-extrabold leading-none tracking-tighter">
                coy
                <span className="text-[#ff347c]">.</span>
            </h1>

            <div className="h-9 w-9 overflow-hidden rounded-full bg-[#f4f1f8]">
                <Image
                    src="/avatars/coy-1.svg"
                    alt="Your profile"
                    width={36}
                    height={36}
                    unoptimized
                    className="h-full w-full object-cover"
                />
            </div>

        </header>
    );
}