import { GameDetails } from "@/components/(web)/GameDetails";
import { GetGameArterGame } from "./actions";
import "dotenv/config";

export const instant = false;

export default async function GamePage({params}: {params: Promise<{name: string}>}) {
    const {name} = await params;
    let gameArterGameData = await GetGameArterGame(name);
    gameArterGameData.game_name = name;

    return (
        <>
            <GameDetails data={gameArterGameData}></GameDetails>
        </>
    );
}