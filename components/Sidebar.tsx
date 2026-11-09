export default function Sidebar({className}: {className?: string}) {
    return (
        <>
            <div className={`w-2/12 min-h-dvh bg-gray-800 text-white ${className}`}>
                <p className="text-center">Sidebar</p>
            </div>
        </>
    );
}