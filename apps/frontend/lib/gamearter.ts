import { GameArterParams } from "@/types/types";
import "dotenv/config";

export async function ListGames(params: GameArterParams) {
    let url = `${process.env.NEXT_PUBLIC_GAMEARTER_URL}/api/v1/catalog/games`;
    let urlSearchParams = new URLSearchParams();
    if (params.limit) urlSearchParams.set("limit", params.limit.toString());
    if (params.offset) urlSearchParams.set("offset", params.offset.toString());
    if (params.genre) urlSearchParams.set("genre", "");
    if (params.tag) urlSearchParams.set("tag", "");
    if (params.search) urlSearchParams.set("search", params.search);
    if (params.updated_since) urlSearchParams.set("updated_since", params.updated_since.toString());
    url += `?${urlSearchParams.toString()}`;

    const request = {};

    const response = await fetch(
        url
    );

    const data = await response.json();

    return data;
}

export async function GetOneGame(name: string) {
    const url = `${process.env.NEXT_PUBLIC_GAMEARTER_URL}/api/v1/catalog/games/${name}`;

    const rquest = {};

    const response = await fetch(
        url
    );

    const data = await response.json();

    return data;
}