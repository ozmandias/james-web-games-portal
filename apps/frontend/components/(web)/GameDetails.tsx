'use client'

import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowLeft, Play } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function GameDetails({
    className,
    data
}: {
    className?: string,
    data: any
}) {
    console.log("GameDetails - data: ", data);

    let url = "";
    if(data && data.game_name) url = `${process.env.NEXT_PUBLIC_GAMEARTER_URL}/game/${data.game_name}`;

    const game_controls_markdown_text = data.controls.replace(/\n/g, "  \n");

    function playGame() {
        const game_player: HTMLIFrameElement | null = document.getElementById("game-player") as HTMLIFrameElement;
        const game_preview: HTMLElement | null = document.getElementById("game-preview");

        if(game_preview) game_preview.style.display = "none";

        if(game_player) {
            game_player.style.display = "block";
            game_player.src = url;
        }
    }

    return (
        <>
            <div className={`w-auto h-full flex flex-col gap-4 ${className || ""}`}>
                <Link href="/games" className="my-2 p-4"><ArrowLeft size={16} strokeWidth={1} className="inline" /> Go back</Link>
                
                <div id="game" className="w-auto my-2 flex justify-center">
                    <div id="game-preview" style={{width: "70%"}} className="my-auto relative">
                        <img src={data.images.thumbnail} alt="Game Image" style={{width: "100%", aspectRatio: "16 / 9", border: 0}} />
                        <Button className="w-20 h-15 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-75"
                            onClick={playGame}
                        >
                            <Play />
                        </Button>
                    </div>

                    <iframe id="game-player" src={undefined} style={{width: "70%", aspectRatio: "16 / 9", border: 0, display: "none"}} className="my-auto" allowFullScreen>
                    </iframe>
                </div>

                <div className="my-2 flex flex-col justify-center items-center text-left">
                    <div className="my-auto p-4 border rounded-lg">
                        <h2>Controls:</h2>
                        <ReactMarkdown>{game_controls_markdown_text}</ReactMarkdown>
                    </div>
                </div>
                
                <div className="w-auto my-2 p-4 bg-gray-600">
                    <h1>{data.name}</h1>
                    <p>{data.description}</p>
                </div>
            </div>
        </>
    );
}