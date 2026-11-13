export default async function GamePagination({className}: {className?: string}) {
    return (
        <>
            <div className={`w-full ${className || ""}`}>
                Game Pagination
            </div>
        </>
    );
}