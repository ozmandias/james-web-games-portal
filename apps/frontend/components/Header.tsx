import { User } from "./animate-ui/icons/user";

export default function Header({className}: {className?: string}) {
    return (
        <>
            <div className={`h-15 px-4 py-3 bg-gray-900 text-white flex justify-between items-center ${className || ""}`}>
                <h1>
                    James Web Games
                </h1>

                <div className="rounded w-10 h-10 bg-gray-100 text-black text-center flex justify-center items-center">
                    <User animateOnHover/>
                </div>
            </div>
        </>
    );
}