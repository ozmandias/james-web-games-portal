import GameList from "@/components/(web)/GameList";
import { GetGameArterGames } from "./actions";

export const instant = false;

export default async function GamesPage({searchParams}: {searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) {
    const {page = "", size = "", genre = "", tag = "", search = "", updated_since = ""} = await searchParams;
    
    const gameArterGamesData = await GetGameArterGames({
        limit: Number(size) || 20,
        offset: Number(size) * Number(page) || 0,
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