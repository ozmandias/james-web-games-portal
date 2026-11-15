'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Field, FieldLabel } from "../ui/field";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useEffect, useState, useTransition } from "react";

export default function GamePagination({ className, total }: { className?: string, total?: number }) {
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const [page, setPage] = useState(searchParams.get("page"));
    const [size, setSize] = useState(searchParams.get("size"));

    function getVisiblePages() {

    }

    /*useEffect(() => {
        if(!page) setPage("1");
        if(!size) setSize("20");
    }, []);*/

    useEffect(() => {
        let newSearchParams = new URLSearchParams(searchParams.toString());
        if(page) newSearchParams.set("page", page.toString());
        if(size) newSearchParams.set("size", size.toString());

        console.log("page: ", page);
        console.log("size: ", size);
        console.log("newSearchParams: ", newSearchParams);
        console.log("Router Replace URL: ", `${pathName}?${newSearchParams.toString()}`);

        startTransition(() => {
            router.replace(`${pathName}?${newSearchParams.toString()}`);
        });
    }, [page, size])

    return (
        <>
            <div className={`w-auto flex justify-center ${className || ""}`}>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" onClick={(event) => setPage(
                                page && !(Number(page) <= 1) ? (Number(page) - 1).toString() : (1).toString()
                            )} />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" onClick={(event) => setPage(
                                page ?
                                    size ?
                                        total && (Number(page) * Number(size) <= total) ?
                                            (Number(page) + 1).toString() : (page).toString()
                                    : total && (Number(page) * Number(20) <= total) ?
                                        (Number(page) + 1).toString() : (page).toString()
                                : (2).toString()
                            )} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>

                <Field orientation="horizontal" className="w-fit">
                    <FieldLabel htmlFor="select-rows-per-page">Games per page</FieldLabel>
                    <Select defaultValue="20" onValueChange={setSize}>
                        <SelectTrigger className="w-20 bg-gray-100 text-black" id="select-rows-per-page">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent align="start">
                            <SelectGroup>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="20">20</SelectItem>
                                <SelectItem value="30">30</SelectItem>
                                <SelectItem value="100">100</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>
            </div>
        </>
    );
}