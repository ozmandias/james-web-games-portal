'use client'

import { Search } from "lucide-react";
import { InputGroup, InputGroupInput, InputGroupAddon } from "../ui/input-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function GameSearchFilter({ className }: { className?: string }) {
    const gameGenres = [
        { label: "All", value: "all" },
        { label: "Action", value: "action" },
        { label: "Adventure", value: "adventure" },
        { label: "Fighting", value: "fighting" },
        { label: "RPG", value: "RPG" },
    ];

    const gameProviders = [
        { label: "All", value: "all" },
        { label: "James", value: "james" },
        { label: "Newgrounds", value: "newgrounds" },
        { label: "Y8", value: "y8" },
        { label: "GameArter", value: "gamearter" },
        { label: "Flashpoint Archive", value: "flashpoint_archive" }
    ];

    const gameTypes = [
        { label: "WebGL", value: "webgl" },
        { label: "Flash", value: "flash" }
    ];

    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const [genre, setGenre] = useState(searchParams.get("genre"));
    const [provider, setProvider] = useState(searchParams.get("provider"));
    const [type, setType] = useState(searchParams.get("type"));
    const [search, setSearch] = useState(searchParams.get("search"));
    const [uiResetKey, setUIResetKey] = useState(0);

    function clearFilters() {
        setGenre("");
        setProvider("");
        setType("");
        setSearch("");
        setUIResetKey((prev) => {
            let newKey = prev;
            if(newKey == 0) {
                newKey = 1;
            } else {
                newKey = 0;
            }
            return newKey;
        });

        let newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.delete("genre");
        newSearchParams.delete("provider");
        newSearchParams.delete("type");
        newSearchParams.delete("search");

        startTransition(() => {
            router.replace(`${pathName}?${newSearchParams.toString()}`);
        });
    }

    function handleFilters() {
        let newSearchParams = new URLSearchParams(searchParams.toString());
        genre && genre !== "all" ? newSearchParams.set("genre", genre.toString()) : newSearchParams.delete("genre");
        provider && provider !== "all" ? newSearchParams.set("provider", provider.toString()) : newSearchParams.delete("provider");
        type && type !== "all" ? newSearchParams.set("type", type.toString()) : newSearchParams.delete("type");
        const trimSearch = search?.trim(); trimSearch ? newSearchParams.set("search", trimSearch) : newSearchParams.delete("search");

        startTransition(() => {
            router.replace(`${pathName}?${newSearchParams.toString()}`);
        });
    }

    useEffect(() => {
        setGenre(searchParams.get("genre") ?? "");
        setProvider(searchParams.get("provider") ?? "");
        setType(searchParams.get("type") ?? "");
        setSearch(searchParams.get("search") ?? "");
    }, [searchParams]);

    useEffect(() => {

    }, [genre, provider, type, search]);

    return (
        <>
            <div className={`w-auto flex justify-start items-center gap-4 ${className || ""}`}>
                <Select key={`genre-${uiResetKey}`} items={gameGenres} onValueChange={setGenre}>
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

                <Select key={`provider-${uiResetKey}`} items={gameProviders} onValueChange={setProvider}>
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

                <Select key={`type-${uiResetKey}`} items={gameTypes} onValueChange={setType}>
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
                    <InputGroupInput placeholder="Search the games collection..." key={`search-${uiResetKey}`} onChange={(event) => setSearch(event.target.value)} />
                    <InputGroupAddon>
                        <Search />
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end"></InputGroupAddon>
                </InputGroup>

                <ButtonGroup className="w-2/12 felx justify-center">
                    <Button size="default" variant="secondary" className="w-20" onClick={clearFilters}>Clear</Button>
                    <Button size="default" className="w-20" onClick={handleFilters}>Search</Button>
                </ButtonGroup>
            </div>
        </>
    );
}