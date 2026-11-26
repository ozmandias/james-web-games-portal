export interface GameParams {
    page: number | null;
    size: number | null;
}

export interface GameArterParams {
    limit: number | null;
    offset: number | null;
    genre: string | string[] | null;
    tag: string[] | null;
    search: string | null;
    updated_since: bigint | null;
}