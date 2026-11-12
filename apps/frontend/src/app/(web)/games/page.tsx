import GameCard from "@/components/(web)/GameCard";
import { GetGameArterGames } from "./actions";
import Link from "next/link";

export default async function GamesPage() {
    const gameArterGamesData = await GetGameArterGames({
        limit: 20,
        offset: null,
        genre: null,
        tag: null,
        search: null,
        updated_since: null
    });

    return (
        <>
            <div className="p-4 grid grid-cols-4 gap-4">
                {
                    gameArterGamesData && gameArterGamesData.games.map((game: any) => {
                        return (
                            <Link key={game.slug} href={`/games/${game.slug}`}>
                                <GameCard  title={game.name} image={game.thumbnail} />
                            </Link>
                        );
                    })
                }
            </div>
        </>
    );
}