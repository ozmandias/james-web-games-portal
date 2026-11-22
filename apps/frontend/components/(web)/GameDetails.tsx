import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import GamePlayer from "./GamePlayer";

export default function GameDetails({
    className,
    data
}: {
    className?: string,
    data: any
}) {
    console.log("GameDetails - data: ", data);

    let game_url = "";
    if(data && data.game_name) game_url = `${process.env.NEXT_PUBLIC_GAMEARTER_URL}/game/${data.game_name}`;

    let image_url = null;
    if(data && data.images && data.images.thumbnail) image_url = data.images.thumbnail;

    const game_controls_markdown_text = data && data.controls ? data.controls.replace(/\n/g, "  \n") : "";

    return (
        <>
            <div className={`w-auto h-full flex flex-col gap-4 ${className || ""}`}>
                <Link href="/games" className="my-2 p-4"><ArrowLeft size={16} strokeWidth={1} className="inline" /> Go back</Link>
                
                <GamePlayer game_url={game_url} image_url={image_url}></GamePlayer>

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