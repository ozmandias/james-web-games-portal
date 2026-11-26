import { GetOneGame } from "@/lib/gamearter";

export async function GetGame(id: string) {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/games/${id}`;

    const request = {};

    const response = {};

    return response;
}

export async function GetGameArterGame(name: string) {
    'use cache'
    return await GetOneGame(name);
}