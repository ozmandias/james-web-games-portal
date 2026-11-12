import { ListGames } from "@/lib/gamearter";
import { GameArterParams } from "@/types/types";

export async function GetGameArterGames(params: GameArterParams) {
    'use cache'
    return await ListGames(params);
}