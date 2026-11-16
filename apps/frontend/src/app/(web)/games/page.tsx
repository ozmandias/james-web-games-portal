import GameList from "@/components/(web)/GameList";
import { GetGameArterGames } from "./actions";

export const instant = false;

export default async function GamesPage({searchParams}: {searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) {
    const {page = "", size = "", genre = "", tag = "", search = "", updated_since = ""} = await searchParams;
    
    const gameArterGamesData = await GetGameArterGames({
        limit: Number(size) || 20,
        offset: size ? Number(size) * (Number(page) - 1) : Number(20) * (Number(page) - 1),
        genre: genre ? genre : null,
        tag: null,
        search: search ? search.toString() : null,
        updated_since: null
    });

    return (
        <>
            <GameList data={gameArterGamesData}></GameList>
        </>
    );
}