import { Search } from "lucide-react";
import { InputGroup, InputGroupInput, InputGroupAddon } from "../ui/input-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";

export default async function GameSearchFilter({ className }: { className?: string }) {
    const gameGenres = [
        {label: "All", value: "all"},
        {label: "Action", value: "action"},
        {label: "Adventure", value: "adventure"},
        {label: "Fighting", value: "fighting"},
        {label: "RPG", value: "RPG"},
    ];

    const gameProviders = [
        {label: "All", value: "all"},
        {label: "James", value: "james"},
        {label: "Newgrounds", value: "newgrounds"},
        {label: "Y8", value: "y8"},
        {label: "GameArter", value: "gamearter"},
        {label: "Flashpoint Archive", value: "flashpoint_archive"}
    ];

    const gameTypes = [
        {label: "WebGL", value: "webgl"},
        {label: "Flash", value: "flash"}
    ]

    return (
        <>
            <div className={`w-auto flex justify-start items-center gap-4 ${className || ""}`}>
                <Select items={gameGenres}>
                    <SelectTrigger className="w-auto w-30 max-w-48 bg-gray-100 text-black">
                        <SelectValue placeholder="Game Genres" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-100">
                        <SelectGroup>
                            <SelectLabel>Game Genres</SelectLabel>
                            {/* <SelectItem value="" disabled>Select Game Provider...</SelectItem> */}
                            {gameGenres.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Select items={gameProviders}>
                    <SelectTrigger className="w-auto w-40 max-w-48 bg-gray-100 text-black">
                        <SelectValue placeholder="Game Providers" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-100">
                        <SelectGroup>
                            <SelectLabel>Game Providers</SelectLabel>
                            {/* <SelectItem value="" disabled>Select Game Provider...</SelectItem> */}
                            {gameProviders.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Select items={gameTypes}>
                    <SelectTrigger className="w-auto w-40 max-w-48 bg-gray-100 text-black">
                        <SelectValue placeholder="Game Types" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-100">
                        <SelectGroup>
                            <SelectLabel>Game Types</SelectLabel>
                            {/* <SelectItem value="" disabled>Select Game Type...</SelectItem> */}
                            {gameTypes.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <InputGroup className="max-w-xs grow bg-gray-100 text-black">
                    <InputGroupInput placeholder="Search the games collection..." />
                    <InputGroupAddon>
                        <Search />
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end"></InputGroupAddon>
                </InputGroup>

                <ButtonGroup className="w-2/12 felx justify-center">
                    <Button size="default" variant="secondary" className="w-20">Clear</Button>
                    <Button size="default" className="w-20">Search</Button>
                </ButtonGroup>
            </div>
        </>
    );
}