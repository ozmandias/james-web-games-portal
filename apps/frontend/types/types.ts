export interface GameArterParams {
    limit: number | null;
    offset: number | null;
    genre: string[] | null;
    tag: string[] | null;
    search: string | null;
    updated_since: bigint | null;
}