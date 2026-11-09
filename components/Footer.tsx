export default function Footer({className}: {className?: string}) {
    return (
        <>
            <div className={`h-30 p-2 py-3 bg-gray-800 text-white ${className}`}>
                <p>Footer</p>
            </div>
        </>
    );
}