import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";

export default function GameCard({ className, title, description, image, url }: { className?: string, title?: string, description?: string, image?: string, url?: string }) {
    return (
        <>
            <Link href={url || ""}>
                <Card className={`max-w-sm w-60 ${className || ""}`}>
                    <CardHeader>
                        <CardTitle className="truncate">{title || ""}</CardTitle>
                        <CardDescription>
                            {description}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <img className="w-full rounded-lg" src={image || ""} alt="Game Image" />
                    </CardContent>
                </Card>
            </Link>
        </>
    );
}