import Link from "next/link";

export default function Sidebar({ className }: { className?: string }) {
    return (
        <>
            <div className={`w-2/12 min-h-dvh p-4 bg-gray-800 text-white text-center ${className}`}>
                <nav>
                    <ul className="flex flex-col gap-4">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/games">Games</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                        <li><Link href="/about">About</Link></li>
                    </ul>
                </nav>
            </div>
        </>
    );
}