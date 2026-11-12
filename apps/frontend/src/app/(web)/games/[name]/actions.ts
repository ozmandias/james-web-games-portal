import { GetOneGame } from "@/lib/gamearter";

export async function GetGameArterGame(name: string) {
    'use cache'
    return await GetOneGame(name);
}