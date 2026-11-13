import GameCard from "@/components/(web)/GameCard";
import GamePagination from "./GamePagination";
import GameSearchFilter from "./GameSearchFilter";

export default async function GameList({className, data}: {className?: string, data?: any}) {
    return (
        <>
            <div className={`w-full ${className || ""}`}>
                <GameSearchFilter className="m-2 p-2" />

                <div className="m-2 p-2 grid grid-cols-4 gap-4">
                    {
                        data && data.games.map((game: any) => {
                            return (
                                <GameCard key={game.slug}  title={game.name} image={game.thumbnail} url={`/games/${game.slug}`} className="bg-gray-600 text-white" />
                            );
                        })
                    }
                </div>

                <GamePagination className="m-2 p-2" />
            </div>
        </>
    )
}