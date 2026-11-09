import { ReactNode } from "react";

export default function Main({className, children}: {className?: string, children?: ReactNode}) {
    return (
        <>
            <main className={`w-10/12 bg-gray-700 text-white ${className}`}>
                {children}
            </main>
        </>
    );
}