export interface PageDetails {
    current_page: number,
    per_page: number,
    sort_by: string,
    sort_direction: string,
    last_page?: number,
    from?: number,
    to?: number,
    total?: number,
}