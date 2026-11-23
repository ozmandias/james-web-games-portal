'use client'

import { Play } from "lucide-react";
import { Button } from "../ui/button";
import { Flash } from "react-ruffle";
import Script from "next/script";
import { useState } from "react";

export default function GamePlayer({ game_url, image_url, className }: { game_url?: string, image_url?: string, className?: string }) {
    const [ruffleReady, setRuffleReady] = useState(
        typeof window !== "undefined" && Boolean((window as any).RufflePlayer)
    );
    
    function playGame() {
        const game_player: HTMLIFrameElement | null = document.getElementById("game-player") as HTMLIFrameElement;
        const game_preview: HTMLElement | null = document.getElementById("game-preview");

        if (game_preview) game_preview.style.display = "none";

        if (game_player) {
            game_player.style.display = "block";
            game_player.src = game_url || "";
        }
    }

    return (
        <>
            <div id="game" className={`w-auto my-2 flex justify-center ${className}`}>
                {/* <div id="game-preview" style={{ width: "70%" }} className="my-auto relative">
                    <img src={image_url} alt="Game Image" style={{ width: "100%", aspectRatio: "16 / 9", border: 0 }} />
                    {image_url != null ? (
                        <Button className="w-20 h-15 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-75"
                            onClick={playGame}
                        >
                            <Play />
                        </Button>
                    ) : (
                        <>
                        </>
                    )}
                </div> */}

                {/* <iframe id="game-player" src={undefined} style={{ width: "70%", aspectRatio: "16 / 9", border: 0, display: "none" }} className="my-auto" allowFullScreen>
                </iframe> */}

                <Script src="/library/ruffle-0.7.1/ruffle.js" onLoad={() => setRuffleReady(true)} strategy="afterInteractive" />
                {ruffleReady == true ? (
                    // https://www.minijuegosgratis.com/flash1234/no_hotlink/batmanmotb.swf
                    // /games/flash/gunblood-western-shootout.swf
                    <Flash src={"https://www.minijuegosgratis.com/flash1234/no_hotlink/batmanmotb.swf"} style={{ width: "70%", aspectRatio: "16 / 9", border: 0, display: "flex", justifyContent: "center" }}
                        config={{
                            autoplay: "off",
                            parameters: {
                                // FlashVars
                            },
                        }}
                    >
                        <p>Loading Flash Game...</p>
                    </Flash>
                ) : (
                    <>
                    </>
                )}
            </div>
        </>
    );
}