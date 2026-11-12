import { GameDetails } from "@/components/(web)/GameDetails";
import { GetGameArterGame } from "./actions";
import "dotenv/config";

export const instant = false;

export default async function GamePage({params}: {params: Promise<{name: string}>}) {
    const {name} = await params;
    const gameArterGameData = await GetGameArterGame(name);
    console.log("gameArterGameData: ", gameArterGameData);

    return (
        <>
            <div className="w-full h-full">
                <GameDetails url={`${process.env.NEXT_PUBLIC_GAMEARTER_URL}/game/${name}`}>
                </GameDetails>
            </div>
        </>
    );
}