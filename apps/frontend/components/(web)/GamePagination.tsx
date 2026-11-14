import { Field, FieldLabel } from "../ui/field";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default async function GamePagination({ className }: { className?: string }) {
    return (
        <>
            <div className={`w-auto flex justify-center ${className || ""}`}>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>

                <Field orientation="horizontal" className="w-fit">
                    <FieldLabel htmlFor="select-rows-per-page">Games per page</FieldLabel>
                    <Select defaultValue="25">
                        <SelectTrigger className="w-20" id="select-rows-per-page">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent align="start">
                            <SelectGroup>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="25">20</SelectItem>
                                <SelectItem value="50">30</SelectItem>
                                <SelectItem value="100">100</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>
            </div>
        </>
    );
}