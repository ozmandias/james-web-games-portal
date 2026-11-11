import { ListGames } from "@/lib/gamearter";

export default async function GamesPage() {
    const games = await ListGames({
        limit: 30,
        offset: null,
        genre: null,
        tag: null,
        search: null,
        updated_since: null
    });

    return (
        <>
        </>
    );
}