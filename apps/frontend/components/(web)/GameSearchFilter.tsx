export default async function GameSearchFilter({className}: {className?: string}) {
    return (
        <>
            <div className={`w-full ${className || ""}`}>
                Game Search Filter
            </div>
        </>
    );
}