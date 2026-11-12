import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function GameCard({ className, title, description, image, url }: { className?: string, title?: string, description?: string, image?: string, url?: string }) {
    return (
        <>
            <Card className={`max-w-sm w-60 ${className}`}>
                <CardHeader>
                    <CardTitle className="truncate">{title}</CardTitle>
                    <CardDescription>
                        {description}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <img className="w-full" src={image} alt="Game Image" />
                </CardContent>
            </Card>
        </>
    );
}