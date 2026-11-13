import { GetGameArterGames } from "./actions";
import GameList from "@/components/(web)/GameList";

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
            <GameList data={gameArterGamesData}></GameList>
        </>
    );
}