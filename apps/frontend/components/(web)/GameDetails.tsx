export async function GameDetails({className, name, description, url}: {className?: string, name?: string, description?: string, url?: string}) {
    return (
        <>
            <iframe src={url} style={{width: "100%", height: "100%", border: 0}} allowFullScreen></iframe>
        </>
    );
}