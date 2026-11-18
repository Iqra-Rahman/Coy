import "./globals.css";
import { Bricolage_Grotesque } from "next/font/google";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

const bricolage = Bricolage_Grotesque({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
    variable: "--font-bricolage",
    display: "swap",
});

export const metadata = {
    title: "Coy Discover",
    description: "Discover people. Like privately. Match mutually.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={bricolage.variable}>

                <div className="app-shell">

                    <Header />

                    <main className="app-content">
                        {children}
                    </main>

                    <BottomNav />

                </div>

            </body>
        </html>
    );
}