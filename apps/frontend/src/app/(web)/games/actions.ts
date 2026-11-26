import { ListGames } from "@/lib/gamearter";
import { GameArterParams, GameParams } from "@/types/types";

export async function GetGames(params: GameParams) {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/games?${new URLSearchParams().toString()}`;

    const request = {};

    const response = {};

    return response;
}

export async function GetGameArterGames(params: GameArterParams) {
    'use cache'
    return await ListGames(params);
}